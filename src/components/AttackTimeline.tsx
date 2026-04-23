import type { AttackStep } from "../types";
import { SectionShell } from "./SectionShell";

type AttackTimelineProps = {
  steps: AttackStep[];
  activeStepId: string;
  onSelectStep: (stepId: string) => void;
};

export function AttackTimeline({ steps, activeStepId, onSelectStep }: AttackTimelineProps) {
  return (
    <SectionShell
      id="timeline"
      eyebrow="Attack Replay"
      title="Each behavior is mapped to telemetry and expected detection coverage."
    >
      <div className="timeline-list">
        {steps.map((step) => {
          const isActive = step.id === activeStepId;

          return (
            <article
              className={`timeline-card${isActive ? " is-active" : ""}`}
              key={step.id}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={`Select attack step ${step.order}: ${step.techniqueId} ${step.techniqueName}`}
              onClick={() => onSelectStep(step.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectStep(step.id);
                }
              }}
            >
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
                <span className="sigma-text">Sigma {step.sigmaHits}</span>
                <span className="elastic-text">Elastic {step.elasticHits}</span>
                <span className="gap-text">Gaps {step.gapCount}</span>
              </div>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
