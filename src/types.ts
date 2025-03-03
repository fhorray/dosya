
export type TDosyaFile<M = any> = {
  id: string;           // ID único do arquivo
  key: string;          // Caminho completo do arquivo (ex: "docs/relatorio.pdf")
  name: string;         // Nome do arquivo extraído do Key (ex: "relatorio.pdf")
  extension: string;    // Extensão do arquivo (ex: ".pdf")
  size: number;         // Tamanho do arquivo em bytes
  lastModified: string; // Data da última modificação (ISO string)
  folderPath: string;   // Caminho da pasta onde o arquivo está (ex: "docs/")
  url?: string;         // URL pública (se houver)
  height?: number;      // Altura da imagem (se for imagem)
  width?: number;       // Largura da imagem (se for imagem)
  metadata?: M;      // Metadados adicionais (opcional)
};


// FOLDER TREE
export type TFolderTree = {
  id?: string;
  key: string;
  name?: string;
  parentId?: string;
  children?: TFolderTree[];
};


// R2
export type R2Object = {
  key: string;
  version: string;
  size: number;
  etag: string;
  httpMetadata?: Record<string, string>;
  customMetadata?: Record<string, string>;
  uploaded: Date;
}

export type R2ObjectsList = {
  objects: R2Object[];
  truncated: boolean;
  cursor?: string | null;
}