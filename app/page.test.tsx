import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import Home from "./page";

afterEach(cleanup);

describe("Home", () => {
  it("shows the primary study navigation and content", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Goedemorgen, Arthur." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Hoofdthema's" })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Zoek in thema's, citaten en bronnen..."),
    ).toBeInTheDocument();
    expect(screen.getByText("Geloof en toegerekende gerechtigheid")).toBeInTheDocument();
  });

  it("exposes the main actions with accessible names", () => {
    render(<Home />);

    expect(screen.getAllByRole("button", { name: "Nieuwe notitie" })).toHaveLength(2);
    expect(
      screen.getByRole("navigation", { name: "Hoofdnavigatie" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Mobiele navigatie" }),
    ).toBeInTheDocument();
  });
});
