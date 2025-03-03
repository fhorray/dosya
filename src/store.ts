import { create } from 'zustand';
import { TDosyaFile as DosyaFile, TFolderTree } from './types';
import { buildTree } from './utils/build-tree';

type AsyncOrSyncFunction<T extends any[] = [], R = void> = (
  ...args: T
) => R | Promise<R>;

export type DosyaPreferences = {
  viewMode: {
    default: 'grid' | 'list';
    set: (value: 'grid' | 'list') => void;
  };
};

export type DosyaContext = {
  error: {
    message: string;
    setMessage: (message: string) => void;
    clear: () => void;
  };
  state: {
    loading: boolean;
    setLoading: (state: boolean) => void;
  };
  preferences: DosyaPreferences;
};

export type DosyaProps = {
  context: DosyaContext;

  files: {
    list: DosyaFile[];
    setList: (files: DosyaFile[]) => void;
    upload: (files: File[], callback?: AsyncOrSyncFunction<[], void>) => void;
  };

  uploader: {
    isOpen: boolean;
    toggle: () => void;
  };

  folders: {
    list: TFolderTree | null;
    setList: (folders: TFolderTree[]) => void;
    current: TFolderTree | null;
    setCurrentFolder: (folder: TFolderTree | null) => void;
  };

  filters: {
    search: string;
    setSearch: ({
      file,
      format,
      size,
      tag,
      color,
    }: {
      file: string;
      format: string;
      size: number;
      tag: string;
      color: string;
    }) => void;
    reset: () => void;
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

    preferences: {
      viewMode: {
        default: 'grid',
        set: (value) =>
          set((state) => ({
            context: {
              ...state.context,
              preferences: {
                ...state.context.preferences,
                viewMode: {
                  ...state.context.preferences.viewMode,
                  default: value,
                },
              },
            },
          })),
      },
    },
  },

  // FILES
  files: {
    list: [],
    setList: (files) => {
      set((state) => ({
        files: { ...state.files, list: files },
      }));
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
      }
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

  // FODLERS
  folders: {
    list: null,
    setList: (folders) =>
      set((state) => ({
        folders: {
          ...state.folders,
          list: buildTree(folders),
        },
      })),
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
    search: '',
    setSearch: ({ file, format, size, tag, color }) =>
      set((state) => ({
        filters: {
          ...state.filters,
          search: [file, format, size, tag, color].join(' '),
        },
      })),
    reset: () =>
      set((state) => ({ filters: { ...state.filters, search: '' } })),
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
