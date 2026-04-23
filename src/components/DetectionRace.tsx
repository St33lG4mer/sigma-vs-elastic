import type { Detection, Summary } from "../types";
import { SectionShell } from "./SectionShell";

type DetectionRaceProps = {
  summary: Summary;
  detections: Detection[];
};

export function DetectionRace({ summary, detections }: DetectionRaceProps) {
  const keepCount = detections.filter((detection) => detection.classification === "keep").length;
  const gapCount = detections.filter((detection) => detection.classification === "gap").length;
  const detectionSample = detections.slice(0, 12);

  return (
    <SectionShell
      id="race"
      eyebrow="Detection Race"
      title="The public view compares alert volume, rule overlap, and gap coverage without exposing the lab."
    >
      <div className="race-grid">
        <article className="score-card sigma-card">
          <span>Sigma rule alerts</span>
          <strong>{summary.sigmaHitCount}</strong>
          <p>{keepCount} high-signal rule candidates in the sample set.</p>
        </article>
        <article className="score-card elastic-card">
          <span>Elastic rule alerts</span>
          <strong>{summary.elasticHitCount}</strong>
          <p>{summary.overlapCount} overlapping rule pairs to evaluate.</p>
        </article>
        <article className="score-card gap-card">
          <span>Alert gap queue</span>
          <strong>{summary.gapCount}</strong>
          <p>{gapCount} custom-rule candidates for missing alerts in sample data.</p>
        </article>
      </div>
      <div className="detection-table-wrap">
        <table className="detection-table" aria-label="Detection sample">
          <thead>
            <tr>
              <th scope="col">Source</th>
              <th scope="col">Rule</th>
              <th scope="col">Classification</th>
              <th scope="col">Alerts</th>
            </tr>
          </thead>
          <tbody>
            {detectionSample.map((detection) => (
              <tr key={detection.id}>
                <td data-label="Source">{detection.source}</td>
                <td data-label="Rule">
                  <strong>{detection.ruleName}</strong>
                </td>
                <td data-label="Classification">
                  <em>{detection.classification}</em>
                </td>
                <td data-label="Alerts">{detection.hitCount} alerts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}
