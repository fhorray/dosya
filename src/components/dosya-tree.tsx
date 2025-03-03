import { useDosya } from '@/store';
import { TFolderTree } from '@/types';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  FolderOpenIcon,
} from 'lucide-react';
import React, { useState } from 'react';

interface IDosyaTreeProps {
  itemRenderer?: React.ComponentType<{ folder: TFolderTree }>;
}

export const DosyaTree = ({ itemRenderer }: IDosyaTreeProps) => {
  const { folders } = useDosya();
  const ItemRenderer = itemRenderer;

  return (
    <ul className="text-sm">
      {folders.list?.children?.map((folder: TFolderTree) => (
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

export const FolderItem = ({ folder }: { folder: TFolderTree }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { folders } = useDosya();

  const hasChildren = folder.children && folder.children.length > 0;

  return (
    <li className="py-1">
      <div className="flex items-center group">
        <button
          className={`mr-1 p-0.5 rounded-sm transition-colors ${
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
          className="flex items-center w-full py-1 px-2 rounded-md hover:bg-gray-200 transition-colors text-left"
          onClick={() => {
            setIsOpen(!isOpen);
            folders.setCurrentFolder(folder.children ? folder : folders.list);
          }}
        >
          <span className="mr-2 text-blue-600">
            {isOpen ? <FolderOpenIcon size={16} /> : <FolderIcon size={16} />}
          </span>
          <span className="font-medium text-gray-700">{folder.name}</span>
        </button>
      </div>

      {/* SUBFOLDERS */}
      {isOpen && folder.children && folder.children.length > 0 && (
        <ul className="pl-5 border-l border-gray-200 ml-2 mt-1">
          {folder.children.map((child) => (
            <FolderItem key={child.id} folder={child} />
          ))}
        </ul>
      )}
    </li>
  );
};
