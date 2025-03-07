import { DosyaProps, DosyaFile, Options } from "@/types";
import { Store, batch } from "@tanstack/store";
import { stateActions, errorActions } from "./context";

// Define o tipo do estado de arquivos
export type DosyaFilesState = {
  list: DosyaFile[] | null;
};

// Estado inicial para os arquivos
const initialFilesState: DosyaFilesState = {
  list: null,
};

// Cria o store para os arquivos
export const dosyaFilesStore = new Store(initialFilesState);

// Ações para manipular o estado dos arquivos
export const dosyaFilesActions = {
  setList: async (
    fn: (() => Promise<DosyaFile[]> | DosyaFile[]) | DosyaFile[],
    options?: Options<DosyaFile[]>
  ) => {
    // Ativa o loading no contexto
    stateActions.setLoading(true);

    try {
      const result = fn instanceof Function ? await fn() : fn;

      // Atualiza o store de arquivos
      dosyaFilesStore.setState(() => ({ list: result }));

      // Chama o callback de sucesso, se existir
      if (options?.onSuccess) {
        options.onSuccess(result as DosyaFile[]);
      }
    } catch (error) {
      console.error(error);
      options?.onError?.(error as Error);
    } finally {
      // Desativa o loading no contexto
      stateActions.setLoading(false);
    }
  },

  upload: async (
    files: File[] | null,
    uploadFunction?: () => Promise<void>
  ) => {
    // Limpa o erro no contexto
    errorActions.setMessage("");
    try {
      if (!files) {
        errorActions.setMessage("File or folder not found");
        return;
      }
      await uploadFunction?.();
    } catch (error) {
      console.error(error);
    } finally {
      stateActions.setLoading(false);
    }
  },
};
