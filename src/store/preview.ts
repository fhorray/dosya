import { DosyaProps, TDosyaFile } from "@/types";
import { create } from "zustand";

export const useDosyaPreview = create<DosyaProps["preview"]>((set) => ({
  isOpen: false,
  toggle: (file?: TDosyaFile | null) =>
    set((state) => ({ isOpen: !state.isOpen, file: file || null })),
  file: null,
  setFile: (file: TDosyaFile) => set(() => ({ file })),
  clear: () => set(() => ({ file: null })),
}));
