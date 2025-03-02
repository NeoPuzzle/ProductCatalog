"use client";

import { createContext, useState, useContext, useEffect } from "react";

export interface GlobalState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

const saveCartToLocalStorage = (cart: CartItem[]) => {
  const data = {
    cart,
    timestamp: Date.now(),
  };
  localStorage.setItem("cart", JSON.stringify(data));
};

const loadCartFromLocalStorage = (): CartItem[] => {
  const data = JSON.parse(localStorage.getItem("cart") || "{}");
  const oneDay = 24 * 60 * 60 * 1000; // 1 día en milisegundos
  if (data.timestamp && Date.now() - data.timestamp < oneDay) {
    return data.cart;
  }
  return [];
};

export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
  const initialCart = typeof window !== "undefined" ? loadCartFromLocalStorage() : [];
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  useEffect(() => {
    if (typeof window !== "undefined") {
      saveCartToLocalStorage(cart);
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
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