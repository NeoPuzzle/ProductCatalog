"use client";

import { useState } from 'react';
import { GlobalState, GlobalStateContext } from './GlobalStateContext';


export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const globalState: GlobalState = {
    cart,
    addToCart,
  };

  return (
    <GlobalStateContext.Provider value={globalState}>
      {children}
    </GlobalStateContext.Provider>
  );
}