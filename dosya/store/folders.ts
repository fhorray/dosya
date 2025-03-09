import { DosyaProps, DosyaFolder } from '@/types';
import { create } from 'zustand';
import { useDosyaContext } from './context';
import { findFolder } from '@/utils/find-folder';
import { toast } from 'sonner';

export const useDosyaFolders = create<DosyaProps['folders']>((set, get) => ({
  list: null,
  current: {
    id: 'root',
    name: 'root',
    key: 'root',
    children: [],
    parentId: 'root',
  },

  create: async (data, options) => {
    useDosyaContext.getState().state.setLoading(true);
    try {
      const result = await useDosyaContext
        .getState()
        .config.fetchers.onFolderCreate(data);

      // set new result
      if (result) {
        const found = findFolder(
          result?.children as DosyaFolder<Record<any, any>>[],
          data.key as string,
        );

        console.log({ found });

        set((state) => ({
          ...state,
          list: result as DosyaFolder<Record<any, any>> | null,
          current: found,
        }));

        toast.success('Folder created successfully!');
      }

      options?.onSuccess?.(result as DosyaFolder);
    } catch (error) {
      options?.onError?.(error as Error);
    } finally {
      useDosyaContext.getState().state.setLoading(false);
    }
  },

  delete: async (data, options) => {
    useDosyaContext.getState().state.setLoading(true);

    try {
      const result = await useDosyaContext
        .getState()
        .config.fetchers.onFolderDelete(data);

      // set new result
      if (result) {
        set((state) => ({
          ...state,
          list: result as DosyaFolder<Record<any, any>> | null,
          current: undefined,
        }));

        toast.success('Folder deleted successfully!');
      }

      options?.onSuccess?.(result as DosyaFolder);
    } catch (error) {
      options?.onError?.(error as Error);
    } finally {
      useDosyaContext.getState().state.setLoading(false);
    }
  },

  setList: async (key, options) => {
    useDosyaContext.getState().state.setLoading(true);
    try {
      const result = await useDosyaContext
        .getState()
        .config.fetchers.fetchFolders(key);

      // set new result
      if (result) {
        set((state) => ({
          ...state,
          list: result,
        }));
      }

      options?.onSuccess?.(result as DosyaFolder);
    } catch (error) {
      options?.onError?.(error as Error);
    } finally {
      useDosyaContext.getState().state.setLoading(false);
    }
  },

  setCurrent: (folder) => {
    set(() => ({
      current: {
        id: folder?.id || 'root',
        name: folder?.name || 'root',
        key: folder?.key || 'root',
        children: folder?.children || [],
        parentId: folder?.parentId || 'root',
        ...folder,
      },
    }));
  },

  modal: {
    isOpen: false,
    toggle: () =>
      set((state) => ({
        ...state,
        modal: { ...state.modal, isOpen: !state.modal.isOpen },
      })),
  },
}));
