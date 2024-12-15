import { create } from "zustand";

type Store = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export const useSidebarStore = create<Store>()((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));
