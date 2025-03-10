import { useDosya } from '@fhorray/dosya';
import {
  DosyaGrid,
  DosyaTree,
  Filters,
  FolderSelector,
  Header,
  UploadFileButton,
} from '@fhorray/dosya/ui';
import { UploadIcon } from 'lucide-react';

function App() {
  const { context, folders, filters } = useDosya();

  const viewMode = context.config.viewMode.default;

  return (
    <main className="flex gap-4 w-full">
      {/* SIDEBAR */}
      <aside className="w-full max-w-[20%] border-r-2 border-gray-200 p-4 h-screen overflow-y-auto fixed bg-white space-y-4">
        {/* ERROR */}
        {context.error.message && (
          <div className="bg-red-500 text-white p-2 rounded">
            {context.error.message}
          </div>
        )}

        {/* UPLOAD */}
        <UploadFileButton>
          <UploadIcon />
          New File
        </UploadFileButton>

        {/* FOLDER SELECTOR */}
        <FolderSelector
          onSelect={(folder) => {
            folders.setCurrent(folder);
          }}
          omit={[]}
        />
        <DosyaTree />
      </aside>

      <main className="w-full max-w-[80%] ml-[20%] flex flex-col">
        {/* HEADER */}
        <Header currentView={viewMode} setView={context.config.viewMode.set} />

        {/* FILTERS */}
        <div className="w-full px-4">
          <span>{`search: ${filters.search?.name}`}</span>
        </div>
        <Filters />

        {/* GRID */}
        <div className="w-full p-4">
          <DosyaGrid />
        </div>
      </main>
    </main>
  );
}

export default App;
