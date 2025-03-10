import { TDosyaFolder } from "@/types";

export function findFolder<M = Record<any, any>>(
  folders: TDosyaFolder<M>[],
  id: string
): TDosyaFolder<M> | null {
  for (const folder of folders) {
    if (folder.id === id) {
      return folder; // Encontrou a pasta
    }

    // Se houver subpastas, pesquisa recursivamente
    if (folder.children) {
      const found = findFolder(folder.children, id);
      if (found) return found;
    }
  }

  return null; // Retorna null se não encontrar
}
