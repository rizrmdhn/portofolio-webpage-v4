"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type SheetStore, createSheetStore } from "@/stores/sheet-store";

export type SheetStoreApi = ReturnType<typeof createSheetStore>;

export const SheetStoreContext = createContext<SheetStoreApi | undefined>(
  undefined,
);

export interface SheetStoreProviderProps {
  children: ReactNode;
}

export const SheetStoreProvider = ({ children }: SheetStoreProviderProps) => {
  const storeRef = useRef<SheetStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createSheetStore();
  }

  return (
    <SheetStoreContext.Provider value={storeRef.current}>
      {children}
    </SheetStoreContext.Provider>
  );
};

export const useSheetStore = <T,>(selector: (store: SheetStore) => T): T => {
  const sheetStoreContext = useContext(SheetStoreContext);

  if (!sheetStoreContext) {
    throw new Error("useSheetStore must be used within a SheetStoreProvider");
  }

  return useStore(sheetStoreContext, selector);
};
