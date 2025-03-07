import { DosyaProps } from "@/types";
import { create } from "zustand";

export const useDosyaContext = create<DosyaProps["context"]>((set) => ({
  error: {
    message: "",
    setMessage: (message) =>
      set((state) => ({
        error: { ...state.error, message },
      })),
    clear: () =>
      set((state) => ({
        error: { ...state.error, message: "" },
      })),
  },
  state: {
    loading: false,
    setLoading: (loading) =>
      set((state) => ({
        state: { ...state.state, loading },
      })),
  },
  config: {
    defaultFolder: "/",
    baseUrl: "/",
    viewMode: {
      default: "grid",
      set: (value: "grid" | "list") =>
        set((state) => ({
          config: {
            ...state.config,
            viewMode: { ...state.config.viewMode, default: value },
          },
        })),
    },
  },
  setConfig: (config) =>
    set((state) => ({
      config: {
        ...state.config,
        ...config,
        viewMode: {
          ...state.config.viewMode,
          ...config,
        },
      },
    })),
}));
