import type { AttackStep } from "../types";
import { SectionShell } from "./SectionShell";

type AttackTimelineProps = {
  steps: AttackStep[];
  activeStepId: string;
  activeStepIndex: number;
  onSelectStep: (stepId: string) => void;
};

export function AttackTimeline({
  steps,
  activeStepId,
  activeStepIndex,
  onSelectStep,
}: AttackTimelineProps) {
  return (
    <SectionShell
      id="timeline"
      eyebrow="Attack Replay"
      title="Each behavior is mapped to telemetry and expected detection coverage."
    >
      <ul className="timeline-list">
        {steps.map((step) => {
          const isActive = step.id === activeStepId;
          const isComplete = step.order - 1 < activeStepIndex;
          const isRevealed = isComplete || isActive;
          const sigmaDisplay = isRevealed ? step.sigmaHits : 0;
          const elasticDisplay = isRevealed ? step.elasticHits : 0;
          const gapDisplay = isRevealed ? step.gapCount : 0;

          return (
            <li className="timeline-item" key={step.id}>
              <button
                type="button"
                className={`timeline-card${isActive ? " is-active" : ""}${isComplete ? " is-complete" : ""}`}
                aria-pressed={isActive}
                aria-label={`Select attack step ${step.order}: ${step.techniqueId} ${step.techniqueName}${isComplete ? ", completed" : ""}${isActive ? ", active" : ""}`}
                onClick={() => onSelectStep(step.id)}
              >
                <span className="timeline-index">
                  <span className="timeline-index-number">{String(step.order).padStart(2, "0")}</span>
                  {isComplete && (
                    <span className="timeline-index-check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </span>
                <span className="timeline-main">
                  <span className="timeline-phase">{step.phase}</span>
                  <span className="timeline-title">
                    {step.techniqueId} - {step.techniqueName}
                  </span>
                  <span className="timeline-action">{step.safeActionLabel}</span>
                  <span className="telemetry-line">{step.shellTelemetry}</span>
                </span>
                <span className="timeline-score">
                  <span className={`sigma-text${isRevealed ? " is-revealed" : ""}`}>Sigma {sigmaDisplay}</span>
                  <span className={`elastic-text${isRevealed ? " is-revealed" : ""}`}>Elastic {elasticDisplay}</span>
                  <span className={`gap-text${isRevealed ? " is-revealed" : ""}`}>Gaps {gapDisplay}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
