import { fetchFiles } from "@/fetch";
import { useDosya } from "@/store";
import { TDosyaFolder } from "@/types";
import { EllipsisVerticalIcon, FolderIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const FolderList = ({
  folders,
  setCurrentFolder,
}: {
  folders: TDosyaFolder[];
  setCurrentFolder: (folder: TDosyaFolder) => void;
}) => {
  const { files } = useDosya();

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {folders.map((folder, index) => (
        <li
          key={index}
          onClick={() => {
            return;
            setCurrentFolder(folder);
            files.setList(async () =>
              fetchFiles({
                folder: folder.key,
                limit: 100,
                page: 1,
              })
            );
          }}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <div className="w-full h-28 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white p-4 flex flex-col items-center justify-center gap-2">
            <div className="w-full flex items-center justify-between">
              <FolderIcon
                className="text-amber-500"
                size={28}
                style={{ backgroundColor: folder.metadata }}
              />

              <Popover>
                <PopoverTrigger>
                  <Button onClick={() => {}}>
                    <EllipsisVerticalIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>TEST</PopoverContent>
              </Popover>
            </div>
            <span className="text-sm font-medium text-gray-700 truncate w-full text-center">
              {folder.name}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
