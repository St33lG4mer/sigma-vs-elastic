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
      <ul className="timeline-list">
        {steps.map((step) => {
          const isActive = step.id === activeStepId;

          return (
            <li className="timeline-item" key={step.id}>
              <button
                type="button"
                className={`timeline-card${isActive ? " is-active" : ""}`}
                aria-pressed={isActive}
                aria-label={`Select attack step ${step.order}: ${step.techniqueId} ${step.techniqueName}`}
                onClick={() => onSelectStep(step.id)}
              >
                <span className="timeline-index">{String(step.order).padStart(2, "0")}</span>
                <span className="timeline-main">
                  <span className="timeline-phase">{step.phase}</span>
                  <span className="timeline-title">
                    {step.techniqueId} - {step.techniqueName}
                  </span>
                  <span className="timeline-action">{step.safeActionLabel}</span>
                  <span className="telemetry-line">{step.shellTelemetry}</span>
                </span>
                <span className="timeline-score">
                  <span className="sigma-text">Sigma {step.sigmaHits}</span>
                  <span className="elastic-text">Elastic {step.elasticHits}</span>
                  <span className="gap-text">Gaps {step.gapCount}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
