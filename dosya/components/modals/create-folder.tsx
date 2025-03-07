import { useDosya } from "@/store";
import { DosyaFolder, Options } from "@/types";
import { createId } from "@/utils/create-id";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

type CreateFolderProps = {
  children: React.ReactNode;
  onCreate: () => void | Promise<void | DosyaFolder | null>;
  onCreateOptions?: Options<DosyaFolder> | undefined;
};

export const CreateFolder = ({
  children,
  onCreate,
  onCreateOptions,
}: CreateFolderProps) => {
  const [folderName, setFolderName] = useState("");
  const [color, setColor] = useState("#6366F1");

  const { folders, context } = useDosya();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFolder: DosyaFolder = {
      id: createId(),
      name: folderName,
      key:
        folders.current?.key !== undefined
          ? `${folders.current?.key}/${folderName}`
          : folderName,
      parentId: folders.current?.id,
      metadata: {
        color,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    // Executa a função para criar a pasta
    folders.create(async () => onCreate(), onCreateOptions);
    onCreate();
  };

  return (
    <>
      {children}

      {folders.modal.isOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50"
          onClick={folders.modal.toggle}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Create New Folder</h2>

            <div className="relative">
              {context.state.loading && (
                <Loader2Icon
                  className="animate-spin absolute top-1/3 left-[50%] -translate-x-[50%]"
                  size={30}
                />
              )}

              <form
                onSubmit={onSubmit}
                className={cn(
                  "",
                  context.state.loading && "opacity-35 pointer-events-none"
                )}
              >
                <div className="mb-4">
                  <label
                    htmlFor="folderName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Folder Name
                  </label>
                  <input
                    type="text"
                    id="folderName"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter folder name"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="folderColor"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Folder Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      id="folderColor"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-10 h-10 rounded-md cursor-pointer"
                    />
                    <span className="text-sm text-gray-500">
                      Choose a color for your folder
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    onClick={folders.modal.toggle}
                    variant={"ghost"}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Folder</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
