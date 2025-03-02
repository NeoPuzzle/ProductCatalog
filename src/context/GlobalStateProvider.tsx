"use client";

import { createContext, useState, useContext, useEffect } from "react";

export interface GlobalState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const GlobalStateContext = createContext<GlobalState | undefined>(
  undefined
);

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

export function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

useEffect(() => {
  if (typeof window !== "undefined") {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }
}, []);

useEffect(() => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}, [cart]);

const addToCart = (item: CartItem) => {
  setCart((prevCart) => {
    const cartArray = Array.isArray(prevCart) ? prevCart : [];
    const existingItem = cartArray.find((i) => i.id === item.id);
    if (existingItem) {
      return cartArray.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    }
    return [...cartArray, { ...item, quantity: 1 }];
  });
};

const removeFromCart = (id: string) => {
  setCart((prevCart) => {
    const cartArray = Array.isArray(prevCart) ? prevCart : [];
    return cartArray.filter((item) => item.id !== id);
  });
};

const updateQuantity = (id: string, quantity: number) => {
  setCart((prevCart) => {
    const cartArray = Array.isArray(prevCart) ? prevCart : [];
    return cartArray.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
  });
};

const clearCart = () => {
  setCart([]);
};

  const globalState: GlobalState = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <GlobalStateContext.Provider value={globalState}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}