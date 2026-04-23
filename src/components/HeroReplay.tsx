import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Network,
  Pause,
  Play,
  Radar,
  ShieldCheck,
  SkipBack,
  SkipForward,
} from "lucide-react";
import type { AttackStep, Summary } from "../types";

type KillChainRouteKey = "ingress" | "execution" | "telemetry" | "exfil" | "control";

type KillChainRoute = {
  id: string;
  key: KillChainRouteKey;
  className: string;
  d: string;
};

type ReplayStage = {
  id: "execute" | "telemetry" | "detect";
  label: string;
  context: string;
};

const killChainRoutes: KillChainRoute[] = [
  {
    id: "route-ingress",
    key: "ingress",
    className: "route-ingress",
    d: "M130 144 C206 108, 252 88, 332 92",
  },
  {
    id: "route-execution",
    key: "execution",
    className: "route-execution",
    d: "M350 96 C442 112, 496 140, 546 176",
  },
  {
    id: "route-telemetry",
    key: "telemetry",
    className: "route-telemetry",
    d: "M526 210 C458 262, 394 288, 332 288",
  },
  {
    id: "route-exfil",
    key: "exfil",
    className: "route-exfil",
    d: "M528 212 C476 306, 252 322, 128 184",
  },
  {
    id: "route-control",
    key: "control",
    className: "route-control",
    d: "M140 152 C188 238, 252 286, 320 298",
  },
];

const replayStages: ReplayStage[] = [
  {
    id: "execute",
    label: "Execution",
    context: "Attacker activity runs on the victim path.",
  },
  {
    id: "telemetry",
    label: "Telemetry",
    context: "Host and shell signals stream to SIEM.",
  },
  {
    id: "detect",
    label: "Detection",
    context: "Sigma and Elastic rules score this step.",
  },
];

function deriveBaseFlowKeys(step: AttackStep): Set<KillChainRouteKey> {
  const activeKeys = new Set<KillChainRouteKey>(["ingress", "execution", "telemetry"]);
  const techniqueId = step.techniqueId;

  if (techniqueId.startsWith("T1555")) {
    activeKeys.add("exfil");
  }

  if (techniqueId.startsWith("T1003.006")) {
    activeKeys.add("control");
  }

  if (step.gapCount > 0) {
    activeKeys.add("exfil");
  }

  if (activeKeys.size < 2) {
    activeKeys.add("execution");
  }

  return activeKeys;
}

function deriveStageFlowKeys(step: AttackStep, stage: ReplayStage["id"]): Set<KillChainRouteKey> {
  const base = deriveBaseFlowKeys(step);

  if (stage === "execute") {
    const flows = new Set<KillChainRouteKey>();
    if (base.has("ingress")) {
      flows.add("ingress");
    }
    if (base.has("execution")) {
      flows.add("execution");
    }
    if (base.has("control")) {
      flows.add("control");
    }
    if (flows.size === 0) {
      flows.add("execution");
    }
    return flows;
  }

  if (stage === "telemetry") {
    const flows = new Set<KillChainRouteKey>(["execution", "telemetry"]);
    if (base.has("exfil")) {
      flows.add("exfil");
    }
    return flows;
  }

  const detectionFlows = new Set<KillChainRouteKey>(["telemetry", "control"]);
  if (step.gapCount > 0 || base.has("exfil")) {
    detectionFlows.add("exfil");
  }
  return detectionFlows;
}

function getNodeClass(baseClass: string, isActive: boolean, isPlaying: boolean) {
  if (!isActive) {
    return `node ${baseClass}`;
  }

  return `node ${baseClass}${isPlaying ? " is-active is-live" : " is-active"}`;
}

type HeroReplayProps = {
  summary: Summary;
  activeStep: AttackStep;
  activeStepIndex: number;
  stepCount: number;
  isPlaying: boolean;
  showCompletionPopup: boolean;
  completionHeadline: string;
  completionNarrative: string;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePlayback: () => void;
  onDismissCompletion: () => void;
  onReplayFromCompletion: () => void;
};

export function HeroReplay({
  summary,
  activeStep,
  activeStepIndex,
  stepCount,
  isPlaying,
  showCompletionPopup,
  completionHeadline,
  completionNarrative,
  onPrevious,
  onNext,
  onTogglePlayback,
  onDismissCompletion,
  onReplayFromCompletion,
}: HeroReplayProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const [stepCompletePulse, setStepCompletePulse] = useState(false);

  useEffect(() => {
    setStageIndex(0);
  }, [activeStep.id]);

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setStageIndex((current) => (current + 1) % replayStages.length);
    }, 880);

    return () => window.clearInterval(timer);
  }, [isPlaying, activeStep.id]);

  useEffect(() => {
    if (!isPlaying) {
      setStepCompletePulse(false);
      return undefined;
    }

    setStepCompletePulse(true);
    const timer = window.setTimeout(() => {
      setStepCompletePulse(false);
    }, 920);

    return () => window.clearTimeout(timer);
  }, [activeStepIndex, isPlaying]);

  const totalHits = summary.sigmaHitCount + summary.elasticHitCount;
  const sigmaWidth =
    totalHits > 0 ? Math.round((summary.sigmaHitCount / totalHits) * 100) : 0;
  const elasticWidth =
    totalHits > 0 ? Math.round((summary.elasticHitCount / totalHits) * 100) : 0;
  const activeStage = replayStages[stageIndex] ?? replayStages[0];
  const activeFlows = deriveStageFlowKeys(activeStep, activeStage.id);
  const scenarioProgress = Math.round(((activeStepIndex + 1) / Math.max(stepCount, 1)) * 100);
  const leadDetection =
    activeStep.expectedDetections[0] ?? `${activeStep.techniqueId} behavior coverage`;
  const eventFeed = useMemo(
    () => [
      {
        id: "command",
        label: "Action",
        value: activeStep.safeActionLabel,
      },
      {
        id: "telemetry",
        label: "Telemetry",
        value: activeStep.shellTelemetry,
      },
      {
        id: "detection",
        label: "Detection",
        value: `${leadDetection} | Sigma ${activeStep.sigmaHits} vs Elastic ${activeStep.elasticHits}`,
      },
    ],
    [activeStep.elasticHits, activeStep.safeActionLabel, activeStep.shellTelemetry, activeStep.sigmaHits, leadDetection],
  );
  const attackerActive =
    activeFlows.has("ingress") || activeFlows.has("exfil") || activeFlows.has("control");
  const firewallActive = activeFlows.has("ingress") || activeFlows.has("execution");
  const victimActive =
    activeFlows.has("execution") || activeFlows.has("telemetry") || activeFlows.has("exfil");
  const siemActive = activeFlows.has("telemetry") || activeFlows.has("control");

  return (
    <section className="hero-replay" aria-labelledby="hero-title">
      <div className="topbar">
        <a className="brand-mark" href="#top" aria-label="DKSec attack replay home">
          <span className="pulse-dot" />
          <span>DKSec Attack Replay</span>
        </a>
        <nav className="nav-links" aria-label="Showcase sections">
          <a href="#lab">Lab</a>
          <a href="#timeline">Replay</a>
          <a href="#race">Detection Race</a>
          <a href="#findings">Findings</a>
        </nav>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Sigma vs Elastic detection experiment</p>
          <h1 id="hero-title">
            <span>Replay the</span>
            <span>attack.</span>
            <span>Watch the</span>
            <span>rules</span>
            <span>compete.</span>
          </h1>
          <p className="hero-lede">
            A controlled Windows attack chain runs through a local SOCLAB. Each
            phase is mapped to telemetry, detections, overlaps, misses, and
            engineering decisions.
          </p>

          <div className="replay-console" aria-label="Attack replay controls">
            <div
              className="active-step-strip"
              aria-live={isPlaying ? "off" : "polite"}
              aria-atomic="true"
            >
              <span>
                Step {activeStepIndex + 1} / {stepCount}
              </span>
              <strong>{activeStep.phase}</strong>
              <small>{activeStep.safeActionLabel}</small>
            </div>
            <div className="replay-buttons">
              <button type="button" className="replay-button" aria-label="Previous attack step" onClick={onPrevious}>
                <SkipBack size={16} aria-hidden="true" focusable="false" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                className="replay-button replay-button-primary"
                aria-label={isPlaying ? "Pause attack replay" : "Play attack replay"}
                aria-pressed={isPlaying}
                onClick={onTogglePlayback}
              >
                {isPlaying ? (
                  <Pause size={16} aria-hidden="true" focusable="false" />
                ) : (
                  <Play size={16} aria-hidden="true" focusable="false" />
                )}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>
              <button type="button" className="replay-button" aria-label="Next attack step" onClick={onNext}>
                <SkipForward size={16} aria-hidden="true" focusable="false" />
                <span>Next</span>
              </button>
            </div>
            <div className="replay-progress" aria-label="Scenario progress">
              <span>Scenario progress</span>
              <strong>{scenarioProgress}%</strong>
              <div className="progress-track">
                <span className="progress-fill" style={{ width: `${scenarioProgress}%` }} />
              </div>
            </div>
          </div>

          <div className="status-row" aria-label="Current replay status">
            <div className="status-tile">
              <span>Replay</span>
              <strong>00:{String(activeStep.order * 7 + 24).padStart(2, "0")}</strong>
            </div>
            <div className="status-tile">
              <span>Technique</span>
              <strong>{activeStep.techniqueId}</strong>
            </div>
            <div className="status-tile status-live">
              <span>Status</span>
              <strong>{summary.isSampleData ? "Sample" : "Observed"}</strong>
            </div>
          </div>

          <div className="comparison-bars">
            <div className="bar-line">
              <span>Sigma</span>
              <div className="bar-track">
                <span className="bar-fill sigma" style={{ width: `${sigmaWidth}%` }} />
              </div>
              <strong>{summary.sigmaHitCount}</strong>
            </div>
            <div className="bar-line">
              <span>Elastic</span>
              <div className="bar-track">
                <span className="bar-fill elastic" style={{ width: `${elasticWidth}%` }} />
              </div>
              <strong>{summary.elasticHitCount}</strong>
            </div>
            <div className="bar-line">
              <span>Gaps</span>
              <div className="bar-track">
                <span className="bar-fill gap" style={{ width: `${Math.min(summary.gapCount * 6, 100)}%` }} />
              </div>
              <strong>{summary.gapCount}</strong>
            </div>
          </div>
        </div>

        <div
          className={`lab-map-card${stepCompletePulse ? " is-step-complete" : ""}`}
          aria-label="Lab kill chain map"
        >
          <div className="panel-heading">
            <span>Lab Kill Chain Map</span>
            <small>{summary.snapshotLabel}</small>
          </div>
          <div className="map-step-state" aria-live={isPlaying ? "off" : "polite"}>
            <strong>{activeStep.techniqueId}</strong>
            <span>{isPlaying ? `${activeStage.label} stage` : "Step ready"}</span>
          </div>
          <p className="map-context">{activeStage.context}</p>
          <div className="lab-map">
            <div className={getNodeClass("attacker", attackerActive, isPlaying)}>
              <Radar size={18} aria-hidden="true" focusable="false" />
              <span>Attacker</span>
              <strong>Linux</strong>
            </div>
            <div className={getNodeClass("firewall", firewallActive, isPlaying)}>
              <Network size={18} aria-hidden="true" focusable="false" />
              <span>Control</span>
              <strong>OPNsense</strong>
            </div>
            <div className={getNodeClass("victim", victimActive, isPlaying)}>
              <AlertTriangle size={18} aria-hidden="true" focusable="false" />
              <span>Victim</span>
              <strong>Windows</strong>
            </div>
            <div className={getNodeClass("siem", siemActive, isPlaying)}>
              <ShieldCheck size={18} aria-hidden="true" focusable="false" />
              <span>Detection</span>
              <strong>Elastic SIEM</strong>
            </div>
            <svg className="map-lines" viewBox="0 0 640 360" aria-hidden="true">
              {killChainRoutes.map((route) => {
                const isActive = activeFlows.has(route.key);

                return (
                  <path
                    key={route.id}
                    id={route.id}
                    className={`map-route ${route.className}${isActive ? " is-active" : ""}${isActive && isPlaying ? " is-live" : ""}`}
                    d={route.d}
                  />
                );
              })}
              {isPlaying &&
                killChainRoutes
                  .filter((route) => activeFlows.has(route.key))
                  .map((route, index) => (
                    <circle
                      key={`${route.id}-packet`}
                      className={`packet ${route.className}`}
                      r={index % 2 === 0 ? 4 : 3.2}
                    >
                      <animateMotion
                        begin={`${(index * 0.18).toFixed(2)}s`}
                        dur={`${(2.05 + index * 0.32).toFixed(2)}s`}
                        repeatCount="indefinite"
                        rotate="auto"
                      >
                        <mpath href={`#${route.id}`} xlinkHref={`#${route.id}`} />
                      </animateMotion>
                    </circle>
                  ))}
            </svg>
          </div>
          <ul className="event-feed" aria-label="Live attack telemetry and detection feed">
            {eventFeed.map((eventItem, index) => (
              <li
                key={eventItem.id}
                className={`event-row${index === stageIndex ? " is-active" : ""}`}
              >
                <span>{eventItem.label}</span>
                <strong>{eventItem.value}</strong>
              </li>
            ))}
          </ul>
          <div className="mini-metrics">
            <span><Activity size={14} aria-hidden="true" focusable="false" /> {summary.attackStepCount} steps</span>
            <span>{summary.mitreTechniqueCount} techniques</span>
            <span>{summary.overlapCount} overlaps</span>
          </div>
          {showCompletionPopup && (
            <section
              className="widget-completion-popup"
              role="dialog"
              aria-modal="false"
              aria-labelledby="widget-completion-title"
            >
              <p className="eyebrow">Attack Complete</p>
              <h3 id="widget-completion-title">{completionHeadline}</h3>
              <p>{completionNarrative}</p>
              <div className="widget-completion-metrics">
                <article>
                  <span>Techniques</span>
                  <strong>{summary.mitreTechniqueCount}</strong>
                </article>
                <article>
                  <span>Sigma</span>
                  <strong>{summary.sigmaHitCount}</strong>
                </article>
                <article>
                  <span>Elastic</span>
                  <strong>{summary.elasticHitCount}</strong>
                </article>
                <article>
                  <span>Gaps</span>
                  <strong>{summary.gapCount}</strong>
                </article>
              </div>
              <p className="completion-note">
                Next move: keep high-signal rules, reduce overlap ({summary.overlapCount}), and author custom rules for uncovered behavior.
              </p>
              <small className="data-source-note">Data source: repository snapshot (not live SIEM).</small>
              <div className="widget-completion-actions">
                <button type="button" className="replay-button" onClick={onDismissCompletion}>
                  Review chain
                </button>
                <button type="button" className="replay-button replay-button-primary" onClick={onReplayFromCompletion}>
                  Replay attack
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
