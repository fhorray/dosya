import { create } from 'zustand';
import { TDosyaFile as DosyaFile, TFolderTree } from './types';
import { mockData } from '@/mock-data';
import { buildTree } from './utils/folder-tree';


type DosyaProps = {
  files: {
    list: DosyaFile[]
  },

  folders: {
    list: TFolderTree
    currentFolder: string
    setCurrentFolder: (folder: string) => void
  }
};

export const useDosya = create<DosyaProps>((set) => ({
  files: {
    list: mockData,
  },
  folders: {
    list: buildTree(mockData.map((file) => file.folderPath)),
    currentFolder: '',
    setCurrentFolder: (folder) => set((state) => ({ folders: { ...state.folders, currentFolder: folder } })),
  },
}));