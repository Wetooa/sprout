import { create } from "zustand";

type Page = "home" | "about" | "contact" | "services";

type NavStore = {
  page: Page;
  switch: (select: Page) => void;
};

export const useNavStore = create<NavStore>((set) => ({
  page: "home",
  switch: (select: Page) => set(() => ({ page: select })),
}));
