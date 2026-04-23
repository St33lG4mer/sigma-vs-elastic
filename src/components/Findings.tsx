import type { Finding } from "../types";
import { SectionShell } from "./SectionShell";

type FindingsProps = {
  findings: Finding[];
};

export function Findings({ findings }: FindingsProps) {
  return (
    <SectionShell
      id="findings"
      eyebrow="Draft Findings"
      title="The end goal is fewer overlaps, better signal, and custom rules where both sets miss."
    >
      <div className="findings-grid">
        {findings.map((finding) => (
          <article className="finding-card" key={finding.id}>
            <span>{finding.category}</span>
            <h3>{finding.title}</h3>
            <p>{finding.description}</p>
            <strong>{finding.recommendation}</strong>
          </article>
        ))}
      </div>
      <a
        className="writeup-link"
        href="https://kaspergissel.dk"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Read the technical write-up on kaspergissel.dk (opens in new tab)"
      >
        Read the technical write-up on kaspergissel.dk (opens in new tab)
      </a>
    </SectionShell>
  );
}
