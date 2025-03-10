import { DosyaFile, DosyaFolder } from '.';

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
    default: 'grid' | 'list';
    set: (value: 'grid' | 'list') => void;
  };
  defaultFolder: string;
  baseUrl: string | undefined;

  fetchers: {
    fetchFiles?: AsyncOrSyncFunction<
      [
        values: {
          folder: string | undefined;
          limit: number;
          page: string | number;
        },
      ],
      Promise<DosyaFile[] | null> | DosyaFile[] | null
    >;
    fetchFolders?: AsyncOrSyncFunction<
      [key?: string],
      Promise<DosyaFolder | null> | DosyaFolder | null
    >;
    onFolderCreate?: AsyncOrSyncFunction<
      [folder: DosyaFolder],
      Promise<DosyaFolder | null | void> | DosyaFolder | null | void
    >;
    onFolderDelete?: AsyncOrSyncFunction<
      [folder: string | DosyaFolder],
      Promise<DosyaFolder | null | void> | DosyaFolder | null | void
    >;
    onDeleteFile?: AsyncOrSyncFunction<
      [],
      Promise<DosyaFile | null | void> | DosyaFile | null | void
    >;
    onCreateFile?: AsyncOrSyncFunction<
      [],
      Promise<DosyaFile | null | void> | DosyaFile | null | void
    >;
  };
};

export type DosyaConfig = {
  defaultView: ConfigProps['viewMode']['default'];
  defaultFolder: string;
  baseUrl?: string;
  fetchers: ConfigProps['fetchers'];
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
    list: DosyaFile[] | null;
    setList: (
      data: { page: string | number; limit: number; folder: string },
      options?: Options<DosyaFile[]>,
    ) => void;
    upload: (files: File[], callback?: AsyncOrSyncFunction<[], void>) => void;
  };

  folders: {
    list: DosyaFolder | null;
    create: (data: DosyaFolder, options?: Options<DosyaFolder>) => void;
    delete: (
      data: string | DosyaFolder,
      options?: Options<DosyaFolder>,
    ) => void;
    setList: (key: string, options?: Options<DosyaFolder>) => void;
    current: DosyaFolder | null;
    setCurrent: (folder: DosyaFolder | null) => void;

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
    filteredFiles: DosyaFile[] | null;
    setFilteredFiles: (files: DosyaFile[]) => void;
  };

  preview: {
    isOpen: boolean;
    toggle: (file?: DosyaFile | null) => void;
    file: DosyaFile | null;
    setFile: (file: DosyaFile) => void;
    clear: () => void;
  };
};
