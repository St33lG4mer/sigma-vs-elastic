import { fireEvent, render, screen } from "@testing-library/react";
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
    expect(screen.getByRole("table", { name: /detection sample/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /source/i })).toBeInTheDocument();
  });

  it("lets visitors replay the attack chain from the hero controls", () => {
    render(<App />);

    expect(screen.getByText(/step 3 \/ 5/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /play attack replay/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /next attack step/i }));
    expect(screen.getByText(/step 4 \/ 5/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /play attack replay/i }));
    expect(screen.getByRole("button", { name: /pause attack replay/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /select attack step 5/i }));
    expect(screen.getByText(/step 5 \/ 5/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /previous attack step/i }));
    expect(screen.getByText(/step 4 \/ 5/i)).toBeInTheDocument();
  });
});
