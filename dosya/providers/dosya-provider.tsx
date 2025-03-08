// DosyaProvider.tsx
import { useRef } from 'react';
import { DosyaConfig } from '@/types';
import { DosyaPreview } from '@/components/dosya-preview';
import { FileUploader } from '@/components/modals/uploader';
import { Toaster } from '@/components/ui/sonner';
import { useDosyaContext } from '@/store/context';

export const DosyaProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config?: DosyaConfig;
}) => {
  const initialized = useRef(false);
  const setConfig = useDosyaContext((state) => state.setConfig);
  const setViewMode = useDosyaContext((state) => state.config.viewMode.set);

  if (!initialized.current && config) {
    setConfig({
      baseUrl: config.baseUrl || '/',
      defaultFolder: config.defaultFolder || '/',
      defaultView: config.defaultView || 'grid',
      fetchers: {
        fetchFiles: config.fetchers?.fetchFiles || (async () => null),
        fetchFolders: config.fetchers?.fetchFolders || (async () => null),
        onFileDelete: config.fetchers?.onFileDelete || (async () => null),
        onFolderCreate: config.fetchers?.onFolderCreate || (async () => null),
        onFolderDelete: config.fetchers?.onFolderDelete || (async () => null),
        onCreateFile: config.fetchers?.onCreateFile || (async () => null),
      },
    });
    setViewMode(config.defaultView || 'grid');
    initialized.current = true;
  }

  return (
    <div className="w-full">
      {children}
      <Toaster />
      <DosyaPreview />
      <FileUploader />
    </div>
  );
};
