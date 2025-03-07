import { useEffect } from "react";
import { fetchFiles, fetchFolders } from "./fetch";

import { DosyaGrid, Filters, Header } from "@fhorray/dosya/ui";
import { useDosya } from "@fhorray/dosya";
import { DosyaTree } from "@fhorray/dosya/ui";
import { UploadIcon } from "lucide-react";

function App() {
  const { folders, files, context, filters, uploader } = useDosya();

  const viewMode = context.config.viewMode.default;

  // useeffect to set images
  useEffect(() => {
    // fetch images
    const fetchData = async () => {
      files.setList(async () =>
        fetchFiles({
          folder: folders.current?.key as string,
          limit: 100,
          page: 1,
        })
      );

      folders.setList(async () => fetchFolders());
    };

    fetchData();
  }, []);

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

        <button
          className="flex items-center justify-center gap-2  p-4 w-full rounded-md bg-blue-400 text-white"
          onClick={() => {
            uploader.toggle();
          }}
        >
          <UploadIcon />
          Upload File
        </button>
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
