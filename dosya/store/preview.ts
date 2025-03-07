import { DosyaProps, DosyaFile } from "@/types";
import { create } from "zustand";

export const useDosyaPreview = create<DosyaProps["preview"]>((set) => ({
  isOpen: false,
  toggle: (file?: DosyaFile | null) =>
    set((state) => ({ isOpen: !state.isOpen, file: file || null })),
  file: null,
  setFile: (file: DosyaFile) => set(() => ({ file })),
  clear: () => set(() => ({ file: null })),
}));
