import { FolderTree } from './components/folder-tree';
import { useDosya } from './store';

function App() {
  const { files } = useDosya();

  return (
    <main className="flex gap-4 w-full">
      {/* SIDEBAR */}
      <aside className="w-full max-w-[200px]">
        <h1>My Sidebar</h1>
        <FolderTree />
      </aside>

      {/* GRID */}
      <section className="w-full">
        <h1>Files</h1>
        <ul className="grid grid-cols-4 gap-2">
          {files.list?.map((file, index) => (
            <li key={index}>
              <div className="w-full h-20 rounded-md border-2 border-gray-200">
                {file.name}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
