import React from "react";
import {  screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import { Header } from "@/components/Header";

const mockProducts = [
  { id: "1", name: "Producto 1", price: 100 },
  { id: "2", name: "Producto 2", price: 200 },
  { id: "3", name: "Producto 3", price: 300 },
];

jest.mock("@/services/apiService", () => ({
  fetchProducts: jest.fn(() => Promise.resolve(mockProducts)),
}));

jest.mock("@/components/hooks/useCategories", () => ({
  useCategories: jest.fn(() => ({
    data: [
      { id: "cat1", name: "Electrónica", slug: "electronica" },
      { id: "cat2", name: "Ropa", slug: "ropa" },
    ],
    isLoading: false,
    error: null,
  })),
}));

describe("Header Component - Search Functionality", () => {
  const mockOnProductClick = jest.fn();

  it("filters products based on search input", async () => {
    renderWithProviders(<Header onProductClick={mockOnProductClick} />);

    const searchInput = screen.getByPlaceholderText("Buscar productos...");

    fireEvent.change(searchInput, { target: { value: "Producto 1" } });

    await waitFor(() => {
      expect(screen.getByText("Producto 1")).toBeInTheDocument();
    });

    expect(screen.queryByText("Producto 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Producto 3")).not.toBeInTheDocument();
  });

  it("calls onProductClick when a search result is clicked", async () => {
    renderWithProviders(<Header onProductClick={mockOnProductClick} />);

    const searchInput = screen.getByPlaceholderText("Buscar productos...");

    fireEvent.change(searchInput, { target: { value: "Producto 2" } });

    await waitFor(() => {
      expect(screen.getByText("Producto 2")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Producto 2"));

    expect(mockOnProductClick).toHaveBeenCalledWith("2");
  });

  it("displays 'No se encontraron resultados' when there are no matches", async () => {
    renderWithProviders(<Header onProductClick={mockOnProductClick} />);

    const searchInput = screen.getByPlaceholderText("Buscar productos...");

    fireEvent.change(searchInput, { target: { value: "Producto Inexistente" } });

    await waitFor(() => {
      expect(screen.getByText("No se encontraron resultados")).toBeInTheDocument();
    });
  });
});