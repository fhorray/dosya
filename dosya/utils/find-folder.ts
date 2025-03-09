import { DosyaFolder } from '@/types';

export function findFolder<M = Record<any, any>>(
  folders: DosyaFolder<M>[],
  key: string,
): DosyaFolder<M> | null {
  for (const folder of folders) {
    if (folder.key === key) {
      return folder; // Encontrou a pasta
    }

    // Se houver subpastas, pesquisa recursivamente
    if (folder.children) {
      const found = findFolder(folder.children, key);
      if (found) return found;
    }
  }

  return null; // Retorna null se não encontrar
}
