import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const repoRoot = resolve(projectRoot, "..");

const scenariosPath = resolve(repoRoot, "sliver_test_harness", "scenarios.py");
const coverageMapPath = resolve(repoRoot, "sliver_test_harness", "coverage_map.csv");
const ruleAstRoot = resolve(repoRoot, "rule_ast");
const outputPath = resolve(projectRoot, "src", "data", "replay.generated.ts");

const scenarioId = process.env.SHOWOFF_SCENARIO_ID || "S2_credential_theft";

const techniqueNames = {
  "T1003": "OS Credential Dumping",
  "T1003.001": "LSASS Memory",
  "T1003.002": "Security Account Manager",
  "T1003.003": "NTDS",
  "T1003.006": "DCSync",
  "T1558.003": "Kerberoasting",
  "T1558.004": "AS-REP Roasting",
  "T1555.003": "Credentials from Web Browsers",
  "T1547.001": "Registry Run Keys",
  "T1053.005": "Scheduled Task",
  "T1562.001": "Impair Defenses",
  "T1027": "Obfuscated Files or Information",
  "T1071": "Application Layer Protocol",
  "T1105": "Ingress Tool Transfer",
  "T1090": "Proxy",
};

const telemetryByKind = {
  shell: "PowerShell and process telemetry on Windows victim",
  native: "Sliver native execution + process telemetry on victim",
  execute: "Command execution telemetry on victim",
  execute_assembly: "Assembly execution and process telemetry on victim",
  registry: "Registry and process telemetry on victim",
  upload: "File and process telemetry on victim",
  noop: "Control-plane telemetry only",
};

function normalizeText(value) {
  return value
    .replace(/â†’|→/g, "->")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toTitle(value) {
  return normalizeText(value)
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function extractBalanced(text, startIndex, openChar, closeChar) {
  let depth = 0;
  let started = false;

  for (let index = startIndex; index < text.length; index += 1) {
    const character = text[index];

    if (character === openChar) {
      depth += 1;
      started = true;
    } else if (character === closeChar) {
      depth -= 1;
      if (started && depth === 0) {
        return text.slice(startIndex, index + 1);
      }
    }
  }

  return "";
}

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const next = csvText[index + 1];

    if (inQuotes) {
      if (character === '"') {
        if (next === '"') {
          field += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      inQuotes = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (character !== "\r") {
      field += character;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const [headers, ...dataRows] = rows;
  return dataRows
    .filter((dataRow) => dataRow.length > 1)
    .map((dataRow) =>
      Object.fromEntries(headers.map((header, headerIndex) => [header, dataRow[headerIndex] ?? ""])),
    );
}

function readField(objectText, fieldName) {
  const match = objectText.match(new RegExp(`"${fieldName}"\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"`, "m"));
  if (!match) {
    return "";
  }
  return normalizeText(match[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
}

function techniqueToPhase(techniqueId) {
  if (!techniqueId) {
    return "Credential Access";
  }

  if (techniqueId.startsWith("T1003") || techniqueId.startsWith("T1558") || techniqueId.startsWith("T1555")) {
    return "Credential Access";
  }
  if (techniqueId.startsWith("T1562") || techniqueId.startsWith("T1027")) {
    return "Defense Evasion";
  }
  if (techniqueId.startsWith("T1071") || techniqueId.startsWith("T1105") || techniqueId.startsWith("T1090")) {
    return "Command and Control";
  }
  if (techniqueId.startsWith("T1547") || techniqueId.startsWith("T1053") || techniqueId.startsWith("T1546")) {
    return "Persistence";
  }
  if (techniqueId.startsWith("T1082") || techniqueId.startsWith("T1033") || techniqueId.startsWith("T1087")) {
    return "Discovery";
  }
  return "Credential Access";
}

function techniqueToTactic(techniqueId) {
  return techniqueToPhase(techniqueId).toLowerCase().replace(/\s+/g, "_");
}

function severityForTactic(tactic) {
  if (tactic === "credential_access") {
    return "critical";
  }
  if (tactic === "defense_evasion" || tactic === "command_and_control") {
    return "high";
  }
  if (tactic === "persistence" || tactic === "execution" || tactic === "collection") {
    return "medium";
  }
  return "low";
}

function getRuleName(row) {
  const source = row.source.toLowerCase();
  const rulePath = resolve(ruleAstRoot, source, `${row.slug}.json`);

  if (existsSync(rulePath)) {
    try {
      const parsed = JSON.parse(readFileSync(rulePath, "utf8"));
      return parsed.name || row.slug;
    } catch {
      return row.slug;
    }
  }

  return row.slug;
}

if (!existsSync(scenariosPath) || !existsSync(coverageMapPath) || !existsSync(ruleAstRoot)) {
  throw new Error("Replay source data missing. Ensure sliver_test_harness and rule_ast exist in repo root.");
}

const scenariosText = readFileSync(scenariosPath, "utf8");
const scenarioMarker = `"${scenarioId}":`;
const scenarioIndex = scenariosText.indexOf(scenarioMarker);

if (scenarioIndex < 0) {
  throw new Error(`Scenario ${scenarioId} not found in sliver_test_harness/scenarios.py`);
}

const scenarioObjectStart = scenariosText.indexOf("{", scenarioIndex);
const scenarioBlock = extractBalanced(scenariosText, scenarioObjectStart, "{", "}");
const stepsMarkerIndex = scenarioBlock.indexOf('"steps":');
const stepsArrayStart = scenarioBlock.indexOf("[", stepsMarkerIndex);
const stepsArrayBlock = extractBalanced(scenarioBlock, stepsArrayStart, "[", "]");

const stepObjects = [];
let objectDepth = 0;
let objectStart = -1;

for (let index = 0; index < stepsArrayBlock.length; index += 1) {
  const character = stepsArrayBlock[index];
  if (character === "{") {
    if (objectDepth === 0) {
      objectStart = index;
    }
    objectDepth += 1;
  } else if (character === "}") {
    objectDepth -= 1;
    if (objectDepth === 0 && objectStart >= 0) {
      stepObjects.push(stepsArrayBlock.slice(objectStart, index + 1));
      objectStart = -1;
    }
  }
}

const scenarioRowsRaw = parseCsv(readFileSync(coverageMapPath, "utf8"));
const scenarioRows = scenarioRowsRaw
  .filter((row) => row.scenario_id === scenarioId && (row.source === "sigma" || row.source === "elastic"))
  .map((row) => ({
    ...row,
    slugLower: row.slug.toLowerCase(),
    triggerLower: (row.trigger_hint || "").toLowerCase(),
    displayName: getRuleName(row),
  }));

const hintSources = new Map();
for (const row of scenarioRows) {
  const hintKey = row.trigger_hint || row.slug;
  const sourceSet = hintSources.get(hintKey) || new Set();
  sourceSet.add(row.source);
  hintSources.set(hintKey, sourceSet);
}

const attackSteps = stepObjects.map((stepObject, index) => {
  const name = readField(stepObject, "name");
  const command = readField(stepObject, "command");
  const notes = readField(stepObject, "notes");
  const kind = readField(stepObject, "kind");
  const atck = readField(stepObject, "atck");

  const keywords = new Set(
    [name, command, notes, atck]
      .join(" ")
      .toLowerCase()
      .split(/[^a-z0-9.]+/)
      .filter((token) => token.length >= 4 || /^t\d{4}/.test(token)),
  );

  let matchedRows = scenarioRows.filter(
    (row) => [...keywords].some((keyword) => row.slugLower.includes(keyword) || row.triggerLower.includes(keyword)),
  );

  if (matchedRows.length === 0 && atck) {
    const tactic = techniqueToTactic(atck);
    matchedRows = scenarioRows.filter((row) => row.tactic === tactic);
  }

  const sigmaHits = matchedRows.filter((row) => row.source === "sigma").length;
  const elasticHits = matchedRows.filter((row) => row.source === "elastic").length;
  const detectionNames = [...new Set(matchedRows.map((row) => row.displayName))].slice(0, 2);

  return {
    id: name || `step_${index + 1}`,
    order: index + 1,
    phase: techniqueToPhase(atck),
    techniqueId: atck || "T0000",
    techniqueName: techniqueNames[atck] || toTitle((name || "activity").replace(/_/g, " ")),
    safeActionLabel: notes || toTitle((name || "activity").replace(/_/g, " ")),
    telemetrySources: [
      "Sysmon",
      "PowerShell/Bash command telemetry",
      "Windows Event Log",
      "Elastic SIEM",
    ],
    shellTelemetry: telemetryByKind[kind] || telemetryByKind.shell,
    expectedDetections:
      detectionNames.length > 0 ? detectionNames : [`${techniqueToPhase(atck)} behavior coverage`],
    sigmaHits,
    elasticHits,
    gapCount: sigmaHits === 0 || elasticHits === 0 ? 1 : 0,
    status: "sample",
  };
});

const sigmaTotal = scenarioRows.filter((row) => row.source === "sigma").length;
const elasticTotal = scenarioRows.filter((row) => row.source === "elastic").length;
const overlapCount = [...hintSources.values()].filter(
  (sources) => sources.has("sigma") && sources.has("elastic"),
).length;
const gapCount = attackSteps.filter((step) => step.gapCount > 0).length;
const techniqueCount = new Set(attackSteps.map((step) => step.techniqueId).filter(Boolean)).size;

const summary = {
  experimentStatus: `Replay model generated from ${scenarioId}`,
  snapshotLabel: `Sanitized public sample (${scenarioId})`,
  slug: "sigma-vs-elastic",
  lastUpdated: new Date().toISOString().slice(0, 10),
  isSampleData: true,
  attackStepCount: attackSteps.length,
  mitreTechniqueCount: techniqueCount,
  sigmaHitCount: sigmaTotal,
  elasticHitCount: elasticTotal,
  overlapCount,
  gapCount,
  draftFindingCount: 3,
};

const detections = scenarioRows.slice(0, 6).map((row, index) => {
  const hintKey = row.trigger_hint || row.slug;
  const sourcesForHint = hintSources.get(hintKey) || new Set();
  const hasOverlap = sourcesForHint.has("sigma") && sourcesForHint.has("elastic");
  const matchingStep = attackSteps.find((step) => {
    const lower = `${row.slugLower} ${row.triggerLower}`;
    const tokens = step.id.toLowerCase().split(/[^a-z0-9.]+/).filter(Boolean);
    return tokens.some((token) => token.length > 3 && lower.includes(token));
  }) || attackSteps[0];

  return {
    id: `${row.source}-${row.slug}`.replace(/[^a-z0-9_-]/gi, "_"),
    source: row.source === "sigma" ? "Sigma" : "Elastic",
    ruleName: row.displayName,
    severity: severityForTactic(row.tactic || "unknown"),
    techniqueIds: [matchingStep?.techniqueId || "T0000"],
    attackStepIds: [matchingStep?.id || attackSteps[0]?.id || "step_1"],
    hitCount: 1,
    overlapGroupId: hasOverlap ? hintKey.replace(/[^a-z0-9_-]/gi, "_") : undefined,
    classification: hasOverlap ? "overlap" : row.source === "sigma" ? "keep" : "observe",
    notes: row.trigger_hint || "Coverage derived from sliver harness mapping.",
  };
});

const findings = [
  {
    id: "keep-strongest-source",
    category: "Keep",
    title: "Keep strongest source rules per technique",
    description: `Generated from ${scenarioId}: compare Sigma (${sigmaTotal}) and Elastic (${elasticTotal}) alerts per step.`,
    relatedRuleIds: detections.slice(0, 2).map((detection) => detection.id),
    relatedTechniqueIds: attackSteps.slice(0, 2).map((step) => step.techniqueId),
    recommendation: "Retain higher-signal rules and document overlap rationale per replay step.",
    confidence: "medium",
    status: "draft",
  },
  {
    id: "tune-overlap-groups",
    category: "Tune",
    title: "Tune overlap groups from harness coverage",
    description: `${overlapCount} overlap groups appear in the selected scenario coverage map.`,
    relatedRuleIds: detections.filter((detection) => detection.classification === "overlap").map((detection) => detection.id),
    relatedTechniqueIds: attackSteps.map((step) => step.techniqueId),
    recommendation: "Tune overlapping rules to reduce duplicate alerting while preserving context.",
    confidence: "medium",
    status: "draft",
  },
  {
    id: "create-gap-rules",
    category: "Create custom rule",
    title: "Create custom rules for uncovered replay steps",
    description: `${gapCount} replay steps have one-sided or missing source coverage in the generated model.`,
    relatedRuleIds: [],
    relatedTechniqueIds: attackSteps.filter((step) => step.gapCount > 0).map((step) => step.techniqueId),
    recommendation: "Author custom correlation rules for steps where one source consistently misses.",
    confidence: "low",
    status: "draft",
  },
];

const output = `/* auto-generated from sliver_test_harness and rule_ast; do not edit by hand */
import type { AttackStep, Detection, Finding, Summary } from "../types";

export const summary: Summary = ${JSON.stringify(summary, null, 2)};

export const attackSteps: AttackStep[] = ${JSON.stringify(attackSteps, null, 2)};

export const detections: Detection[] = ${JSON.stringify(detections, null, 2)};

export const findings: Finding[] = ${JSON.stringify(findings, null, 2)};
`;

mkdirSync(resolve(projectRoot, "src", "data"), { recursive: true });
writeFileSync(outputPath, output, "utf8");
