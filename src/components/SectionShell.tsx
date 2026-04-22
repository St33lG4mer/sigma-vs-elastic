import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function SectionShell({ id, eyebrow, title, children }: SectionShellProps) {
  return (
    <section id={id} className="content-section" aria-labelledby={`${id}-title`}>
      <div className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${id}-title`}>{title}</h2>
      </div>
      {children}
    </section>
  );
}
