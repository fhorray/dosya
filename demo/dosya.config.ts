import { DosyaConfig } from '@fhorray/dosya/types';
import {
  createFolder,
  deleteFolder,
  fetchFiles,
  fetchFolders,
} from './src/fetch';

export default {
  baseUrl: 'https://media.francy.dev',
  defaultFolder: '/',
  defaultView: 'grid',
  fetchers: {
    fetchFiles: async ({ folder, limit, page }) =>
      fetchFiles({ page, limit, folder }),
    fetchFolders: async () => fetchFolders(),
    onFolderCreate: async (folder) => createFolder(folder),
    onFolderDelete: async (folder) => deleteFolder(folder),
  },
} satisfies DosyaConfig;
