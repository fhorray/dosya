import { useDosya } from '@/store';

import { Dialog, DialogContent, DialogTitle } from './ui/dialog';

export const DosyaPreview = () => {
  const { preview } = useDosya();

  if (!preview.isOpen) return null;

  return (
    <Dialog open={preview.isOpen} onOpenChange={() => preview.toggle()}>
      <DialogTitle>{preview.file?.name}</DialogTitle>
      <DialogContent className="w-full min-w-[70%] h-full max-h-[80%] p-0 border-0">
        {/* Modal Context */}

        {/* IMAGE INFO */}
        <div className="w-full h-full overflow-visible rounded-md relative ">
          {/* IMAGE PREVIEW */}
          <img
            src={preview.file?.url}
            className="object-contain bg-red-500 w-full h-full rounded-md absolute backdrop-filter backdrop-blur-lg"
            alt="Preview"
          />

          {/* IMG BLUR BACKGROUND BLURED */}
          {!preview.file?.extension.endsWith('.png') ? (
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
          {preview.file?.metadata?.description as string} -{' '}
          {preview.file?.metadata?.owner as string}
        </div>
      </DialogContent>
    </Dialog>
  );
};
