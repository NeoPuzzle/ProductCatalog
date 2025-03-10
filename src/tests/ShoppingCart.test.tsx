import {  screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import ShoppingCart from "@/app/cart/page";

const mockCart = [
  {
    id: "1",
    name: "Producto 1",
    price: 100,
    quantity: 2,
    stock: 5,
    images: ["https://example.com/product1.jpg"],
  },
  {
    id: "2",
    name: "Producto 2",
    price: 200,
    quantity: 1,
    stock: 3,
    images: ["https://example.com/product2.jpg"],
  },
];

describe("ShoppingCart Component", () => {
  beforeEach(() => {
    jest.mock("@/context/GlobalContext", () => ({
      useGlobalState: jest.fn(() => ({
        cart: mockCart,
        updateQuantity: jest.fn(),
        removeFromCart: jest.fn(),
        clearCart: jest.fn(),
      })),
    }));
  });

  it("renders an empty cart message when the cart is empty", () => {
    jest.mock("@/context/GlobalContext", () => ({
      useGlobalState: jest.fn(() => ({
        cart: [],
        updateQuantity: jest.fn(),
        removeFromCart: jest.fn(),
        clearCart: jest.fn(),
      })),
    }));

    renderWithProviders(<ShoppingCart />);

    // expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
    // expect(screen.getByText("Explorar Productos")).toBeInTheDocument();
  });
});