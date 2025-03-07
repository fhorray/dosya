import { useDosya } from "@/store";

import { DialogContent } from "@radix-ui/react-dialog";
import { Dialog } from "./ui/dialog";

export const DosyaPreview = () => {
  const { preview } = useDosya();

  if (!preview.isOpen) return null;

  return (
    <Dialog open={preview.isOpen} onOpenChange={() => preview.toggle()}>
      <DialogContent>
        {/* Modal Context */}
        <div key="modal" className="relative w-3/4 h-[70%] bg-white rounded-md">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
