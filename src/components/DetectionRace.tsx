import type { Detection, Summary } from "../types";
import { SectionShell } from "./SectionShell";

type DetectionRaceProps = {
  summary: Summary;
  detections: Detection[];
};

export function DetectionRace({ summary, detections }: DetectionRaceProps) {
  const keepCount = detections.filter((detection) => detection.classification === "keep").length;
  const gapCount = detections.filter((detection) => detection.classification === "gap").length;

  return (
    <SectionShell
      id="race"
      eyebrow="Detection Race"
      title="The public view compares signal, overlap, and gaps without exposing the lab."
    >
      <div className="race-grid">
        <article className="score-card sigma-card">
          <span>Sigma hits</span>
          <strong>{summary.sigmaHitCount}</strong>
          <p>{keepCount} high-signal candidates in the sample set.</p>
        </article>
        <article className="score-card elastic-card">
          <span>Elastic hits</span>
          <strong>{summary.elasticHitCount}</strong>
          <p>{summary.overlapCount} overlapping rule pairs to evaluate.</p>
        </article>
        <article className="score-card gap-card">
          <span>Gap queue</span>
          <strong>{summary.gapCount}</strong>
          <p>{gapCount} custom-rule candidates represented in sample data.</p>
        </article>
      </div>
      <div className="detection-table" role="table" aria-label="Detection sample">
        {detections.map((detection) => (
          <div className="detection-row" role="row" key={detection.id}>
            <span>{detection.source}</span>
            <strong>{detection.ruleName}</strong>
            <em>{detection.classification}</em>
            <span>{detection.hitCount} hits</span>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
