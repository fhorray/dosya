import { useEffect } from 'react';
import { DosyaGrid } from './components/grid';
import { fetchFiles } from './fetch';
import { useDosya } from './store';
import { R2Object } from './types';
import { toDosyaFiles } from './utils/to-dosya-files';
import { DosyaSidebar } from './components/sidebar';
import { Loader2Icon } from 'lucide-react';

function App() {
  const { files, folders, context } = useDosya();

  // useeffect to set images
  useEffect(() => {
    // fetch images
    const fetchData = async () => {
      context.state.setLoading(true);

      const data = await fetchFiles();
      console.log({ Data: data });
      files.setList(
        toDosyaFiles<R2Object[]>(data.data, {
          onSuccess: (files) => {
            folders.setList(files);
            context.state.setLoading(false);
          },
        }),
      );
    };

    fetchData();
  }, []);

  // show loading if is loading state
  if (context.state.loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2Icon size={44} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <main className="flex gap-4 w-full">
      {/* SIDEBAR */}
      <DosyaSidebar />

      {/* GRID */}
      <div className="w-full max-w-[80%] p-4 ml-[20%]">
        <DosyaGrid />
      </div>
    </main>
  );
}

export default App;
