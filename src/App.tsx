import { useEffect, useState } from "react";
import { attackSteps, detections, findings, summary } from "./data/experiment";
import { AttackTimeline } from "./components/AttackTimeline";
import { DetectionRace } from "./components/DetectionRace";
import { Findings } from "./components/Findings";
import { HeroReplay } from "./components/HeroReplay";
import { LabArchitecture } from "./components/LabArchitecture";
import type { AttackStep } from "./types";

const initialStepIndex = Math.min(2, attackSteps.length - 1);
const privilegeEscalationTechniquePrefixes = ["T1134", "T1548", "T1068", "T1574"];
const privilegedStepKeywords = /\b(getsystem|impersonate|sedebugprivilege|localsystem|privilege escalation)\b/i;

function hasSystemAccessEvidence(steps: AttackStep[]) {
  return steps.some((step) => {
    const byTechnique = privilegeEscalationTechniquePrefixes.some((prefix) =>
      step.techniqueId.startsWith(prefix),
    );

    if (byTechnique) {
      return true;
    }

    const combinedText =
      `${step.id} ${step.safeActionLabel} ${step.shellTelemetry} ${step.expectedDetections.join(" ")}`;
    return privilegedStepKeywords.test(combinedText);
  });
}

export default function App() {
  const [activeStepIndex, setActiveStepIndex] = useState(initialStepIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const activeStep = attackSteps[activeStepIndex] ?? attackSteps[0];
  const hasSystemOutcome = hasSystemAccessEvidence(attackSteps);
  const completionHeadline = hasSystemOutcome
    ? "SYSTEM-level access achieved"
    : "Credential access objectives achieved";
  const completionNarrative = hasSystemOutcome
    ? "The replay reached a privileged execution state and validated detection visibility across the chain."
    : "The replay completed credential-access objectives with mapped telemetry and detection coverage.";

  function showPreviousStep() {
    setShowCompletionModal(false);
    setActiveStepIndex((currentIndex) =>
      currentIndex === 0 ? attackSteps.length - 1 : currentIndex - 1,
    );
  }

  function showNextStep(stopAtEnd = false) {
    setShowCompletionModal(false);
    setActiveStepIndex((currentIndex) => {
      if (currentIndex === attackSteps.length - 1) {
        return stopAtEnd ? currentIndex : 0;
      }

      return currentIndex + 1;
    });
  }

  function selectStep(stepId: string) {
    const nextStepIndex = attackSteps.findIndex((step) => step.id === stepId);

    if (nextStepIndex >= 0) {
      setActiveStepIndex(nextStepIndex);
      setIsPlaying(false);
      setShowCompletionModal(false);
    }
  }

  function replayAttack() {
    setActiveStepIndex(0);
    setShowCompletionModal(false);
    setIsPlaying(true);
  }

  function togglePlayback() {
    setShowCompletionModal(false);

    if (!isPlaying && activeStepIndex === attackSteps.length - 1) {
      replayAttack();
      return;
    }

    setIsPlaying((currentValue) => !currentValue);
  }

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    const timer = window.setInterval(() => showNextStep(true), 2800);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    if (activeStepIndex === attackSteps.length - 1) {
      setIsPlaying(false);
      setShowCompletionModal(true);
    }
  }, [activeStepIndex, isPlaying]);

  return (
    <main id="top" className="app-shell">
      <HeroReplay
        summary={summary}
        activeStep={activeStep}
        activeStepIndex={activeStepIndex}
        stepCount={attackSteps.length}
        isPlaying={isPlaying}
        onPrevious={showPreviousStep}
        onNext={showNextStep}
        onTogglePlayback={togglePlayback}
        showCompletionPopup={showCompletionModal}
        completionHeadline={completionHeadline}
        completionNarrative={completionNarrative}
        onDismissCompletion={() => setShowCompletionModal(false)}
        onReplayFromCompletion={replayAttack}
      />
      <section className="mission-brief" aria-labelledby="mission-title">
        <p className="eyebrow">Mission Brief</p>
        <h2 id="mission-title">From lab telemetry to detection engineering decisions.</h2>
        <p>
          The public showcase is a sanitized snapshot of an ongoing experiment: compare translated
          Sigma detections against Elastic prebuilt rules during a controlled Windows-focused attack
          chain.
        </p>
      </section>
      <LabArchitecture />
      <AttackTimeline
        steps={attackSteps}
        activeStepId={activeStep.id}
        activeStepIndex={activeStepIndex}
        onSelectStep={selectStep}
      />
      <DetectionRace summary={summary} detections={detections} />
      <Findings findings={findings} />
    </main>
  );
}
