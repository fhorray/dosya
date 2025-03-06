import { useDosyaContext } from "./context";
import { useDosyaFiles } from "./files";
import { useDosyaFilters } from "./filters";
import { useDosyaFolders } from "./folders";
import { useDosyaPreview } from "./preview";
import { useDosyaUploader } from "./uploader";

export const useDosya = () => ({
  context: useDosyaContext(),
  uploader: useDosyaUploader(),
  files: useDosyaFiles(),
  folders: useDosyaFolders(),
  filters: useDosyaFilters(),
  preview: useDosyaPreview(),
});
