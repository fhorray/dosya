import { DosyaFolder } from "@/types";
import { createId } from "./create-id";

export const buildTree = (
  folders: DosyaFolder[],
  metadataMap: Record<string, unknown>,
  omit?: string[]
): DosyaFolder => {
  const root: DosyaFolder = {
    id: "root",
    name: "root",
    key: "root",
    files: 0,
    children: [],
    metadata: {},
  };

  folders.forEach((path) => {
    const parts = path.key.split("/").filter(Boolean);
    parts.pop(); // Remove o último item (assumindo que é um arquivo).

    if (omit && omit.includes(parts[0])) {
      return;
    }

    let current = root;

    for (const part of parts) {
      if (!current.children) {
        current.children = [];
      }

      let existingChild = current.children.find((child) => child.name === part);

      if (!existingChild) {
        const newKey = current.key === "root" ? part : `${current.key}/${part}`;

        existingChild = {
          id: createId(),
          name: part,
          key: newKey,
          parentId: current.id,
          children: [],
          metadata: metadataMap[newKey] || {},
        };

        current.children.push(existingChild);
      }

      current = existingChild;
    }
  });

  return root;
};
