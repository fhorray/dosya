import { useDosya } from "@/store";
import { XIcon } from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

export const DosyaPreview = () => {
  const { preview } = useDosya();

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

  if (!preview.isOpen) return null;

  return (
    <div className="w-full h-full relative z-[9999]">
      <AnimatePresence>
        {preview.isOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/80"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Close Button */}
            <motion.button
              onClick={() => {
                preview.toggle();
                preview.clear();
              }}
              className="absolute top-4 right-4 rounded-full p-1 bg-white cursor-pointer"
              whileHover={{ scale: 1.2 }}
            >
              <XIcon className="text-black" />
            </motion.button>

            {/* Modal Context */}
            <motion.div
              key="modal"
              className="relative w-3/4 h-[70%] bg-white rounded-md"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Gradient overlay */}
              <div className="absolute bottom-0 w-full h-full max-h-[30%] bg-gradient-to-t from-black/40 to-transparent rounded-md" />

              {/* IMAGE INFO */}
              <div className="w-full h-full overflow-visible rounded-md relative">
                {/* IMAGE PREVIEW */}
                <img
                  src={preview.file?.url}
                  className="object-contain w-full h-full rounded-md absolute backdrop-filter backdrop-blur-lg"
                  alt="Preview"
                />

                {/* IMG BLUR BACKGROUND BLURED */}
                {!preview.file?.extension.endsWith(".png") ? (
                  <img
                    src={preview.file?.url}
                    className="object-cover w-full h-full rounded-md"
                    alt="Preview"
                  />
                ) : (
                  <div className="w-full h-full bg-black rounded-md" />
                )}
              </div>

              {/* Informações do arquivo */}
              <div className="absolute bottom-0 p-8 text-white">
                {preview.file?.metadata?.description as string} -{" "}
                {preview.file?.metadata?.owner as string}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-full relative z-20" />
    </div>
  );
};
