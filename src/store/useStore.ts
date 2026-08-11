import { create } from "zustand";

interface StoreState {
  activeSection: string;
  isNavVisible: boolean;
  setActiveSection: (section: string) => void;
  setIsNavVisible: (visible: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  activeSection: "home",
  isNavVisible: true,
  setActiveSection: (section) => set({ activeSection: section }),
  setIsNavVisible: (visible) => set({ isNavVisible: visible }),
}));
