import {
  Activity,
  AlertTriangle,
  Network,
  Pause,
  Play,
  Radar,
  ShieldCheck,
  SkipBack,
  SkipForward,
} from "lucide-react";
import type { AttackStep, Summary } from "../types";

type HeroReplayProps = {
  summary: Summary;
  activeStep: AttackStep;
  activeStepIndex: number;
  stepCount: number;
  isPlaying: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePlayback: () => void;
};

export function HeroReplay({
  summary,
  activeStep,
  activeStepIndex,
  stepCount,
  isPlaying,
  onPrevious,
  onNext,
  onTogglePlayback,
}: HeroReplayProps) {
  const totalHits = summary.sigmaHitCount + summary.elasticHitCount;
  const sigmaWidth =
    totalHits > 0 ? Math.round((summary.sigmaHitCount / totalHits) * 100) : 0;
  const elasticWidth =
    totalHits > 0 ? Math.round((summary.elasticHitCount / totalHits) * 100) : 0;

  return (
    <section className="hero-replay" aria-labelledby="hero-title">
      <div className="topbar">
        <a className="brand-mark" href="#top" aria-label="DKSec attack replay home">
          <span className="pulse-dot" />
          <span>DKSec Attack Replay</span>
        </a>
        <nav className="nav-links" aria-label="Showcase sections">
          <a href="#lab">Lab</a>
          <a href="#timeline">Replay</a>
          <a href="#race">Detection Race</a>
          <a href="#findings">Findings</a>
        </nav>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Sigma vs Elastic detection experiment</p>
          <h1 id="hero-title">
            <span>Replay the</span>
            <span>attack.</span>
            <span>Watch the</span>
            <span>rules</span>
            <span>compete.</span>
          </h1>
          <p className="hero-lede">
            A controlled Windows attack chain runs through a local SOCLAB. Each
            phase is mapped to telemetry, detections, overlaps, misses, and
            engineering decisions.
          </p>

          <div className="replay-console" aria-label="Attack replay controls">
            <div className="active-step-strip" aria-live="polite">
              <span>
                Step {activeStepIndex + 1} / {stepCount}
              </span>
              <strong>{activeStep.phase}</strong>
              <small>{activeStep.safeActionLabel}</small>
            </div>
            <div className="replay-buttons">
              <button type="button" className="replay-button" aria-label="Previous attack step" onClick={onPrevious}>
                <SkipBack size={16} aria-hidden="true" focusable="false" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                className="replay-button replay-button-primary"
                aria-label={isPlaying ? "Pause attack replay" : "Play attack replay"}
                aria-pressed={isPlaying}
                onClick={onTogglePlayback}
              >
                {isPlaying ? (
                  <Pause size={16} aria-hidden="true" focusable="false" />
                ) : (
                  <Play size={16} aria-hidden="true" focusable="false" />
                )}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>
              <button type="button" className="replay-button" aria-label="Next attack step" onClick={onNext}>
                <SkipForward size={16} aria-hidden="true" focusable="false" />
                <span>Next</span>
              </button>
            </div>
          </div>

          <div className="status-row" aria-label="Current replay status">
            <div className="status-tile">
              <span>Replay</span>
              <strong>00:{String(activeStep.order * 7 + 24).padStart(2, "0")}</strong>
            </div>
            <div className="status-tile">
              <span>Technique</span>
              <strong>{activeStep.techniqueId}</strong>
            </div>
            <div className="status-tile status-live">
              <span>Status</span>
              <strong>{summary.isSampleData ? "Sample" : "Observed"}</strong>
            </div>
          </div>

          <div className="comparison-bars">
            <div className="bar-line">
              <span>Sigma</span>
              <div className="bar-track">
                <span className="bar-fill sigma" style={{ width: `${sigmaWidth}%` }} />
              </div>
              <strong>{summary.sigmaHitCount}</strong>
            </div>
            <div className="bar-line">
              <span>Elastic</span>
              <div className="bar-track">
                <span className="bar-fill elastic" style={{ width: `${elasticWidth}%` }} />
              </div>
              <strong>{summary.elasticHitCount}</strong>
            </div>
            <div className="bar-line">
              <span>Gaps</span>
              <div className="bar-track">
                <span className="bar-fill gap" style={{ width: `${Math.min(summary.gapCount * 6, 100)}%` }} />
              </div>
              <strong>{summary.gapCount}</strong>
            </div>
          </div>
        </div>

        <div className="lab-map-card" aria-label="Lab kill chain map">
          <div className="panel-heading">
            <span>Lab Kill Chain Map</span>
            <small>{summary.snapshotLabel}</small>
          </div>
          <div className="lab-map">
            <div className="node attacker">
              <Radar size={18} />
              <span>Attacker</span>
              <strong>Linux</strong>
            </div>
            <div className="node firewall">
              <Network size={18} />
              <span>Control</span>
              <strong>OPNsense</strong>
            </div>
            <div className="node victim">
              <AlertTriangle size={18} />
              <span>Victim</span>
              <strong>Windows</strong>
            </div>
            <div className="node siem">
              <ShieldCheck size={18} />
              <span>Detection</span>
              <strong>Elastic SIEM</strong>
            </div>
            <svg className="map-lines" viewBox="0 0 640 360" aria-hidden="true">
              <path d="M140 140 C220 100, 260 82, 340 86" />
              <path d="M360 98 C440 108, 488 136, 540 168" />
              <path d="M530 208 C486 284, 394 298, 324 270" />
              <path d="M320 122 C320 178, 318 220, 318 266" />
            </svg>
          </div>
          <div className="mini-metrics">
            <span><Activity size={14} /> {summary.attackStepCount} steps</span>
            <span>{summary.mitreTechniqueCount} techniques</span>
            <span>{summary.overlapCount} overlaps</span>
          </div>
        </div>
      </div>
    </section>
  );
}
