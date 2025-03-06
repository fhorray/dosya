import { DosyaProps, TDosyaFile } from "@/types";
import { create } from "zustand";
import { useDosyaContext } from "./context";

export const useDosyaFiles = create<DosyaProps["files"]>((set) => ({
  list: null,

  setList: async (fn, options) => {
    useDosyaContext.getState().state.setLoading(true);

    try {
      const result = fn instanceof Function ? await fn() : fn;

      set(() => ({ list: result }));

      // call onSuccess callback
      if (options?.onSuccess) {
        options?.onSuccess?.(result as TDosyaFile[]);
      }
    } catch (error) {
      console.error(error);
      options?.onError?.(error as Error);
    } finally {
      useDosyaContext.getState().state.setLoading(false);
    }
  },

  upload: async (files, uploadFunction) => {
    // Limpa erro no contexto
    useDosyaContext.getState().error.setMessage("");
    try {
      if (!files) {
        useDosyaContext.getState().error.setMessage("File or folder not found");
        return;
      }
      await uploadFunction?.();
    } catch (error) {
      console.error(error);
    } finally {
      useDosyaContext.getState().state.setLoading(false);
    }
  },
}));
