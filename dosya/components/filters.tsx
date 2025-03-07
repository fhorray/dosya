import { useDosya } from "@/store";
import { PlusIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { DosyaAlert } from "./custom/alert";
import { DosyaFolder, Options } from "@/types";
import { CreateFolder } from "./modals/create-folder";

export const Filters = ({
  onDelete,
  onDeleteOptions,
  onFolderCreate,
  onFolderCreateOptions,
}: {
  onDelete?: () => void | Promise<void | DosyaFolder | null>;
  onDeleteOptions?: Options<DosyaFolder> | undefined;
  onFolderCreate?: () => void | Promise<void | DosyaFolder | null>;
  onFolderCreateOptions?: Options<DosyaFolder> | undefined;
}) => {
  const { filters, folders } = useDosya();

  return (
    <div className="w-full flex items-center  gap-4 p-4">
      <div className="w-full flex items-center gap-4">
        {/* SEARCH */}
        <div className="relative w-full max-w-[30%]">
          <input
            type="text"
            placeholder="Search files..."
            className="w-full p-2 border border-gray-200 rounded-md"
            onChange={(e) => {
              if (e.target.value === "") {
                filters.reset();
              }

              filters.setSearch({
                name: e.target.value,
              });
            }}
          />

          <SearchIcon className="absolute right-2 top-2 text-gray-400" />
        </div>

        {/* SIZE */}
        <div className="relative w-full max-w-[30%]">
          <input
            type="number"
            placeholder="5 (MB)"
            className="w-full p-2 border border-gray-200 rounded-md"
            onChange={(e) => {
              if (e.target.value === "") {
                filters.reset();
              }

              filters.setSearch({
                size: e.target.value,
              });
            }}
          />

          <SearchIcon className="absolute right-2 top-2 text-gray-400" />
        </div>
      </div>

      {/* OPTIONS */}
      <div className="flex items-center gap-4">
        {/* DELETE CURRENT FOLDER*/}
        {folders.current?.key !== undefined && (
          <DosyaAlert
            title={`Are you sure you want to delete ${folders.current?.name} ?`}
            onConfirm={async () => {
              folders.delete(() => onDelete?.(), onDeleteOptions);
            }}
          >
            <Button variant={"destructive"}>
              <Trash2Icon />
              Delete
            </Button>
          </DosyaAlert>
        )}

        <CreateFolder
          onCreate={() => {
            folders.create(() => onFolderCreate?.(), onFolderCreateOptions);
          }}
        >
          <Button variant={"outline"}>
            <PlusIcon /> New Folder
          </Button>
        </CreateFolder>
      </div>
    </div>
  );
};
