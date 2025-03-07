import { Button } from "@/components/ui/button";
import { useDosya } from "@/store";

import { FileIcon, FolderIcon, Loader2Icon } from "lucide-react";
import { FileList } from "./file-list";
import { FolderList } from "./folder-list";
import { DosyaFile, DosyaFolder, Options } from "@/types";

export const DosyaGrid = ({
  onClick,
  onClickOptions,
  onDelete,
  onDeleteOptions,
}: {
  onClick?: () => DosyaFile[] | Promise<DosyaFile[] | null> | null;
  onClickOptions?: Options<DosyaFile[]> | undefined;
  onDelete?: (() => void | Promise<void | DosyaFolder | null>) | undefined;
  onDeleteOptions?: Options<DosyaFolder> | undefined;
}) => {
  const { files, folders, preview, context, filters } = useDosya();

  const viewMode = context.config.viewMode.default;
  const filesData = (filters.filteredFiles || files.list)?.filter(
    (f) => f.name !== ".config.json"
  );

  return (
    <section className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Folders ({folders.list?.children?.length || 0})
        </h2>
      </div>

      {folders.current?.children && folders.current?.children?.length > 0 ? (
        <FolderList
          onClick={
            onClick ??
            (() => {
              window.alert("Folder clicked");
              return null;
            })
          }
          onClickOptions={onClickOptions}
          onDelete={onDelete}
          onDeleteOptions={onDeleteOptions}
          folders={
            folders.current.name === "root"
              ? (folders.list?.children as DosyaFolder[])
              : folders.current?.children || []
          }
          setCurrent={folders.setCurrent}
        />
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <FolderIcon className="text-gray-400" size={32} />
          <p className="text-sm text-gray-500">No folders found</p>

          <Button onClick={folders.modal.toggle}>Create Folder</Button>
        </div>
      )}

      {context.state.loading ? (
        <div className="w-full h-full min-h-[200px] flex items-center justify-center">
          <Loader2Icon size={44} className="animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="pt-4 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Files ({filesData?.length})
          </h2>
          {(filesData?.length as number) > 0 ? (
            <FileList
              files={filesData as DosyaFile[]}
              preview={preview}
              viewMode={viewMode}
            />
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <FileIcon className="mx-auto text-gray-400" size={32} />
              <p className="mt-2 text-sm text-gray-500">
                No files in this folder
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
