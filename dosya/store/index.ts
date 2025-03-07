import { useDosyaContext } from "./context";
import { useDosyaFiles } from "./files";
import { useDosyaFilters } from "./filters";
import { useDosyaFolders } from "./folders";
import { useDosyaPreview } from "./preview";
import { useDosyaUploader } from "./uploader";

export const useDosya = () => {
  const context = useDosyaContext();
  const uploader = useDosyaUploader();
  const files = useDosyaFiles();
  const folders = useDosyaFolders();
  const filters = useDosyaFilters();
  const preview = useDosyaPreview();

  return { context, uploader, files, folders, filters, preview };
};
