import { useEffect } from "react";
import { fetchFiles, fetchFolders } from "./fetch";

import { DosyaGrid, DosyaSidebar, Filters, Header } from "@fhorray/dosya/ui";
import { useDosya } from "@fhorray/dosya";

function App() {
  const { folders, files, context, filters } = useDosya();

  const viewMode = context.config.viewMode.default;

  // useeffect to set images
  useEffect(() => {
    // fetch images
    const fetchData = async () => {
      files.setList(async () => {
        try {
          const result = await fetchFiles({
            folder: "",
            limit: 100,
            page: 1,
          });
          return result || [];
        } catch (error) {
          console.error(error);
          return [];
        }
      });

      folders.setList(async () => fetchFolders());
    };

    fetchData();
  }, []);

  return (
    <main className="flex gap-4 w-full">
      {/* SIDEBAR */}
      <DosyaSidebar />

      <main className="w-full max-w-[80%] ml-[20%] flex flex-col">
        {/* HEADER */}
        <Header currentView={viewMode} setView={() => {}} />

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
