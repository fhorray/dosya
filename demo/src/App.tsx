import { useEffect } from 'react';

import { useDosya } from '@fhorray/dosya';
import { DosyaGrid, DosyaSidebar, Filters, Header } from '@fhorray/dosya/ui';

function App() {
  const { folders, files, context, filters } = useDosya();

  const viewMode = context.config.viewMode.default;

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
