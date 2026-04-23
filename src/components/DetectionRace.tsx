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
      <div className="detection-table-wrap">
        <table className="detection-table" aria-label="Detection sample">
          <thead>
            <tr>
              <th scope="col">Source</th>
              <th scope="col">Rule</th>
              <th scope="col">Classification</th>
              <th scope="col">Hits</th>
            </tr>
          </thead>
          <tbody>
            {detections.map((detection) => (
              <tr key={detection.id}>
                <td data-label="Source">{detection.source}</td>
                <td data-label="Rule">
                  <strong>{detection.ruleName}</strong>
                </td>
                <td data-label="Classification">
                  <em>{detection.classification}</em>
                </td>
                <td data-label="Hits">{detection.hitCount} hits</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}
