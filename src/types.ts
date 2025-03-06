export type TDosyaFile<M = any> = {
  id: string; // ID único do arquivo
  key: string; // Caminho completo do arquivo (ex: "docs/relatorio.pdf")
  name: string; // Nome do arquivo extraído do Key (ex: "relatorio.pdf")
  extension: string; // Extensão do arquivo (ex: ".pdf")
  size: number; // Tamanho do arquivo em bytes
  lastModified: string; // Data da última modificação (ISO string)
  folderPath: string; // Caminho da pasta onde o arquivo está (ex: "docs/")
  url?: string; // URL pública (se houver)
  height?: number; // Altura da imagem (se for imagem)
  width?: number; // Largura da imagem (se for imagem)
  metadata?: M; // Metadados adicionais (opcional)
};

// FOLDER TREE
export type TDosyaFolder<M = Record<any, any>> = {
  id?: string;
  key: string;
  name?: string;
  parentId?: string;
  files?: number; // show quantity of files inside the folder, use it to decide call the API or not
  children?: TDosyaFolder<M>[];
  metadata?:
    | (M & {
        color?: string;
        createdAt?: string;
        updatedAt?: string;
      })
    | null;
};

// R2
export type R2Object = {
  key: string;
  version: string;
  size: number;
  etag: string;
  httpMetadata?: Record<string, string>;
  customMetadata?: Record<string, string>;
  uploaded: Date;
};

export type R2ObjectsList = {
  objects: R2Object[];
  truncated: boolean;
  cursor?: string | null;
};

// STORE TYPES
export type Options<T = any> = {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

// FILTERS
export type SearchProps = {
  name?: string;
  format?: string;
  size?: string;
  tag?: string;
  color?: string;
};

export type AsyncOrSyncFunction<T extends unknown[] = [], R = void> = (
  ...args: T
) => R | Promise<R>;

type ConfigProps = {
  viewMode: {
    default: "grid" | "list";
    set: (value: "grid" | "list") => void;
  };
  defaultFolder: string;
  baseUrl: string;
};

export type DosyaConfig = {
  defaultView: ConfigProps["viewMode"]["default"];
  defaultFolder: string;
  baseUrl: string;
};

export type DosyaContext = {
  config: ConfigProps;
  setConfig: (config: DosyaConfig) => void;
  error: {
    message: string;
    setMessage: (message: string) => void;
    clear: () => void;
  };
  state: {
    loading: boolean;
    setLoading: (state: boolean) => void;
  };
};

export type DosyaProps = {
  context: DosyaContext;

  files: {
    list: TDosyaFile[] | null;
    setList: (
      fn: () => Promise<TDosyaFile[] | null> | TDosyaFile[] | null,
      options?: Options<TDosyaFile[]>
    ) => void;
    upload: (files: File[], callback?: AsyncOrSyncFunction<[], void>) => void;
  };

  folders: {
    list: TDosyaFolder | null;
    create: (
      fn: () => Promise<TDosyaFolder | null | void> | void,
      options?: Options<TDosyaFolder>
    ) => void;
    delete: (
      fn: () => Promise<TDosyaFolder | null | void> | void,
      options?: Options<TDosyaFolder>
    ) => void;
    setList: (
      fn: () => Promise<TDosyaFolder | null> | TDosyaFolder | null,
      options?: Options<TDosyaFolder>
    ) => void;
    current: TDosyaFolder | null;
    setCurrent: (folder: TDosyaFolder | null) => void;

    modal: {
      isOpen: boolean;
      toggle: () => void;
    };
  };

  uploader: {
    isOpen: boolean;
    toggle: () => void;
  };

  filters: {
    search: SearchProps | null;
    setSearch: (search: SearchProps) => void;
    reset: () => void;
    filteredFiles: TDosyaFile[] | null;
    setFilteredFiles: (files: TDosyaFile[]) => void;
  };

  preview: {
    isOpen: boolean;
    toggle: (file?: TDosyaFile | null) => void;
    file: TDosyaFile | null;
    setFile: (file: TDosyaFile) => void;
    clear: () => void;
  };
};
