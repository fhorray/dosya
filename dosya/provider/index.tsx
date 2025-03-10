import { useEffect, useRef, useState } from 'react';
import { DosyaConfig } from '@/types';
import { DosyaPreview } from '@/components/preview';
import { FileUploader } from '@/components/uploader/modal';
import { Toaster } from '@/components/ui/sonner';
import { useDosyaContext } from '@/store/context';
import { useDosya } from '@/store';

export const DosyaProvider = ({ children }: { children: React.ReactNode }) => {
  const { files, folders } = useDosya();
  const initialized = useRef(false);
  const setConfig = useDosyaContext((state) => state.setConfig);
  const setViewMode = useDosyaContext((state) => state.config.viewMode.set);
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        // Tentativa de importar o arquivo mylib.config.ts dinamicamente
        // @ts-ignore
        const configModule = await import(/* @vite-ignore */ '/dosya.config.ts')
          .then((module) => module.default)
          .catch(() => null);

        if (!configModule) {
          console.warn(
            'dosya.config.ts file not found. Using default configurations.',
          );
          setIsConfigLoaded(true);
          return;
        }

        const config: DosyaConfig = configModule;

        setConfig({
          baseUrl: config.baseUrl || undefined,
          defaultFolder: config.defaultFolder || '/',
          defaultView: config.defaultView || 'grid',
          fetchers: {
            fetchFiles: config.fetchers?.fetchFiles || (async () => null),
            fetchFolders: config.fetchers?.fetchFolders || (async () => null),
            onDeleteFile: config.fetchers?.onDeleteFile || (async () => null),
            onFolderCreate:
              config.fetchers?.onFolderCreate || (async () => null),
            onFolderDelete:
              config.fetchers?.onFolderDelete || (async () => null),
            onCreateFile: config.fetchers?.onCreateFile || (async () => null),
          },
        });

        setViewMode(config.defaultView || 'grid');
      } catch (error) {
        console.error('Erro ao carregar a configuração:', error);
      } finally {
        setIsConfigLoaded(true);

        const fetchData = async () => {
          files.setList({
            folder: '',
            limit: 100,
            page: 1,
          });

          folders.setList('root');
        };

        fetchData();
      }
    };

    if (!initialized.current) {
      loadConfig();
      initialized.current = true;
    }
  }, []);

  // useeffect to set images & folders
  // useEffect(() => {}, []);

  if (!isConfigLoaded) {
    return <div>Loading configurations...</div>;
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
