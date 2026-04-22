import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the public experiment headline", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /replay the attack\. watch the rules compete\./i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/sanitized static data/i)).toBeInTheDocument();
  });
});
