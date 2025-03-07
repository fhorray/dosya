import { DosyaProps, DosyaFolder } from "@/types";
import { create } from "zustand";
import { useDosyaContext } from "./context";
import { findFolder } from "@/utils/find-folder";
import { toast } from "sonner";

export const useDosyaFolders = create<DosyaProps["folders"]>((set, get) => ({
  list: null,
  current: null,

  create: async (fn, options) => {
    useDosyaContext.getState().state.setLoading(true);
    try {
      const result = await fn();

      const found = findFolder(
        result?.children as DosyaFolder<Record<any, any>>[],
        get().current?.id as string
      );

      // set new result
      if (result) {
        set((state) => ({
          ...state,
          list: result as DosyaFolder<Record<any, any>> | null,
          current: found,
        }));

        toast.success("Folder created successfully!");
      }

      options?.onSuccess?.(result as DosyaFolder);
    } catch (error) {
      options?.onError?.(error as Error);
    } finally {
      useDosyaContext.getState().state.setLoading(false);
    }
  },

  delete: async (fn, options) => {
    useDosyaContext.getState().state.setLoading(true);

    try {
      const result = await fn();

      // set new result
      if (result) {
        set((state) => ({
          ...state,
          list: result as DosyaFolder<Record<any, any>> | null,
          current: undefined,
        }));

        toast.success("Folder deleted successfully!");
      }

      options?.onSuccess?.(result as DosyaFolder);
    } catch (error) {
      options?.onError?.(error as Error);
    } finally {
      useDosyaContext.getState().state.setLoading(false);
    }
  },

  setList: async (fn, options) => {
    useDosyaContext.getState().state.setLoading(true);
    try {
      const result = await fn();

      // set new result
      if (result) {
        set((state) => ({
          ...state,
          list: result as DosyaFolder<Record<any, any>> | null,
        }));
      }

      options?.onSuccess?.(result as DosyaFolder);
    } catch (error) {
      options?.onError?.(error as Error);
    } finally {
      useDosyaContext.getState().state.setLoading(false);
    }
  },

  setCurrent: (folder) => {
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
    toggle: () =>
      set((state) => ({
        ...state,
        modal: { ...state.modal, isOpen: !state.modal.isOpen },
      })),
  },
}));
