import { DosyaProps } from "@/types";
import { create } from "zustand";

export const useDosyaUploader = create<DosyaProps["uploader"]>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
