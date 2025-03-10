import { DosyaFile, DosyaProps } from '@/types';
import { create } from 'zustand';
import { useDosyaContext } from './context';

export const useDosyaFiles = create<DosyaProps['files']>((set) => ({
  list: null,

  setList: async (values, options) => {
    useDosyaContext.getState().state.setLoading(true);

    try {
      const result = await useDosyaContext
        .getState()
        .config.fetchers.fetchFiles?.(values);
      let mapped = [];

      if (useDosyaContext.getState().config.baseUrl) {
        mapped =
          result?.flatMap((file) => ({
            ...file,
            url: `${useDosyaContext.getState().config.baseUrl}/${file.key}`,
          })) ?? [];
      } else {
        mapped = result ?? [];
      }

      if (result) {
        set(() => ({ list: mapped }));
      }

      // call onSuccess callback
      if (options?.onSuccess) {
        options?.onSuccess?.(result as DosyaFile[]);
      }
    } catch (error) {
      console.error(error);
      options?.onError?.(error as Error);
    } finally {
      useDosyaContext.getState().state.setLoading(false);
    }
  },

  upload: async (files, uploadFunction) => {
    // Limpa erro no contexto
    useDosyaContext.getState().error.setMessage('');
    try {
      if (!files) {
        useDosyaContext.getState().error.setMessage('File or folder not found');
        return;
      }
      await uploadFunction?.();
    } catch (error) {
      console.error(error);
    } finally {
      useDosyaContext.getState().state.setLoading(false);
    }
  },
}));
