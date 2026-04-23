import type { ReactNode } from "react";

type DecisionPanelProps = {
  title: string;
  description: string;
  totalCount: number;
  expanded: boolean;
  onToggleExpanded: () => void;
  children: ReactNode;
  itemLabel: string;
  extraActions?: ReactNode;
  defaultVisibleCount?: number;
};

export function DecisionPanel({
  title,
  description,
  totalCount,
  expanded,
  onToggleExpanded,
  children,
  itemLabel,
  extraActions,
  defaultVisibleCount = 2,
}: DecisionPanelProps) {
  const hiddenCount = Math.max(totalCount - defaultVisibleCount, 0);
  const showToggle = hiddenCount > 0;

  return (
    <section className="decision-panel" aria-label={title}>
      <div className="decision-panel-header">
        <div className="decision-panel-heading">
          <h3>{title}</h3>
          <span className="decision-panel-count">{totalCount}</span>
        </div>
        <div className="decision-panel-actions">
          {extraActions}
          {showToggle && (
            <button
              type="button"
              className="replay-button"
              aria-expanded={expanded}
              onClick={onToggleExpanded}
            >
              {expanded ? `Show fewer ${itemLabel}` : `Show more ${itemLabel} (+${hiddenCount})`}
            </button>
          )}
        </div>
      </div>
      <p className="decision-panel-description">{description}</p>
      <div className="decision-panel-body">{children}</div>
    </section>
  );
}
