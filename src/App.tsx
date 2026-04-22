import { attackSteps, detections, findings, summary } from "./data/experiment";
import { AttackTimeline } from "./components/AttackTimeline";
import { DetectionRace } from "./components/DetectionRace";
import { Findings } from "./components/Findings";
import { HeroReplay } from "./components/HeroReplay";
import { LabArchitecture } from "./components/LabArchitecture";

export default function App() {
  return (
    <main id="top" className="app-shell">
      <HeroReplay summary={summary} activeStep={attackSteps[2]} />
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
      <AttackTimeline steps={attackSteps} />
      <DetectionRace summary={summary} detections={detections} />
      <Findings findings={findings} />
    </main>
  );
}
