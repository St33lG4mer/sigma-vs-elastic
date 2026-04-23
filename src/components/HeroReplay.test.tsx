import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { attackSteps, summary } from "../data/experiment";
import { HeroReplay } from "./HeroReplay";

describe("HeroReplay", () => {
  it("renders zero hit bar widths without NaN values", () => {
    const zeroHitSummary = {
      ...summary,
      sigmaHitCount: 0,
      elasticHitCount: 0,
    };

    const { container } = render(
      <HeroReplay
        summary={zeroHitSummary}
        activeStep={attackSteps[2]}
        activeStepIndex={2}
        stepCount={attackSteps.length}
        isPlaying={false}
        onPrevious={() => undefined}
        onNext={() => undefined}
        onTogglePlayback={() => undefined}
      />,
    );

    const sigmaFill = container.querySelector<HTMLElement>(".bar-fill.sigma");
    const elasticFill = container.querySelector<HTMLElement>(".bar-fill.elastic");

    expect(sigmaFill).toHaveStyle({ width: "0%" });
    expect(elasticFill).toHaveStyle({ width: "0%" });
    expect(sigmaFill?.getAttribute("style")).not.toContain("NaN%");
    expect(elasticFill?.getAttribute("style")).not.toContain("NaN%");
  });
});
