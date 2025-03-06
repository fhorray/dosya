import { fetchFiles } from '@/fetch';
import { cn } from '@/lib/utils';
import { useDosya } from '@/store';
import { TDosyaFolder } from '@/types';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  FolderOpenIcon,
} from 'lucide-react';
import React, { useState } from 'react';

interface IDosyaTreeProps {
  itemRenderer?: React.ComponentType<{ folder: TDosyaFolder }>;
}

export const DosyaTree = ({ itemRenderer }: IDosyaTreeProps) => {
  const { folders } = useDosya();
  const ItemRenderer = itemRenderer;

  return (
    <ul className="text-sm">
      {folders.list?.children?.map((folder: TDosyaFolder) => (
        <React.Fragment key={folder.id}>
          {ItemRenderer ? (
            <ItemRenderer folder={folder} />
          ) : (
            <FolderItem folder={folder} />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export const FolderItem = ({ folder }: { folder: TDosyaFolder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { folders, files, context } = useDosya();

  const hasChildren = folder.children && folder.children.length > 0;

  const isCurrentPath = folders.current?.key === folder.key;

  return (
    <li className="py-0">
      <div
        className={cn(
          'flex items-center group my-1 rounded-md',
          isCurrentPath && 'bg-gray-200 hover:bg-gray-100',
        )}
      >
        <button
          className={`mr-1 p-0.5 rounded-sm transition-colors cursor-pointer ${
            hasChildren ? 'visible' : 'invisible'
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Collapse folder' : 'Expand folder'}
        >
          {isOpen ? (
            <ChevronDownIcon size={14} className="text-gray-500" />
          ) : (
            <ChevronRightIcon size={14} className="text-gray-500" />
          )}
        </button>

        <button
          className={
            'flex cursor-pointer items-center w-full py-1 px-0 rounded-md transition-colors text-left'
          }
          onClick={async () => {
            setIsOpen(!isOpen);
            folders.setCurrentFolder(folder.children ? folder : folders.list);
            files.setList(
              async () =>
                fetchFiles({
                  folder: folder.key,
                  limit: 100,
                  page: 1,
                }),
              {
                onSuccess: (data) => {
                  context.state.setLoading(false);
                },
              },
            );
          }}
        >
          <span className="mr-2 text-blue-600">
            {isOpen && isCurrentPath ? (
              <FolderOpenIcon size={16} />
            ) : (
              <FolderIcon size={16} />
            )}
          </span>
          <span className="font-medium text-gray-700">{folder.name}</span>
        </button>
      </div>

      {/* SUBFOLDERS */}
      {isOpen && folder.children && folder.children.length > 0 && (
        <ul className="pl-2 border-l border-gray-200 ml-2 mt-1">
          {folder.children.map((child) => (
            <FolderItem key={child.id} folder={child} />
          ))}
        </ul>
      )}
    </li>
  );
};
