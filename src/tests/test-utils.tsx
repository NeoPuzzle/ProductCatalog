import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { GlobalStateProvider } from "@/context/GlobalStateProvider";

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithProviders(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();

  return {
    ...render(
      <QueryClientProvider client={testQueryClient}>
        <GlobalStateProvider>
          {ui}
        </GlobalStateProvider>
      </QueryClientProvider>
    ),
    testQueryClient,
  };
}