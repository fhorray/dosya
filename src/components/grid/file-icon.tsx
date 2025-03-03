import {
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  GridIcon,
  ImageIcon,
  ListIcon,
} from 'lucide-react';
import { JSX } from 'react';

export const FileIconComponent = ({ fileType }: { fileType?: string }) => {
  const fileIcons: Record<string, JSX.Element> = {
    image: <ImageIcon className="text-purple-500" size={24} />,
    pdf: <FileTextIcon className="text-red-500" size={24} />,
    spreadsheet: <FileTextIcon className="text-green-500" size={24} />,
    code: <FileCodeIcon className="text-blue-500" size={24} />,
    default: <FileIcon className="text-gray-500" size={24} />,
  };

  const fileTypes = {
    image: [
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.svg',
      '.webp',
      '.bmp',
      '.tiff',
      '.ico',
    ],
    pdf: ['.pdf'],
    spreadsheet: ['.xlsx', '.xls', '.csv', '.tsv'],
    code: [
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.html',
      '.css',
      '.scss',
      '.json',
      '.xml',
      '.yml',
      '.yaml',
      '.md',
    ],
  };

  for (const [key, extensions] of Object.entries(fileTypes)) {
    if (extensions.includes(fileType || '')) return fileIcons[key];
  }

  return fileIcons.default;
};
