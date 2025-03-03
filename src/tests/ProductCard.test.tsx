import React from "react";
import {  screen } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";
import { renderWithProviders } from "./test-utils";

const mockProduct = {
  id: "1",
  name: "Producto de prueba",
  brand: "Marca de prueba",
  price: 100,
  discountPrice: 80,
  images: ["https://example.com/image.jpg"],
  rating: 4.5,
  stock: 5,
  description: "Descripción de prueba",
  category: "Categoría de prueba",
  features: ["Característica 1", "Característica 2"],
  specifications: { peso: "1kg", dimensiones: "10x10x10cm" },
};

describe("ProductCard Component", () => {
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    jest.mock("@/context/GlobalContext", () => ({
      useGlobalState: jest.fn(() => ({
        addToCart: mockAddToCart,
      })),
    }));
  });

  it("renders the product card correctly", () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    expect(screen.getByText("S/80")).toBeInTheDocument();
    expect(screen.getByText("S/100")).toBeInTheDocument();

    const addToCartButton = screen.getByRole("button");
    expect(addToCartButton).toBeEnabled();
  });

  it("displays 'Out of stock' when stock is 0", () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };

    renderWithProviders(<ProductCard product={outOfStockProduct} />);

    expect(screen.getByText("Agotado")).toBeInTheDocument();

    const addToCartButton = screen.getByRole("button");
    expect(addToCartButton).toBeDisabled();
  });
});
