import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the full public showcase structure", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /replay the attack/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /local soclab/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /mapped to telemetry/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /compares signal/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /fewer overlaps/i })).toBeInTheDocument();
  });
});
