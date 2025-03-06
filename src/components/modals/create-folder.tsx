import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { X } from "lucide-react";
import { TDosyaFolder } from "@/types";
import { useDosya } from "@/store";
import { createId } from "@/utils/create-id";
import { createFolder } from "@/fetch";

export const CreateFolder = () => {
  const [folderName, setFolderName] = useState("");
  const [color, setColor] = useState("#6366F1");

  const { folders } = useDosya();

  if (!folders.modal.isOpen) return null;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // context.state.setLoading(true);

    // const folderData = {
    //   id: createId(),
    //   key: folders.current
    //     ? ${folders.current?.key}/new-folder6
    //     : "new-folder 6",
    //   name: "New Folder 6",
    //   parentId: folders.current?.id || "root",
    //   children: [],
    //   metadata: {
    //     tag: "new-folder",
    //   },
    // } as TDosyaFolder;

    // folders.create(folderData, async (folder) => {
    //   folders.setList(async () => await createFolder(folder.key), {
    //     onSuccess: () => {
    //       context.state.setLoading(false);
    //       folders.setCurrentFolder(folder);
    //     },
    //   });
    // });

    const newFolder: TDosyaFolder = {
      id: createId(),
      name: folderName,
      key: folders.current
        ? ` ${folders.current?.key}/${folderName}`
        : folderName,
      parentId: folders.current?.id,
      metadata: {
        color,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    folders.create(newFolder, async (folder) => {
      folders.setList(async () => await createFolder(folder.key), {
        onSuccess: () => {
          folders.setCurrentFolder(folder);
          folders.modal.toggleOpen();
          setFolderName("");
          setColor("#6366F1");
        },
      });
    });
  };

  const backdropVariants = {
    hidden: { opacity: 0, transition: { duration: 0.3 } },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {folders.modal.isOpen && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            key="modal"
            className="bg-white rounded-lg w-full max-w-md p-6 relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <button
              onClick={folders.modal.toggleOpen}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Create New Folder</h2>

            <form onSubmit={onSubmit}>
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
                    className="w-12 h-12 rounded cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">
                    Choose a color for your folder
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={folders.modal.toggleOpen}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
