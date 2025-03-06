import { useEffect } from "react";
import { Filters } from "./components/filters";
import { DosyaGrid } from "./components/grid";
import { Header } from "./components/grid/header";
import { DosyaSidebar } from "./components/sidebar";
import { fetchFiles, fetchFolders } from "./fetch";
import { useDosya } from "./store";

function App() {
  const { folders, files, context, filters } = useDosya();

  const viewMode = context.config.viewMode.default;

  // useeffect to set images
  useEffect(() => {
    // fetch images
    const fetchData = async () => {
      files.setList(async () =>
        fetchFiles({
          folder: "",
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
      <DosyaSidebar />

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
