import { DosyaFile, DosyaFolder, Options } from "@/types";
import { getContrastingColor } from "@/utils/get-color";
import {
  EllipsisVerticalIcon,
  FolderIcon,
  RefreshCwIcon,
  Trash2Icon,
} from "lucide-react";
import { DosyaAlert } from "@ui/custom/alert";
import { Button } from "@ui/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/ui/popover";
import { useDosya } from "@/store";

export const FolderList = ({
  folders: foldersData,
  setCurrent,
  onDelete,
  onDeleteOptions,
  onClick,
  onClickOptions,
}: {
  folders: DosyaFolder[];
  setCurrent: (folder: DosyaFolder) => void;
  onDelete?: () => void | Promise<void | DosyaFolder | null>;
  onDeleteOptions?: Options<DosyaFolder> | undefined;
  onClick: () => DosyaFile[] | Promise<DosyaFile[] | null> | null;
  onClickOptions?: Options<DosyaFile[]> | undefined;
}) => {
  const { files, folders } = useDosya();

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {foldersData?.map((folder, index) => (
        <div className="relative group" key={folder.id}>
          {/* TOP */}
          <Popover>
            <PopoverTrigger
              className="absolute right-2 top-4 z-20 group-hover:scale-[1.003]"
              asChild
            >
              <Button variant="ghost" size={"icon"} onClick={() => {}}>
                <EllipsisVerticalIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto ">
              <div className="flex items-center gap-2">
                {/* UPDATE FOLDER */}

                <Button variant={"outline"} size={"icon"}>
                  <RefreshCwIcon />
                </Button>

                {/* DELETE FOLDER */}
                <DosyaAlert
                  title="Are you sure you want to delete this folder?"
                  description="This action cannot be undone. This will permanently delete this folder and all of its contents."
                  onConfirm={() => {
                    folders.delete(async () => onDelete?.(), {
                      ...onDeleteOptions,
                    });
                  }}
                >
                  <Button variant={"outline"} size={"icon"}>
                    <Trash2Icon />
                  </Button>
                </DosyaAlert>
              </div>
            </PopoverContent>
          </Popover>

          {/* CONTENT */}
          <li
            key={index}
            onClick={() => {
              folders.setCurrent(folder);
              files.setList(
                async () => {
                  const result = await onClick?.();
                  return result ?? [];
                },
                { ...onClickOptions }
              );
            }}
            className="cursor-pointer transition-transform group-hover:scale-[1.003] z-10"
          >
            <div
              className="w-full h-28 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white p-4 flex flex-col items-start justify-center gap-2"
              style={{
                backgroundColor: folder?.metadata?.color
                  ? folder?.metadata?.color
                  : "#fff",
              }}
            >
              <FolderIcon
                size={28}
                color={
                  folder?.metadata?.color
                    ? getContrastingColor(folder?.metadata?.color)
                    : "amber"
                }
              />

              <span
                className="text-md font-medium text-gray-700 truncate w-full"
                style={{
                  color: folder?.metadata?.color
                    ? getContrastingColor(folder?.metadata?.color)
                    : "amber",
                }}
              >
                {folder.name}
              </span>
            </div>
          </li>
        </div>
      ))}
    </ul>
  );
};
