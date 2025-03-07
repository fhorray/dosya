import { formatBytes } from "@/utils/format-bytes";
import { Store } from "@tanstack/store";
import { dosyaFilesStore } from "./files";
import { DosyaProps, SearchProps, DosyaFile } from "@/types";

const initialFiltersState: DosyaProps["filters"] = {
  search: {
    name: "",
    format: "",
    size: "",
    tag: "",
    color: "",
  },
  filteredFiles: null,
  setSearch: (search: SearchProps) => {},
  reset: () => {},
  setFilteredFiles: (files: DosyaFile[]) => {},
};

// Cria o store para os filtros
export const dosyaFiltersStore = new Store(initialFiltersState);

// Ações para manipular os filtros
export const filtersActions = {
  setSearch: (search: Partial<DosyaProps["filters"]["search"]>) => {
    // Filtra os arquivos com base nos critérios de busca
    const files = dosyaFilesStore.state.list?.filter((file) => {
      const nameMatch = file.name
        .toLowerCase()
        .includes(search?.name?.toLowerCase() || "");
      const sizeMatch =
        formatBytes(file.size).value >= parseInt(search?.size || "0", 10);
      console.log(sizeMatch);
      return nameMatch && sizeMatch;
    });

    // Atualiza o store com os novos critérios de busca e os arquivos filtrados
    dosyaFiltersStore.setState((prev) => ({
      ...prev,
      search: { ...prev.search, ...search },
      filteredFiles: files || null,
    }));
  },

  setFilteredFiles: (files: DosyaProps["filters"]["filteredFiles"]) => {
    dosyaFiltersStore.setState((prev) => ({
      ...prev,
      filteredFiles: files,
    }));
  },

  reset: () => {
    // Reseta os filtros para o estado inicial
    dosyaFiltersStore.setState((prev) => ({
      ...prev,
      search: {
        name: "",
        format: "",
        size: "",
        tag: "",
        color: "",
      },
      filteredFiles: null,
    }));
  },
};
