import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import { attackSteps } from "./data/experiment";

describe("App", () => {
  it("renders the full public showcase structure", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /replay the attack/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /local soclab/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /mapped to telemetry/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /compares alert volume/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /fewer overlaps/i })).toBeInTheDocument();
    expect(screen.getByRole("table", { name: /detection sample/i })).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader", { name: /source/i }).length).toBeGreaterThan(0);
  });

  it("lets visitors replay the attack chain from the hero controls", () => {
    render(<App />);
    const totalSteps = attackSteps.length;
    const initialStepNumber = Math.min(3, totalSteps);
    const nextStepNumber = initialStepNumber === totalSteps ? 1 : initialStepNumber + 1;
    const previousFromLast = totalSteps === 1 ? 1 : totalSteps - 1;

    expect(screen.getByText(new RegExp(`step ${initialStepNumber} / ${totalSteps}`, "i"))).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /play attack replay/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /next attack step/i }));
    expect(screen.getByText(new RegExp(`step ${nextStepNumber} / ${totalSteps}`, "i"))).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /play attack replay/i }));
    expect(screen.getByRole("button", { name: /pause attack replay/i })).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: new RegExp(`select attack step ${totalSteps}`, "i") }),
    );
    expect(screen.getByText(new RegExp(`step ${totalSteps} / ${totalSteps}`, "i"))).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /previous attack step/i }));
    expect(screen.getByText(new RegExp(`step ${previousFromLast} / ${totalSteps}`, "i"))).toBeInTheDocument();
  });

  it("shows a completion popup when autoplay reaches the final step", () => {
    vi.useFakeTimers();
    render(<App />);

    const initialStep = Math.min(2, attackSteps.length - 1);
    const ticksToFinalStep = Math.max(attackSteps.length - 1 - initialStep, 0);

    fireEvent.click(screen.getByRole("button", { name: /play attack replay/i }));

    if (ticksToFinalStep > 0) {
      act(() => {
        vi.advanceTimersByTime(ticksToFinalStep * 2800 + 40);
      });
    } else {
      act(() => {
        vi.advanceTimersByTime(40);
      });
    }

    const completionDialog = screen.getByRole("dialog", {
      name: /(system-level access achieved|credential access objectives achieved)/i,
    });

    expect(completionDialog).toBeInTheDocument();
    expect(within(completionDialog).getByText(/techniques/i)).toBeInTheDocument();
    expect(screen.getByText(/data source: repository snapshot/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /replay attack/i })).toBeInTheDocument();

    vi.useRealTimers();
  });
});
