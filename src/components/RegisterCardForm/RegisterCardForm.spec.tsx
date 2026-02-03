import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RegisterCardForm } from "./RegisterCardForm";
import { AccountService } from "../../Account/AccountService";

jest.mock("../../Account/AccountService");

describe("RegisterCardForm", () => {
  test("shows validation errors when submitting empty fields", async () => {
    render(<RegisterCardForm />);
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Card number is required/i)).toBeInTheDocument();
    });
  });

  test("prevents non-numeric input for card number", () => {
    render(<RegisterCardForm />);
    const cardInput = screen.getByPlaceholderText(
      /Credit card number/i,
    ) as HTMLInputElement;

    fireEvent.change(cardInput, { target: { value: "abc" } });
    expect(cardInput.value).toBe("");

    fireEvent.change(cardInput, { target: { value: "123" } });
    expect(cardInput.value).toBe("123");
  });

  test("successful submission shows success message", async () => {
    (AccountService.registerCard as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    render(<RegisterCardForm />);

    fireEvent.change(screen.getByPlaceholderText(/Credit card number/i), {
      target: { value: "1234567812345678" },
    });
    fireEvent.change(screen.getByPlaceholderText(/CVC/i), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Expiry/i), {
      target: { value: "12/25" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Card registered successfully!/i),
      ).toBeInTheDocument();
    });
  });
});
