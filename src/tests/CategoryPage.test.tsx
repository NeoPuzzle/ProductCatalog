// __tests__/CategoryPage.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import CategoryPage from "@/app/categories/[slug]/page";
import { notFound } from "next/navigation";
import { fetchProductsByCategory } from "@/services/apiService";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("@/services/apiService", () => ({
  fetchProductsByCategory: jest.fn(),
}));

describe("CategoryPage Component", () => {
  const mockProducts = [
    {
      id: "1",
      name: "Producto 1",
      price: 100,
      images: ["https://example.com/product1.jpg"],
      stock: 5,
      rating: 4.5,
    },
    {
      id: "2",
      name: "Producto 2",
      price: 200,
      images: ["https://example.com/product2.jpg"],
      stock: 3,
      rating: 4.0,
    },
  ];

  it("renders the category page with products", async () => {
    // Mockea la función fetchProductsByCategory para devolver productos
    jest.mocked(fetchProductsByCategory).mockResolvedValue(mockProducts);

    render(<CategoryPage params={{ slug: "electronica" }} />);

    // Espera a que los productos se rendericen
    await screen.findByText("Producto 1");
    await screen.findByText("Producto 2");

    // Verifica que los productos se muestren correctamente
    expect(screen.getByText("Categoría: electronica")).toBeInTheDocument();
    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("Producto 2")).toBeInTheDocument();
  });

  it("calls notFound when there are no products", async () => {
    // Mockea la función fetchProductsByCategory para devolver un array vacío
    jest.mocked(fetchProductsByCategory).mockResolvedValue([]);

    render(<CategoryPage params={{ slug: "electronica" }} />);

    // Verifica que se haya llamado a notFound
    expect(notFound).toHaveBeenCalled();
  });

  it("calls notFound when an error occurs", async () => {
    // Mockea la función fetchProductsByCategory para lanzar un error
    jest.mocked(fetchProductsByCategory).mockRejectedValue(new Error("Error fetching products"));

    render(<CategoryPage params={{ slug: "electronica" }} />);

    // Verifica que se haya llamado a notFound
    expect(notFound).toHaveBeenCalled();
  });
});