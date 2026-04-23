import { useMemo, useState } from "react";
import type { AttackStep, Detection } from "../types";
import { DecisionPanel } from "./DecisionPanel";
import { SectionShell } from "./SectionShell";

type DecisionBoardProps = {
  attackSteps: AttackStep[];
  detections: Detection[];
};

type TechniqueDecision = {
  techniqueId: string;
  techniqueName: string;
  sigmaHits: number;
  elasticHits: number;
  overlapRules: number;
  gapCount: number;
  recommendation: string;
  rationale: string;
};

type ActionableRule = {
  id: string;
  techniqueId: string;
  techniqueName: string;
  source: string;
  ruleName: string;
  ruleSlug: string;
  lookupUrl?: string;
  recommendation: string;
  applyHint: string;
  priority: number;
};

function buildRecommendation(
  sigmaHits: number,
  elasticHits: number,
  overlapRules: number,
  gapCount: number,
) {
  if (gapCount > 0) {
    return {
      recommendation: "Fill alert gap and keep strongest rule set",
      rationale: "Alert coverage is incomplete for this technique, so add a custom rule while retaining the stronger source rule set.",
    };
  }

  const threshold = Math.max(2, Math.round(Math.min(sigmaHits, elasticHits) * 0.25));

  if (sigmaHits - elasticHits > threshold) {
    return {
      recommendation: "Keep Sigma, tune Elastic",
      rationale: "Sigma rules currently produce stronger alert signal for this mapped behavior.",
    };
  }

  if (elasticHits - sigmaHits > threshold) {
    return {
      recommendation: "Keep Elastic, tune Sigma",
      rationale: "Elastic rules currently produce stronger alert signal for this mapped behavior.",
    };
  }

  if (overlapRules > 0) {
    return {
      recommendation: "Merge and deduplicate",
      rationale: "Both sources fire similarly. Keep one high-fidelity path and reduce duplicate alerts.",
    };
  }

  return {
    recommendation: "Keep both under observation",
    rationale: "Alert signal is close and overlap is low. Keep both rule sets while collecting more run data.",
  };
}

function buildTechniqueDecisions(attackSteps: AttackStep[], detections: Detection[]) {
  const grouped = new Map<string, TechniqueDecision>();

  for (const step of attackSteps) {
    const key = `${step.techniqueId}|${step.techniqueName}`;
    const current = grouped.get(key) ?? {
      techniqueId: step.techniqueId,
      techniqueName: step.techniqueName,
      sigmaHits: 0,
      elasticHits: 0,
      overlapRules: 0,
      gapCount: 0,
      recommendation: "",
      rationale: "",
    };

    current.sigmaHits += step.sigmaHits;
    current.elasticHits += step.elasticHits;
    current.gapCount += step.gapCount;
    grouped.set(key, current);
  }

  const overlapByTechnique = new Map<string, number>();
  for (const detection of detections.filter((item) => item.classification === "overlap")) {
    for (const techniqueId of detection.techniqueIds) {
      overlapByTechnique.set(techniqueId, (overlapByTechnique.get(techniqueId) ?? 0) + 1);
    }
  }

  const decisions = [...grouped.values()].map((decision) => {
    decision.overlapRules = overlapByTechnique.get(decision.techniqueId) ?? 0;
    const recommendation = buildRecommendation(
      decision.sigmaHits,
      decision.elasticHits,
      decision.overlapRules,
      decision.gapCount,
    );

    return {
      ...decision,
      recommendation: recommendation.recommendation,
      rationale: recommendation.rationale,
    };
  });

  return decisions.sort((a, b) => (b.overlapRules + b.gapCount * 3) - (a.overlapRules + a.gapCount * 3));
}

function getGapDescription(step: AttackStep) {
  if (step.sigmaHits === 0 && step.elasticHits > 0) {
    return "Sigma rule alerts missing";
  }
  if (step.elasticHits === 0 && step.sigmaHits > 0) {
    return "Elastic rule alerts missing";
  }
  return "No direct alerts from either source";
}

function buildActionableRules(
  detections: Detection[],
  decisionMap: Map<string, TechniqueDecision>,
) {
  const rows: ActionableRule[] = [];
  const unique = new Set<string>();

  for (const detection of detections) {
    for (const techniqueId of detection.techniqueIds) {
      const decision = decisionMap.get(techniqueId);
      if (!decision) {
        continue;
      }

      const ruleSlug = detection.ruleSlug ?? detection.ruleName;
      const uniqueKey = `${techniqueId}|${detection.source}|${ruleSlug}`;
      if (unique.has(uniqueKey)) {
        continue;
      }
      unique.add(uniqueKey);

      const classificationAction =
        detection.classification === "overlap"
          ? "Compare and deduplicate"
          : detection.classification === "keep"
            ? "Keep as primary"
            : detection.classification === "gap"
              ? "Alert gap fill candidate"
              : "Review and observe";
      const recommendation =
        decision.gapCount > 0 ? `${classificationAction} + custom gap rule` : classificationAction;

      let priority = 1;
      if (decision.gapCount > 0) {
        priority += 6;
      }
      if (detection.classification === "overlap") {
        priority += 4;
      }
      if (detection.classification === "keep") {
        priority += 2;
      }

      rows.push({
        id: `${uniqueKey}`.replace(/[^a-z0-9|_-]/gi, "_"),
        techniqueId,
        techniqueName: decision.techniqueName,
        source: detection.source,
        ruleName: detection.ruleName,
        ruleSlug,
        lookupUrl: detection.lookupUrl,
        recommendation,
        applyHint: detection.applyHint ?? "Search this rule in your detection repository and tune for your environment.",
        priority,
      });
    }
  }

  return rows.sort((a, b) => b.priority - a.priority || a.ruleName.localeCompare(b.ruleName)).slice(0, 24);
}

function toCsv(rows: ActionableRule[]) {
  const headers = [
    "technique_id",
    "technique_name",
    "source",
    "rule_name",
    "rule_slug",
    "recommendation",
    "apply_hint",
    "lookup_url",
  ];
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const body = rows.map((row) =>
    [
      row.techniqueId,
      row.techniqueName,
      row.source,
      row.ruleName,
      row.ruleSlug,
      row.recommendation,
      row.applyHint,
      row.lookupUrl ?? "",
    ]
      .map(escape)
      .join(","),
  );

  return [headers.join(","), ...body].join("\n");
}

function downloadCsv(rows: ActionableRule[]) {
  if (typeof window === "undefined" || rows.length === 0) {
    return;
  }

  const blob = new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "sigma-vs-elastic-actionable-rule-kit.csv";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function copyToClipboard(value: string) {
  if (!navigator.clipboard?.writeText) {
    return;
  }
  void navigator.clipboard.writeText(value);
}

export function DecisionBoard({ attackSteps, detections }: DecisionBoardProps) {
  const [copiedRule, setCopiedRule] = useState<string | null>(null);
  const [showAllComparisons, setShowAllComparisons] = useState(false);
  const [showAllGaps, setShowAllGaps] = useState(false);
  const [showAllRules, setShowAllRules] = useState(false);
  const techniqueDecisions = useMemo(
    () => buildTechniqueDecisions(attackSteps, detections),
    [attackSteps, detections],
  );
  const decisionMap = useMemo(
    () => new Map(techniqueDecisions.map((decision) => [decision.techniqueId, decision])),
    [techniqueDecisions],
  );
  const actionableRules = useMemo(
    () => buildActionableRules(detections, decisionMap),
    [decisionMap, detections],
  );
  const gapSteps = attackSteps.filter((step) => step.gapCount > 0);
  const visibleComparisons = showAllComparisons ? techniqueDecisions : techniqueDecisions.slice(0, 2);
  const visibleGapSteps = showAllGaps ? gapSteps : gapSteps.slice(0, 2);
  const visibleRules = showAllRules ? actionableRules : actionableRules.slice(0, 2);

  function handleCopy(ruleSlug: string) {
    copyToClipboard(ruleSlug);
    setCopiedRule(ruleSlug);
    window.setTimeout(() => setCopiedRule((current) => (current === ruleSlug ? null : current)), 1200);
  }

  return (
    <SectionShell
      id="decisions"
      eyebrow="Decision Board"
      title="Decide which overlapping rules to keep and where custom rules are needed."
    >
      <DecisionPanel
        title="Comparison Matrix"
        description="Rule-alert ratio and overlap pressure per technique."
        totalCount={techniqueDecisions.length}
        itemLabel="comparisons"
        expanded={showAllComparisons}
        onToggleExpanded={() => setShowAllComparisons((current) => !current)}
      >
        <div className="decision-grid">
          {visibleComparisons.map((decision) => {
            const total = Math.max(decision.sigmaHits + decision.elasticHits, 1);
            const sigmaWidth = Math.round((decision.sigmaHits / total) * 100);
            const elasticWidth = Math.round((decision.elasticHits / total) * 100);

            return (
              <article className="decision-card" key={decision.techniqueId}>
                <div className="decision-heading">
                  <span>{decision.techniqueId}</span>
                  <strong>{decision.techniqueName}</strong>
                </div>
                <div className="decision-bars" aria-label={`${decision.techniqueId} alert comparison`}>
                  <div className="decision-bar-line">
                    <span>Sigma alerts {decision.sigmaHits}</span>
                    <div className="decision-track">
                      <span className="decision-fill sigma" style={{ width: `${sigmaWidth}%` }} />
                    </div>
                  </div>
                  <div className="decision-bar-line">
                    <span>Elastic alerts {decision.elasticHits}</span>
                    <div className="decision-track">
                      <span className="decision-fill elastic" style={{ width: `${elasticWidth}%` }} />
                    </div>
                  </div>
                </div>
                <div className="decision-meta">
                  <span>Overlap rules: {decision.overlapRules}</span>
                  <span>Alert gaps: {decision.gapCount}</span>
                </div>
                <p className="decision-choice">{decision.recommendation}</p>
                <p>{decision.rationale}</p>
              </article>
            );
          })}
        </div>
      </DecisionPanel>

      <DecisionPanel
        title="Gap Queue"
        description="Steps where one source is missing rule-driven alerts and custom logic should be prioritized."
        totalCount={gapSteps.length}
        itemLabel="gaps"
        expanded={showAllGaps}
        onToggleExpanded={() => setShowAllGaps((current) => !current)}
      >
        {gapSteps.length === 0 ? (
          <p className="gap-empty">No open alert-gap candidates in this snapshot.</p>
        ) : (
          <ul className="gap-list">
            {visibleGapSteps.map((step) => (
              <li className="gap-item" key={step.id}>
                <span>{step.techniqueId}</span>
                <strong>{step.safeActionLabel}</strong>
                <p>{getGapDescription(step)}. Prioritize custom rule creation to close this alert gap.</p>
              </li>
            ))}
          </ul>
        )}
      </DecisionPanel>

      <DecisionPanel
        title="Actionable Rule Kit"
        description="Real rule identifiers for lookup, enablement, and alert-focused tuning."
        totalCount={actionableRules.length}
        itemLabel="rules"
        expanded={showAllRules}
        onToggleExpanded={() => setShowAllRules((current) => !current)}
        extraActions={(
          <button
            type="button"
            className="replay-button"
            onClick={() => downloadCsv(actionableRules)}
            aria-label="Download actionable rule kit as CSV"
          >
            Download CSV
          </button>
        )}
      >
        <div id="actionable-rule-kit-table" className="rule-kit-table-wrap">
          <table className="rule-kit-table" aria-label="Actionable rules">
            <thead>
              <tr>
                <th scope="col">Technique</th>
                <th scope="col">Source</th>
                <th scope="col">Rule</th>
                <th scope="col">Lookup</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleRules.map((rule) => (
                <tr key={rule.id}>
                  <td data-label="Technique">
                    <strong>{rule.techniqueId}</strong>
                    <small>{rule.techniqueName}</small>
                  </td>
                  <td data-label="Source">{rule.source}</td>
                  <td data-label="Rule">
                    <strong>{rule.ruleName}</strong>
                    <small>{rule.ruleSlug}</small>
                  </td>
                  <td data-label="Lookup">
                    <div className="rule-actions">
                      <button
                        type="button"
                        className="rule-mini-btn"
                        onClick={() => handleCopy(rule.ruleSlug)}
                        aria-label={`Copy lookup key ${rule.ruleSlug}`}
                      >
                        {copiedRule === rule.ruleSlug ? "Copied" : "Copy key"}
                      </button>
                      {rule.lookupUrl && (
                        <a
                          className="rule-mini-btn"
                          href={rule.lookupUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open
                        </a>
                      )}
                    </div>
                  </td>
                  <td data-label="Action">
                    <strong>{rule.recommendation}</strong>
                    <small>{rule.applyHint}</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DecisionPanel>
    </SectionShell>
  );
}
