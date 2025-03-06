import { DosyaProps } from "@/types";
import { formatBytes } from "@/utils/format-bytes";
import { create } from "zustand";
import { useDosyaFiles } from "./files";

export const useDosyaFilters = create<DosyaProps["filters"]>((set, get) => ({
  search: {
    name: "",
    format: "",
    size: "",
    tag: "",
    color: "",
  },

  setSearch: (search) => {
    const files = useDosyaFiles.getState().list?.filter((file) => {
      // filter by name
      const nameMatch = file.name
        .toLowerCase()
        .includes(search.name?.toLowerCase() || "");

      // filter by size
      const sizeMatch =
        formatBytes(file.size).value >= parseInt(search.size || "0", 10);

      console.log(sizeMatch);

      return nameMatch && sizeMatch;
    });

    set(() => ({
      search: { ...get().search, ...search },
      filteredFiles: files,
    }));
  },

  filteredFiles: null,

  setFilteredFiles: (files) => set(() => ({ filteredFiles: files })),

  reset: () => set(() => ({ search: null })),
}));
