import { DosyaFile, DosyaFolder } from '@fhorray/dosya/types';
import { cache } from 'react';

// FETCH FILES
export const fetchFiles = cache(
  async ({
    folder,
    limit,
    page,
  }: {
    page: string | number;
    limit: number;
    folder: string | undefined;
  }): Promise<DosyaFile[] | null> => {
    try {
      const res = await fetch('http://127.0.0.1:8787/files/list', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folder,
          limit: String(limit),
          page,
        }),
      });
      const data = await res.json();
      return data.data as DosyaFile[];
    } catch (error) {
      console.error(error);
      return null;
    }
  },
);

// FETCH FOLDERS
export const fetchFolders = cache(async (): Promise<DosyaFolder | null> => {
  try {
    const res = await fetch('http://127.0.0.1:8787/files/list/folders', {
      credentials: 'include',
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
});

// CREATE FOLDER
export const createFolder = cache(
  async (folder: DosyaFolder): Promise<DosyaFolder | null> => {
    try {
      const res = await fetch('http://127.0.0.1:8787/files/create/folder', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...folder,
        }),
      });
      const data = await res.json();

      return data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
);

// DELETE FOLDER
export const deleteFolder = cache(
  async (folder: string | DosyaFolder): Promise<DosyaFolder | null> => {
    try {
      const res = await fetch('http://127.0.0.1:8787/files/delete/folder', {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ folder }),
      });

      if (!res.ok) {
        throw new Error(`Erro na API: ${res.status} - ${res.statusText}`);
      }

      const data = await res.json();

      return data?.data ?? null;
    } catch (error) {
      console.error('Erro em deleteFolder:', error);
      return null;
    }
  },
);
