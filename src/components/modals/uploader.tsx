import { AnimatePresence } from "motion/react";
import React, { useState } from "react";

import { useDosya } from "@/store";
import { CheckIcon, FileIcon, UploadIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

type FileUpload = {
  name: string;
  progress: number;
  timeLeft: number;
  completed: boolean;
  error: boolean;
  file: File;
};

export const FileUploader = () => {
  const { uploader, files, folders, context } = useDosya();

  const [filesData, setFilesData] = useState<FileUpload[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // In a real implementation, you would process the dropped files here
  };

  const backdropVariants = {
    hidden: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  const data = filesData.map((i) => i.file);

  // on submit
  const handleSubmit = () => {
    files.upload(data, () => {
      files.upload(data, () => {
        const folder = folders.current?.key || "";

        // set error message if folder path is undefined
        if (!folder) {
          context.error.setMessage("Folder not found");
          return;
        }

        // set new files array merging the old files with the new ones
        //files.setList();
      });
    });
  };

  return (
    <div className="w-full h-full relative z-[9999]">
      {/* TRIGGER */}

      <AnimatePresence>
        {uploader.isOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/80"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Modal Context */}
            <motion.div
              key="modal"
              className="relative flex flex-col justify-between w-2xl min-h-[50%] max-h-[90%] h-fit bg-white rounded-md p-4 overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-0 right-0 p-2 z-30 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                onClick={() => uploader.toggle()}
              >
                <XIcon className="text-black" />
              </motion.button>

              <div>
                {/* INPUT FILE */}
                <div
                  className="relative border-2 border-dashed min-h-[120px] border-gray-200 rounded-lg p-6 mb-2 flex items-center justify-center flex-col gap-2 hover:bg-gray-100 transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;

                      if (files) {
                        setFilesData(
                          Array.from(files).map((file) => {
                            return {
                              name: file.name,
                              progress: 0,
                              timeLeft: 0,
                              completed: false,
                              error: false,
                              file,
                            };
                          })
                        );
                      }
                    }}
                  />

                  <UploadIcon className="h-8 w-8 text-gray-500" />
                  <p className="text-gray-400">Drag and drop or browse files</p>
                </div>

                {/* SELECTED FILES */}
                <div className="space-y-6 overflow-y-auto max-h-[300px] p-3 px-6">
                  {filesData.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 border-b-2 border-gray-200 py-4"
                    >
                      <div className="flex flex-col items-center gap-2 w-full">
                        <div className="w-full flex gap-2">
                          <FileIcon />
                          <span className="text-gray-600">{file.name}</span>
                        </div>

                        {/* PROGRESS BAR */}
                        <div className="w-full flex items-center gap-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-500 h-2 rounded-full"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>

                          <div className="flex items-center gap-4 min-w-[170px] justify-end">
                            <span className="text-gray-400 text-sm">
                              {file.timeLeft} min left
                            </span>
                            <span className="text-indigo-500 font-medium">
                              {file.progress}%
                            </span>
                            {file.completed ? (
                              <CheckIcon className="h-5 w-5 text-green-500" />
                            ) : (
                              <Button
                                className="p-1"
                                onClick={() => {
                                  setFilesData((prev) => {
                                    return prev.filter((_, i) => i !== index);
                                  });
                                }}
                              >
                                <XIcon className="h-5 w-5 text-gray-400" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FOOTER WITH BUTTONS */}
              <div className="flex justify-end gap-4 pt-8">
                <Button
                  onClick={() => {
                    setFilesData([]);
                    uploader.toggle();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleSubmit();
                    setFilesData([]);
                    uploader.toggle();
                  }}
                >
                  Upload
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-full relative z-20" />
    </div>
  );
};
