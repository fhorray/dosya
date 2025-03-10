import { useDosya } from '@/store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { DosyaFolder } from '@/types';
import { findFolder } from '@/utils';

type TFolderSelectorProps = {
  onSelect?: (folder: DosyaFolder) => void;
  omit?: string[];
};

export const FolderSelector = ({ onSelect, omit }: TFolderSelectorProps) => {
  const { folders } = useDosya();

  return (
    <Select
      onValueChange={(value) => {
        if (!onSelect) return;

        const foundFolder = findFolder(folders.list?.children ?? [], value);
        if (foundFolder) onSelect(foundFolder);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select folder..." />
      </SelectTrigger>
      <SelectContent className="border-0 py-2">
        {folders.list?.children && (
          <SelectItems folders={folders.list} onSelect={onSelect} omit={omit} />
        )}
      </SelectContent>
    </Select>
  );
};

// SELECT ITEMS COMPONENT
const SelectItems = ({
  folders,
  onSelect,
  omit,
}: TFolderSelectorProps & { folders: DosyaFolder }) => {
  return (
    <>
      {folders.children?.map((folder) => {
        if (omit?.includes(folder.key as string)) return null;

        return (
          <div key={folder.id}>
            <SelectItem
              value={folder.id as string}
              onClick={() => console.log('clicked')}
            >
              {folder.name}
            </SelectItem>

            {folder.children && folder.children.length > 0 && (
              <div className="pl-4">
                <SelectItems folders={folder} onSelect={onSelect} omit={omit} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
