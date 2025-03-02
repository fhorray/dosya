import { useDosya } from '@/store';
import { TFolderTree } from '@/types';
import { useState } from 'react';

export const FolderTree = () => {
  const { folders } = useDosya();

  return (
    <ul>
      {Object.keys(folders.list).map((folder) => (
        <FolderItem
          key={folder}
          name={folder}
          childrenTree={folders.list[folder]}
        />
      ))}
    </ul>
  );
};

export const FolderItem = ({
  name,
  childrenTree,
}: {
  name: string;
  childrenTree: TFolderTree;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="ml-4">
      <button
        className="text-left font-bold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '📂' : '📁'} {name}
      </button>
      {isOpen && (
        <ul className="pl-4">
          {Object.keys(childrenTree).map((child) => (
            <FolderItem
              key={child}
              name={child}
              childrenTree={childrenTree[child]}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
