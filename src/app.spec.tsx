import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "./app";
import { AccountService } from "./Account/AccountService";

jest.mock("./Account/AccountService");

describe("App Navigation", () => {
  beforeEach(() => {
    window.history.pushState({}, "Home", "/");
    (AccountService.getProfile as jest.Mock).mockResolvedValue({
      FirstName: "Test",
      LastName: "User",
      TechSet: ["React"],
    });
  });

  test("initial state shows register form and welcome section", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Welcome Test/i)).toBeInTheDocument();
    });
    expect(
      screen.getByPlaceholderText(/Credit card number/i),
    ).toBeInTheDocument();
  });

  test("clicking burger opens menu", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByLabelText(/Open menu/i)).toBeInTheDocument();
    });
    const burgerButton = screen.getByLabelText(/Open menu/i);
    fireEvent.click(burgerButton);

    expect(screen.getByTestId("menu__list")).toBeInTheDocument();
    expect(screen.getByText(/ASB Culture/i)).toBeInTheDocument();
    expect(screen.getByText(/About me/i)).toBeInTheDocument();
  });

  test("clicking ASB Culture shows the culture page", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByLabelText(/Open menu/i)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByLabelText(/Open menu/i));
    fireEvent.click(screen.getByText(/ASB Culture/i));

    expect(
      screen.getByText(/Welcome to ASB Culture page/i),
    ).toBeInTheDocument();
  });

  test("clicking back button from a subpage returns to home", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByLabelText(/Open menu/i)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByLabelText(/Open menu/i));
    fireEvent.click(screen.getByText(/ASB Culture/i));

    const backButton = screen.getByTestId("header__back-button");
    fireEvent.click(backButton);

    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });
});
