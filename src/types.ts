export type TDosyaFile = {
  id: string;           // ID único do arquivo
  key: string;          // Caminho completo do arquivo (ex: "docs/relatorio.pdf")
  name: string;         // Nome do arquivo extraído do Key (ex: "relatorio.pdf")
  extension: string;    // Extensão do arquivo (ex: ".pdf")
  size: number;         // Tamanho do arquivo em bytes
  lastModified: string; // Data da última modificação (ISO string)
  url?: string;         // URL pública (se houver)
  folderPath: string;   // Caminho da pasta onde o arquivo está (ex: "docs/")
};


// FOLDER TREE
export type TFolderTree = {
  [key: string]: TFolderTree;
};