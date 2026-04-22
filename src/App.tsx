import { attackSteps, summary } from "./data/experiment";
import { HeroReplay } from "./components/HeroReplay";

export default function App() {
  return (
    <main id="top" className="app-shell">
      <HeroReplay summary={summary} activeStep={attackSteps[2]} />
      <section className="next-hint" aria-label="Next section preview">
        <p className="eyebrow">Mission Brief</p>
        <h2>From lab telemetry to detection engineering decisions.</h2>
      </section>
    </main>
  );
}
