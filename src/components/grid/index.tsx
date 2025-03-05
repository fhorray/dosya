import { Button } from "@/components/ui/button";
import { createFolder } from "@/fetch";
import { useDosya } from "@/store";
import { TDosyaFolder } from "@/types";
import { createId } from "@/utils/create-id";
import { FileIcon, FolderIcon, Loader2Icon } from "lucide-react";
import { FileList } from "./file-list";
import { FolderList } from "./folder-list";

export const DosyaGrid = () => {
  const { files, folders, preview, context, filters } = useDosya();

  const viewMode = context.config.viewMode.default;
  const filesData = filters.filteredFiles || files.list;

  return (
    <section className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Folders ({folders.list?.children?.length || 0})
        </h2>
      </div>

      {folders.current?.children && folders.current?.children?.length > 0 ? (
        <FolderList
          folders={
            folders.current.name === "root"
              ? (folders.list?.children as TDosyaFolder[])
              : folders.current?.children || []
          }
          viewMode={viewMode}
          setCurrentFolder={folders.setCurrentFolder}
        />
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <FolderIcon className="text-gray-400" size={32} />
          <p className="text-sm text-gray-500">No folders found</p>

          <Button
            onClick={() => {
              context.state.setLoading(true);

              const folderData = {
                id: createId(),
                key: folders.current
                  ? `${folders.current?.key}/new-folder4`
                  : "new-folder 4",
                name: "New Folder 4",
                parentId: folders.current?.id || "root",
                children: [],
                metadata: {
                  tag: "new-folder",
                },
              } as TDosyaFolder;

              folders.create(folderData, async (folder) => {
                const createdFolder = await createFolder(folder.key);

                folders.setList(createdFolder.data as TDosyaFolder, () => {
                  context.state.setLoading(false);

                  folders.setCurrentFolder(folder);
                });
              });
            }}
          >
            Create Folder
          </Button>
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
          {filesData?.length > 0 ? (
            <FileList files={filesData} preview={preview} viewMode={viewMode} />
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
