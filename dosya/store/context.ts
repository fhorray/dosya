import { Store, batch } from "@tanstack/store";

// Define o tipo do contexto
export type DosyaContext = {
  error: {
    message: string;
  };
  state: {
    loading: boolean;
  };
  config: {
    defaultFolder: string;
    baseUrl: string;
    viewMode: {
      default: "grid" | "list";
    };
  };
};

// Estado inicial equivalente ao do seu Zustand
const initialState: DosyaContext = {
  error: {
    message: "",
  },
  state: {
    loading: false,
  },
  config: {
    defaultFolder: "/",
    baseUrl: "/",
    viewMode: {
      default: "grid",
    },
  },
};

// Cria o store do TanStack com o estado inicial
export const dosyaContextStore = new Store(initialState);

// Actions para manipular o estado
export const errorActions = {
  setMessage: (message: string) => {
    dosyaContextStore.setState((prev) => ({
      ...prev,
      error: { ...prev.error, message },
    }));
  },
  clear: () => {
    dosyaContextStore.setState((prev) => ({
      ...prev,
      error: { ...prev.error, message: "" },
    }));
  },
};

export const stateActions = {
  setLoading: (loading: boolean) => {
    dosyaContextStore.setState((prev) => ({
      ...prev,
      state: { ...prev.state, loading },
    }));
  },
};

export const configActions = {
  setViewMode: (value: "grid" | "list") => {
    dosyaContextStore.setState((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        viewMode: { ...prev.config.viewMode, default: value },
      },
    }));
  },
  setConfig: (config: Partial<DosyaContext["config"]>) => {
    dosyaContextStore.setState((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        ...config,
        viewMode: {
          ...prev.config.viewMode,
          ...(config.viewMode || {}),
        },
      },
    }));
  },
};

// Exemplo de atualização em batch (todas as atualizações são aplicadas de uma vez só)
// export const batchUpdateExample = () => {
//   batch(() => {
//     stateActions.setLoading(true);
//     errorActions.setMessage("Carregando...");
//   });
// };
