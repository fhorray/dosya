import { DosyaFolder } from '@/types';

export function findFolder<M = Record<any, any>>(
  folders: DosyaFolder<M>[],
  value: string,
): DosyaFolder<M> | null {
  for (const folder of folders) {
    if (folder.key === value || folder.id === value) {
      return folder; // Encontrou a pasta
    }

    // Se houver subpastas, pesquisa recursivamente
    if (folder.children) {
      const found = findFolder(folder.children, value);
      if (found) return found;
    }
  }

  return null; // Retorna null se não encontrar
}
