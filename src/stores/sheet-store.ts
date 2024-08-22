import { createStore } from "zustand/vanilla";

export type SheetState = {
  open: boolean;
};

export type SheetAction = {
  setOpen: (open: boolean) => void;
};

export type SheetStore = SheetState & SheetAction;

export const defaultInitState: SheetState = {
  open: true,
};

export const createSheetStore = (initState: SheetState = defaultInitState) => {
  return createStore<SheetStore>((set) => ({
    ...initState,
    setOpen: (open: boolean) => set(() => ({ open })),
  }));
};
