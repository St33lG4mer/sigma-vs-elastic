import { summary } from "./data/experiment";

export default function App() {
  return (
    <main className="app-shell">
      <section className="splash-screen">
        <p className="eyebrow">DKSec Attack Replay</p>
        <h1>Replay the attack. Watch the rules compete.</h1>
        <p>
          {summary.snapshotLabel} for the {summary.slug} experiment. The public
          build uses sanitized static data while the lab automation matures.
        </p>
      </section>
    </main>
  );
}
