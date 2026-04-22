export type DetectionSource = "Sigma" | "Elastic" | "Both" | "Gap";

export type DetectionStatus = "sample" | "draft" | "observed" | "missed";

export type Summary = {
  experimentStatus: string;
  snapshotLabel: string;
  slug: string;
  lastUpdated: string;
  isSampleData: boolean;
  attackStepCount: number;
  mitreTechniqueCount: number;
  sigmaHitCount: number;
  elasticHitCount: number;
  overlapCount: number;
  gapCount: number;
  draftFindingCount: number;
};

export type AttackStep = {
  id: string;
  order: number;
  phase: string;
  techniqueId: string;
  techniqueName: string;
  safeActionLabel: string;
  telemetrySources: string[];
  shellTelemetry: string;
  expectedDetections: string[];
  sigmaHits: number;
  elasticHits: number;
  gapCount: number;
  status: DetectionStatus;
};

export type Detection = {
  id: string;
  source: DetectionSource;
  ruleName: string;
  severity: "critical" | "high" | "medium" | "low";
  techniqueIds: string[];
  attackStepIds: string[];
  hitCount: number;
  overlapGroupId?: string;
  classification: "keep" | "tune" | "overlap" | "gap" | "observe";
  notes: string;
};

export type Finding = {
  id: string;
  category: "Keep" | "Tune" | "Remove overlap" | "Create custom rule" | "Needs more testing";
  title: string;
  description: string;
  relatedRuleIds: string[];
  relatedTechniqueIds: string[];
  recommendation: string;
  confidence: "low" | "medium" | "high";
  status: "draft" | "validated";
};
