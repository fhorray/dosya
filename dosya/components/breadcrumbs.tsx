import { cn } from '@/lib/utils';
import { useDosya } from '@/store';
import { ChevronRightIcon, FolderIcon, HomeIcon } from 'lucide-react';

export const Breadbrumbs = () => {
  const { folders } = useDosya();
  return (
    <div className="flex gap-2">
      <HomeIcon />
      {folders.current?.key.split('/').map((key, i) => {
        const isActive = key === folders.current?.name;

        // 🔹 Se for a primeira pasta, renderiza apenas o nome sem ícone
        if (i === 0) {
          return (
            <span
              key={key}
              className={cn(
                'flex items-center gap-3 opacity-60 pb-1',
                isActive && 'opacity-100',
              )}
            >
              {key}
            </span>
          );
        }

        // 🔹 Para demais pastas, adiciona os ícones de navegação
        return (
          <div
            key={key}
            className={cn(
              'flex items-center gap-3 opacity-60',
              isActive && 'opacity-100',
            )}
          >
            <ChevronRightIcon size={17} />
            <div className="flex items-center gap-2">
              <FolderIcon size={17} />
              <span className="pb-1">{key}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
