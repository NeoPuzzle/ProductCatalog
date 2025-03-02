  "use client";

  import { createContext, useState } from 'react';

  export interface GlobalState {
    cart: any[];
    addToCart: (item: any) => void;
  }

  export const GlobalStateContext = createContext<GlobalState | undefined>(undefined);