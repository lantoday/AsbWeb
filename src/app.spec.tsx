import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "./app";

describe("Dummy test", () => {
  it("should display welcome text", () => {
    render(<App />);
    const heading = screen.queryByRole("heading", {
      level: 1,
    });

    expect(heading).toBeInTheDocument();
    expect(heading).toContainHTML("Welcome to your technical test!");
  });
});
