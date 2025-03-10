import { useDosya } from '@/store';

import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import DocViewer, {
  DocViewerRenderers,
  IDocument,
} from '@cyntler/react-doc-viewer';

export const DosyaPreview = () => {
  const { preview } = useDosya();

  if (!preview.isOpen) return null;

  return (
    <Dialog open={preview.isOpen} onOpenChange={() => preview.toggle()}>
      <DialogTitle></DialogTitle>
      <DialogContent className="w-full min-w-[70%] h-full max-h-[80%] p-0 border-0 overflow-y-scroll">
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={
            [
              {
                uri: preview.file?.url,
                fileType: preview.file?.extension.replace('.', ''),
              },
            ] as IDocument[]
          }
        />
      </DialogContent>
    </Dialog>
  );
};
