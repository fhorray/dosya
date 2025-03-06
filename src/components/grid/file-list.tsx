import { DosyaProps } from '@/store';
import { TDosyaFile } from '@/types';
import { FileIcon } from './file-icon';

export const FileList = ({
  files,
  preview,
  viewMode,
}: {
  files: TDosyaFile[];
  preview: DosyaProps['preview'];
  viewMode: string;
}) => {
  return viewMode === 'grid' ? (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file, index) => (
        <li
          key={index}
          onClick={() => {
            preview.toggle();
            preview.setFile(file);
          }}
          className="cursor-pointer transition-transform hover:scale-[1.01]"
        >
          <div className="w-full h-28 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white p-4 flex flex-col items-center justify-center gap-2">
            <FileIcon fileType={file.extension} />
            <span className="text-sm font-medium text-gray-700 truncate w-full text-center">
              {file.name}
            </span>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden bg-white">
      {files.map((file, index) => (
        <li
          key={index}
          onClick={() => {
            preview.toggle();
            preview.setFile(file);
          }}
          className="cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-2 px-4 py-3">
            <FileIcon fileType={file.extension} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">
                {file.name}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
