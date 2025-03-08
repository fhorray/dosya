import { useEffect } from 'react';
import { fetchFiles, fetchFolders } from './fetch';

import { DosyaGrid, Filters, Header } from '@fhorray/dosya/ui';
import { useDosya } from '@fhorray/dosya';
import { DosyaTree } from '@fhorray/dosya/ui';
import { UploadIcon } from 'lucide-react';

function App() {
  const { folders, files, context, filters, uploader } = useDosya();

  const viewMode = context.config.viewMode.default;

  // useeffect to set images
  useEffect(() => {
    // fetch images
    const fetchData = async () => {
      files.setList({
        folder: '',
        limit: 100,
        page: 1,
      });

      folders.setList('root');
    };

    fetchData();
  }, []);

  return (
    <main className="w-full h-full flex">
      {/* SIDEBAR */}
      <div className="w-full max-w-[20%] bg-blue-900">ASIDE</div>

      {/* MAIN CONTENT */}
      <div className="w-full max-w-[80%] bg-gray-100">GRID</div>
    </main>
  );
}

export default App;
