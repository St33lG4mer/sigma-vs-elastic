import type { AttackStep } from "../types";
import { SectionShell } from "./SectionShell";

type AttackTimelineProps = {
  steps: AttackStep[];
};

export function AttackTimeline({ steps }: AttackTimelineProps) {
  return (
    <SectionShell
      id="timeline"
      eyebrow="Attack Replay"
      title="Each behavior is mapped to telemetry and expected detection coverage."
    >
      <div className="timeline-list">
        {steps.map((step) => (
          <article className="timeline-card" key={step.id}>
            <div className="timeline-index">{String(step.order).padStart(2, "0")}</div>
            <div>
              <p className="timeline-phase">{step.phase}</p>
              <h3>
                {step.techniqueId} - {step.techniqueName}
              </h3>
              <p>{step.safeActionLabel}</p>
              <p className="telemetry-line">{step.shellTelemetry}</p>
            </div>
            <div className="timeline-score">
              <span className="sigma-text">S {step.sigmaHits}</span>
              <span className="elastic-text">E {step.elasticHits}</span>
              <span className="gap-text">G {step.gapCount}</span>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
