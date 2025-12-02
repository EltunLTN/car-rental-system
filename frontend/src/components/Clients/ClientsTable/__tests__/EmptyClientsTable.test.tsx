import { render, screen } from "@testing-library/react";
import EmptyClientsTable from "../EmptyClientsTable";

describe("EmptyClientsTable", () => {
  beforeEach(() => {
    render(<EmptyClientsTable />);
  });
  it("renders the icon with aria-hidden true correctly", () => {
    const icon = screen.getByTestId("no-clients-icon");

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
  it("renders children with proper texts", () => {
    expect(
      screen.getByText(/Oops...No clients in the database./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Click add a client to add one/i)
    ).toBeInTheDocument();
  });
});
