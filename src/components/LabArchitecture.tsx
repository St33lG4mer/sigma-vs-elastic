import { Server, Shield, Terminal, Workflow } from "lucide-react";
import { SectionShell } from "./SectionShell";

const nodes = [
  {
    icon: Terminal,
    title: "Linux attacker",
    body: "Broad Bash and operator activity tracking for attacker-side context.",
  },
  {
    icon: Shield,
    title: "OPNsense + Squid",
    body: "Firewall and proxy telemetry enrich network paths and egress behavior.",
  },
  {
    icon: Server,
    title: "Windows victim",
    body: "Near-complete PowerShell, Sysmon, process, and Windows event telemetry.",
  },
  {
    icon: Workflow,
    title: "Elastic SIEM",
    body: "Translated Sigma rules and Elastic prebuilt detections are compared.",
  },
];

export function LabArchitecture() {
  return (
    <SectionShell
      id="lab"
      eyebrow="Lab Architecture"
      title="A local SOCLAB built for repeatable detection experiments."
    >
      <div className="architecture-grid">
        {nodes.map(({ icon: Icon, title, body }) => (
          <article className="info-card" key={title}>
            <Icon size={22} />
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
