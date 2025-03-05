import { DosyaConfig } from "@/store";
import { TDosyaFolder } from "@/types";
import { FolderIcon } from "lucide-react";

export const FolderList = ({
  folders,
  setCurrentFolder,
  viewMode,
}: {
  folders: TDosyaFolder[];
  setCurrentFolder: (folder: TDosyaFolder) => void;
  viewMode: DosyaConfig["defaultView"];
}) => {
  return viewMode === "grid" || viewMode === "list" ? (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {folders.map((folder, index) => (
        <li
          key={index}
          onClick={() => setCurrentFolder(folder)}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <div className="w-full h-28 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white p-4 flex flex-col items-center justify-center gap-2">
            <FolderIcon
              className="text-amber-500"
              size={28}
              style={{ backgroundColor: folder.metadata }}
            />
            <span className="text-sm font-medium text-gray-700 truncate w-full text-center">
              {folder.name}
            </span>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden bg-white">
      {folders.map((folder, index) => (
        <li
          key={index}
          onClick={() => setCurrentFolder(folder)}
          className="cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center px-4 py-3">
            <div className="mr-3">
              <FolderIcon className="text-amber-500" size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 truncate">
                {folder.name}
              </p>
              <p className="text-xs text-gray-500">
                {folder.children?.length || 0} items
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
