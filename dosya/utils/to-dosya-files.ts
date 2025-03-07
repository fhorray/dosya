import { DosyaFile } from "@/types";
import { createId } from "./create-id";

// Tipo para as opções de chaves dinâmicas e callback
type Options = {
  keys?: {
    metadata?: string;
    height?: string;
    width?: string;
    url?: string;
    lastModified?: string;
    size?: string;
    name?: string;
    key?: string;
  };
  onSuccess?: (files: DosyaFile[]) => void;
};

/**
 * Retorna o valor de um objeto baseado em uma lista de chaves prioritárias.
 * @param obj O objeto de origem.
 * @param possibleKeys Lista de chaves em ordem de prioridade.
 * @returns O valor encontrado ou undefined.
 */
const getValueByPriority = <T>(
  obj: Record<string, unknown>,
  possibleKeys: string[]
): T | undefined => {
  for (const key of possibleKeys) {
    if (obj[key] !== undefined) {
      return obj[key] as T;
    }
  }
  return undefined;
};

export const toDosyaFiles = <T>(
  data: T,
  { onSuccess, keys }: Options = {}
): DosyaFile[] => {
  let filesData: DosyaFile[] = [];

  if (Array.isArray(data)) {
    const files = data
      .map((item) => {
        // Se o item for um objeto, extrai as propriedades esperadas
        if (typeof item === "object" && item !== null) {
          const obj = item as Record<string, unknown>;

          const key =
            getValueByPriority<string>(obj, [keys?.key ?? "key"]) || "";
          const name =
            getValueByPriority<string>(obj, [
              keys?.name ?? "name",
              "title",
              "filename",
            ]) ||
            key.split("/").pop() ||
            "unknown";
          const extension = name.includes(".")
            ? name.substring(name.lastIndexOf("."))
            : "";
          const size =
            getValueByPriority<number>(obj, [
              keys?.size ?? "size",
              "fileSize",
              "bytes",
            ]) || 0;
          const lastModified =
            getValueByPriority<string>(obj, [
              keys?.lastModified ?? "lastModified",
              "uploaded",
              "lastUpdated",
              "updatedAt",
              "modifiedAt",
            ]) || "";
          const folderPath = key.includes("/")
            ? key.substring(0, key.lastIndexOf("/") + 1)
            : "";

          // Tratamento de propriedades opcionais corretamente
          const url = getValueByPriority<string>(obj, [
            keys?.url ?? "url",
            "downloadLink",
            "source",
          ]);
          const metadata = getValueByPriority<Record<string, unknown>>(obj, [
            keys?.metadata ?? "metadata",
            "meta",
            "customMetadata",
          ]);
          const height = getValueByPriority<number>(obj, [
            keys?.height ?? "height",
            "imgHeight",
          ]);
          const width = getValueByPriority<number>(obj, [
            keys?.width ?? "width",
            "imgWidth",
          ]);

          return {
            id: createId(),
            key,
            name,
            extension,
            size,
            lastModified,
            folderPath,
            url,
            metadata,
            height,
            width,
          };
        }

        // Se o item for uma string, trata como caminho do arquivo
        if (typeof item === "string") {
          return {
            id: createId(),
            key: item,
            name: item.split("/").pop() || "unknown",
            extension: item.includes(".")
              ? item.substring(item.lastIndexOf("."))
              : "",
            size: 0,
            lastModified: "",
            folderPath: item.includes("/")
              ? item.substring(0, item.lastIndexOf("/") + 1)
              : "",
          };
        }

        return null; // Caso o item não seja um objeto nem string
      })
      .filter((file) => file !== null);

    filesData = files as DosyaFile[];
  }

  onSuccess?.(filesData); // Executa a função de sucesso

  return filesData;
};
