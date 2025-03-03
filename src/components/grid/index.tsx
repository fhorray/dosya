import { useDosya } from '@/store';
import { TDosyaFile } from '@/types';
import { useEffect, useState } from 'react';
import { Header } from './header';
import { FileList } from './file-list';
import { FileIcon, FolderIcon } from 'lucide-react';
import { FolderList } from './folder-list';
import { Button } from '@/components/ui/button';

export const DosyaGrid = () => {
  const { files, folders, preview, context } = useDosya();
  const [currentFolderFiles, setCurrentFolderFiles] = useState<TDosyaFile[]>(
    [],
  );
  const viewMode = context.preferences.viewMode.default;

  useEffect(() => {
    if (folders.current) {
      const folderPath = folders.current.key;
      setCurrentFolderFiles(
        files.list.filter(
          (file) =>
            file.folderPath.split('/').filter(Boolean).join('/') === folderPath,
        ),
      );
    }
  }, [files.list, folders.current]);

  return (
    <section className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {folders.current ? 'Folders' : 'Files'}
        </h2>
        <Header
          currentView={viewMode}
          setView={context.preferences.viewMode.set}
        />
      </div>

      {folders.current?.children && folders.current.children.length > 0 ? (
        <FolderList
          folders={folders.current.children}
          viewMode={viewMode}
          setCurrentFolder={folders.setCurrentFolder}
        />
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <FolderIcon className="text-gray-400" size={32} />
          <p className="text-sm text-gray-500">No folders found</p>

          <Button
            onClick={() => {
              window.alert('Create Folder');
            }}
          >
            Create Folder
          </Button>
        </div>
      )}

      <div className="pt-4 border-t border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Files ({currentFolderFiles.length})
        </h2>
        {currentFolderFiles.length > 0 ? (
          <FileList
            files={currentFolderFiles}
            preview={preview}
            viewMode={viewMode}
          />
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <FileIcon className="mx-auto text-gray-400" size={32} />
            <p className="mt-2 text-sm text-gray-500">
              No files in this folder
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
