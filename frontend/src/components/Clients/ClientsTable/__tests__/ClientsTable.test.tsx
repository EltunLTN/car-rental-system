import { render, screen } from "@testing-library/react";
import ClientsTable from "../ClientsTable";
import * as clientsHook from "@/hooks/queryHooks/clients/useGetClients";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ClientTemplate } from "@/constants/clientTemplates";

describe("ClientsTable", () => {
  it("renders skeleton loader on isLoading true", () => {
    const mockReturn: Partial<UseQueryResult<ClientTemplate[]>> = {
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    };

    vi.spyOn(clientsHook, "useGetClients").mockReturnValue(mockReturn as any);
    render(<ClientsTable />);

    const skeleton = screen.getByTestId("clients-table-skeleton");
    expect(skeleton).toBeInTheDocument();
  });
  it("renders empty response on data falsy", () => {
    const mockReturn: Partial<UseQueryResult<ClientTemplate[]>> = {
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
    };

    vi.spyOn(clientsHook, "useGetClients").mockReturnValue(mockReturn as any);
    render(<ClientsTable />);

    const empty = screen.getByTestId("empty-reponse");
    expect(empty).toBeInTheDocument();
  });
  it("renders error response on isError", () => {
    const mockReturn: Partial<UseQueryResult<ClientTemplate[]>> = {
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Unknown error"),
    };

    vi.spyOn(clientsHook, "useGetClients").mockReturnValue(mockReturn as any);
    render(<ClientsTable />);

    const error = screen.getByTestId("api-error");
    expect(error).toBeInTheDocument();
  });
});
