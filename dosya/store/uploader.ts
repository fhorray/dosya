import { DosyaProps } from "@/types";
import { Store } from "@tanstack/store";

type DosyaUploaderState = DosyaProps["uploader"];

const initialUploaderState: DosyaUploaderState = {
  isOpen: false,
  toggle: () => {},
};

export const dosyaUploaderStore = new Store(initialUploaderState);

export const uploaderActions = {
  toggle: () => {
    dosyaUploaderStore.setState((prev) => ({
      isOpen: !prev.isOpen,
      toggle: prev.toggle,
    }));
  },
};
