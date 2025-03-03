import { TFolderTree } from "@/types";
import { createId } from "./create-id";

export const buildTree = (folders: TFolderTree[]): TFolderTree => {
  const root: TFolderTree = { id: "root", name: "root", key: "root", children: [] };

  folders.forEach((path) => {
    const parts = path.key.split('/').filter(Boolean);
    parts.pop(); // Remove o último item que é o nome do arquivo e extensão

    let current = root;

    for (const part of parts) {
      if (!current.children) {
        current.children = [];
      }

      // Verifica se já existe uma pasta com o mesmo nome
      let existingChild = current.children.find(child => child.name === part);

      if (!existingChild) {
        // Criando um novo ID apenas se não existir a pasta
        const newKey = current.key === "root" ? part : `${current.key}/${part}`; // Evita "root/root/..."

        existingChild = {
          id: createId(),
          name: part,
          key: newKey,
          parentId: current.id,
          children: []
        };

        current.children.push(existingChild);
      }

      current = existingChild; // Move para o próximo nível da árvore
    }
  });

  return root;
};