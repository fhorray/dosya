import { create } from 'zustand';
import { TDosyaFile as DosyaFile, TDosyaFile, TDosyaFolder } from './types';
import { formatBytes } from './utils/format-bytes';

type Options<T = any> = {
  onSuccess?: (data: T) => void;
  onError?: (error: T) => void;
};

// FILTERS
type SearchProps = {
  name?: string;
  format?: string;
  size?: string;
  tag?: string;
  color?: string;
};

type AsyncOrSyncFunction<T extends unknown[] = [], R = void> = (
  ...args: T
) => R | Promise<R>;

type ConfigProps = {
  viewMode: {
    default: 'grid' | 'list';
    set: (value: 'grid' | 'list') => void;
  };
  defaultFolder: string;
  baseUrl: string;
};

export type DosyaConfig = {
  defaultView: ConfigProps['viewMode']['default'];
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
    list: DosyaFile[] | null;
    setList: (
      fn: () => Promise<DosyaFile[] | null> | DosyaFile[] | null,
      options?: Options<DosyaFile[]>,
    ) => void;
    upload: (files: File[], callback?: AsyncOrSyncFunction<[], void>) => void;
  };

  folders: {
    list: TDosyaFolder | null;
    create: (
      folder: TDosyaFolder,
      onSuccess: (folder: TDosyaFolder) => void,
    ) => void;
    setList: (
      fn: () => Promise<TDosyaFolder | null> | TDosyaFolder | null,
      options?: Options<TDosyaFolder>,
    ) => void;
    current: TDosyaFolder | null;
    setCurrentFolder: (folder: TDosyaFolder | null) => void;
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

export const useDosya = create<DosyaProps>((set, get) => ({
  // CONTEXT
  context: {
    error: {
      message: '',
      setMessage: (message) =>
        set((state) => ({
          context: {
            ...state.context,
            error: {
              message,
              setMessage: state.context.error.setMessage,
              clear: state.context.error.clear,
            },
          },
        })),
      clear: () =>
        set((state) => ({
          context: {
            ...state.context,
            error: {
              message: '',
              setMessage: state.context.error.setMessage,
              clear: state.context.error.clear,
            },
          },
        })),
    },

    // states (loading)
    state: {
      loading: false,
      setLoading: (loading) => {
        set((state) => {
          return {
            context: {
              ...state.context,
              state: {
                ...state.context.state,
                loading: loading,
              },
            },
          };
        });
      },
    },

    // configuration
    config: {
      defaultFolder: '/',
      baseUrl: '/',
      viewMode: {
        default: 'grid',
        set: (value) => {
          set((state) => ({
            context: {
              ...state.context,
              config: {
                ...state.context.config,
                viewMode: {
                  ...state.context.config.viewMode,
                  default: value,
                },
              },
            },
          }));
        },
      },
    },

    // set configuration
    setConfig: (config) => {
      set((state) => ({
        context: {
          ...state.context,
          config: {
            ...state.context.config,
            ...config,
          },
        },
      }));
    },
  },

  // UPLOADER
  uploader: {
    isOpen: false,
    toggle: () =>
      set((state) => ({
        uploader: { ...state.uploader, isOpen: !state.uploader.isOpen },
      })),
  },

  // FILES
  files: {
    list: null,
    setList: async (fn, options) => {
      set((state) => ({
        context: {
          ...state.context,
          state: {
            ...state.context.state,
            loading: true,
          },
        },
      }));

      try {
        const result = fn instanceof Function ? await fn() : fn;

        set((state) => ({
          files: {
            ...state.files,
            list: result,
          },
        }));

        options?.onSuccess?.(result as TDosyaFile[]);
      } catch (error) {
        console.error(error);
      } finally {
        set((state) => ({
          context: {
            ...state.context,
            state: {
              ...state.context.state,
              loading: false,
            },
          },
        }));
      }
    },
    upload: async (files, uploadFunction) => {
      // clear error
      set((state) => ({
        context: {
          ...state.context,
          error: {
            message: '',
            setMessage: state.context.error.setMessage,
            clear: state.context.error.clear,
          },
        },
      }));

      try {
        if (!files) {
          set((state) => ({
            context: {
              ...state.context,
              error: {
                message: 'File or folder not found',
                setMessage: state.context.error.setMessage,
                clear: state.context.error.clear,
              },
            },
          }));
          return;
        }

        uploadFunction?.();
      } catch (error) {
        console.error(error);
      } finally {
        set((state) => ({
          context: {
            ...state.context,
            state: {
              ...state.context.state,
              loading: false,
            },
          },
        }));
      }
    },
  },

  // FOLDERS
  folders: {
    list: null,
    create: (folder, onSuccess) => {
      onSuccess?.(folder);
    },

    setList: async (fn, options) => {
      set((state) => ({
        context: {
          ...state.context,
          state: {
            ...state.context.state,
            loading: true,
          },
        },
      }));

      try {
        const result = fn instanceof Function ? await fn() : await fn;

        set((state) => ({
          context: {
            ...state.context,
            state: {
              ...state.context.state,
              loading: true,
            },
          },
          folders: {
            ...state.folders,
            list: result,
          },
        }));

        options?.onSuccess?.(result as TDosyaFolder);
      } catch (error) {
        console.error(error);
      } finally {
        set((state) => ({
          context: {
            ...state.context,
            state: {
              ...state.context.state,
              loading: false,
            },
          },
        }));
      }
    },
    current: null,
    setCurrentFolder: (folder) =>
      set((state) => ({
        folders: {
          ...state.folders,
          current: {
            id: folder?.id || 'root',
            name: folder?.name || 'root',
            key: folder?.key || 'root',
            children: folder?.children || [],
            parentId: folder?.parentId || 'root',
            ...folder,
          },
        },
      })),
  },

  // FILTERS
  filters: {
    search: {
      name: '',
      format: '',
      size: '',
      tag: '',
      color: '',
    },
    setSearch: (search) => {
      const files = get().files.list?.filter((file) => {
        const nameData = file.name
          .toLowerCase()
          .includes(search.name?.toLowerCase() as string);

        const sizeData =
          formatBytes(file.size).value >= parseInt(search.size as string);

        return nameData || sizeData;
      });

      set((state) => ({
        filters: {
          ...state.filters,
          filteredFiles: files ?? null,
          search: {
            ...state.filters.search,
            ...search,
          },
        },
      }));
    },
    filteredFiles: null,
    setFilteredFiles: (files) =>
      set((state) => ({ filters: { ...state.filters, filteredFiles: files } })),
    reset: () =>
      set((state) => ({ filters: { ...state.filters, search: null } })),
  },

  // PREVIEW
  preview: {
    isOpen: false,
    toggle: (file?: DosyaFile | null) =>
      set((state) => ({
        preview: {
          ...state.preview,
          isOpen: !state.preview.isOpen,
          file: file || null,
        },
      })),
    file: null,
    setFile: (file) =>
      set((state) => ({ preview: { ...state.preview, file } })),
    clear: () =>
      set((state) => ({ preview: { ...state.preview, file: null } })),
  },
}));
