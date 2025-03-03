import { GlobalState } from "@/types/product";
import { createContext, useContext } from "react";



export const GlobalStateContext = createContext<GlobalState | undefined>(
  undefined
);

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}
