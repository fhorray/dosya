import { DosyaProps, DosyaFolder, Options } from "@/types";
import { Store } from "@tanstack/store";
import { stateActions } from "./context";
import { findFolder } from "@/utils/find-folder";
import { toast } from "sonner";

// Define o tipo do estado do store de folders
type DosyaFoldersState = DosyaProps["folders"];

// Estado inicial para os folders
const initialFoldersState: DosyaFoldersState = {
  list: null,
  current: null,
  modal: {
    isOpen: false,
    toggle: () => {},
  },
  create: () => {},
  delete: () => {},
  setList: () => {},
  setCurrent: () => {},
};

// Cria o store com o estado inicial
export const dosyaFoldersStore = new Store(initialFoldersState);

// Ações para manipular o estado dos folders
export const foldersActions = {
  create: async (fn: () => Promise<any>, options?: Options<DosyaFolder>) => {
    stateActions.setLoading(true);
    try {
      const result = await fn();

      // Procura a pasta atual dentro do resultado
      const currentFolderId = dosyaFoldersStore.state.current?.id as string;
      const found = findFolder(
        result?.children as DosyaFolder<Record<any, any>>[],
        currentFolderId
      );

      // Atualiza o estado com o novo resultado e a pasta encontrada
      if (result) {
        dosyaFoldersStore.setState((prev) => ({
          ...prev,
          list: result as DosyaFolder<Record<any, any>> | null,
          current: found,
        }));

        // toast.success("Folder created successfully!");
      }

      options?.onSuccess?.(result as DosyaFolder);
    } catch (error) {
      options?.onError?.(error as Error);
    } finally {
      stateActions.setLoading(false);
    }
  },

  delete: async (fn: () => Promise<any>, options?: Options<DosyaFolder>) => {
    stateActions.setLoading(true);
    try {
      const result = await fn();

      // Atualiza o estado com o novo resultado e reseta a pasta atual
      if (result) {
        dosyaFoldersStore.setState((prev) => ({
          ...prev,
          list: result as DosyaFolder<Record<any, any>> | null,
          current: null,
        }));

        // toast.success("Folder deleted successfully!");
      }

      options?.onSuccess?.(result as DosyaFolder);
    } catch (error) {
      options?.onError?.(error as Error);
    } finally {
      stateActions.setLoading(false);
    }
  },

  setList: async (fn: () => Promise<any>, options?: Options<DosyaFolder>) => {
    stateActions.setLoading(true);
    try {
      const result = await fn();

      // Atualiza o estado com a nova lista, se houver resultado
      if (result) {
        dosyaFoldersStore.setState((prev) => ({
          ...prev,
          list: result as DosyaFolder<Record<any, any>> | null,
        }));
      }

      options?.onSuccess?.(result as DosyaFolder);
    } catch (error) {
      options?.onError?.(error as Error);
    } finally {
      stateActions.setLoading(false);
    }
  },

  setCurrent: (folder: Partial<DosyaFolder> | null) => {
    dosyaFoldersStore.setState(() => ({
      list: null,
      create: () => {},
      delete: () => {},
      setList: () => {},
      modal: { isOpen: false, toggle: () => {} },
      current: {
        id: folder?.id || "root",
        name: folder?.name || "root",
        key: folder?.key || "root",
        children: folder?.children || [],
        parentId: folder?.parentId || "root",
        ...folder,
      },
      setCurrent: () => {},
    }));
  },

  // Ação para alternar o estado do modal
  toggleModal: () => {
    dosyaFoldersStore.setState((prev) => ({
      ...prev,
      modal: { ...prev.modal, isOpen: !prev.modal.isOpen },
    }));
  },
};
