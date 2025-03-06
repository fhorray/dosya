import { DosyaProps, TDosyaFolder } from "@/types";
import { create } from "zustand";
import { useDosyaContext } from "./context";

export const useDosyaFolders = create<DosyaProps["folders"]>((set) => ({
  list: null,

  create: (folder, onSuccess) => {
    onSuccess?.(folder);
  },

  setList: async (fn, options) => {
    useDosyaContext.getState().state.setLoading(true);
    try {
      const result = fn instanceof Function ? await fn() : await fn;
      set(() => ({ list: result }));
      options?.onSuccess?.(result as TDosyaFolder);
    } catch (error) {
      console.error(error);
      // options?.onError?.(error);
    } finally {
      useDosyaContext.getState().state.setLoading(false);
    }
  },
  current: null,

  setCurrentFolder: (folder) => {
    set(() => ({
      current: {
        id: folder?.id || "root",
        name: folder?.name || "root",
        key: folder?.key || "root",
        children: folder?.children || [],
        parentId: folder?.parentId || "root",
        ...folder,
      },
    }));
  },

  modal: {
    isOpen: false,
    toggleOpen: () =>
      set((state) => ({
        ...state,
        modal: { ...state.modal, isOpen: !state.modal.isOpen },
      })),
  },
}));
