import { create } from "zustand";
import { Page } from "@/types/page";

type NavStore = {
  selectedPage: Page;
  switchPage: (select: Page) => void;
};

export const useNavStore = create<NavStore>((set) => ({
  selectedPage: "home",
  switchPage: (select: Page) => set(() => ({ selectedPage: select })),
}));
