import { useEffect, useState } from "react";
import { attackSteps, detections, findings, summary } from "./data/experiment";
import { AttackTimeline } from "./components/AttackTimeline";
import { DetectionRace } from "./components/DetectionRace";
import { Findings } from "./components/Findings";
import { HeroReplay } from "./components/HeroReplay";
import { LabArchitecture } from "./components/LabArchitecture";

const initialStepIndex = Math.min(2, attackSteps.length - 1);

export default function App() {
  const [activeStepIndex, setActiveStepIndex] = useState(initialStepIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const activeStep = attackSteps[activeStepIndex] ?? attackSteps[0];

  function showPreviousStep() {
    setActiveStepIndex((currentIndex) =>
      currentIndex === 0 ? attackSteps.length - 1 : currentIndex - 1,
    );
  }

  function showNextStep() {
    setActiveStepIndex((currentIndex) => (currentIndex + 1) % attackSteps.length);
  }

  function selectStep(stepId: string) {
    const nextStepIndex = attackSteps.findIndex((step) => step.id === stepId);

    if (nextStepIndex >= 0) {
      setActiveStepIndex(nextStepIndex);
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    const timer = window.setInterval(showNextStep, 2800);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

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
        onTogglePlayback={() => setIsPlaying((currentValue) => !currentValue)}
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
        onSelectStep={selectStep}
      />
      <DetectionRace summary={summary} detections={detections} />
      <Findings findings={findings} />
    </main>
  );
}
