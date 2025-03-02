import { TFolderTree } from "@/types";

export const buildTree = (paths: string[]): TFolderTree => {
  const tree: TFolderTree = {};
  paths.forEach((path) => {
    const parts = path.split('/').filter(Boolean);
    let current = tree;
    for (const part of parts) {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
  });
  return tree;
};