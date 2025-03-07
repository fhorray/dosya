import { DosyaProps, DosyaFile } from "@/types";
import { Store } from "@tanstack/store";

type DosyaPreviewState = {
  isOpen: boolean;
  file: DosyaFile | null;
};

const initialPreviewState: DosyaPreviewState = {
  isOpen: false,
  file: null,
};

// Cria o store do preview com o estado inicial
export const dosyaPreviewStore = new Store(initialPreviewState);

// Ações para manipular o estado de preview
export const previewActions = {
  toggle: (file?: DosyaFile | null) => {
    dosyaPreviewStore.setState((prev) => ({
      isOpen: !prev.isOpen,
      file: file ?? null,
    }));
  },
  setFile: (file: DosyaFile) => {
    dosyaPreviewStore.setState((prev) => ({
      ...prev,
      file,
    }));
  },
  clear: () => {
    dosyaPreviewStore.setState((prev) => ({
      ...prev,
      file: null,
    }));
  },
};
