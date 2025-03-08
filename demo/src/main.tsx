import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { DosyaProvider } from '@fhorray/dosya';
import { DosyaConfig } from '@fhorray/dosya/types';
import {
  createFolder,
  deleteFolder,
  fetchFiles,
  fetchFolders,
} from './fetch.ts';

const config = {
  baseUrl: '/api',
  defaultFolder: '/',
  defaultView: 'grid',
  fetchers: {
    fetchFiles: async ({ folder, limit, page }) =>
      fetchFiles({ page, limit, folder }),
    fetchFolders: async () => fetchFolders(),
    onFolderCreate: async (folder) => createFolder(folder),
    onFolderDelete: async (folder) => deleteFolder(folder),
    onFileDelete: async () => null,
    onCreateFile: async () => null,
  },
} satisfies DosyaConfig;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DosyaProvider config={config}>
      <App />
    </DosyaProvider>
  </StrictMode>,
);
