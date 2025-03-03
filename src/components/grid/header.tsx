import { DosyaPreferences } from '@/store';
import { GridIcon, ListIcon } from 'lucide-react';
import { Button } from '../ui/button';

// Component for view mode toggle
export const Header = ({
  currentView,
  setView,
}: {
  currentView: DosyaPreferences['viewMode']['default'];
  setView: (view: DosyaPreferences['viewMode']['default']) => void;
}) => (
  <header className="flex justify-between items-center space-x-2">
    <h1>Your Files</h1>

    {['grid', 'list'].map((view) => (
      <Button
        key={view}
        onClick={() => setView(view as DosyaPreferences['viewMode']['default'])}
        className={`p-2 rounded-md ${
          currentView === view
            ? 'bg-blue-100 text-blue-600 border-0'
            : 'bg-transparent border-0 text-gray-500 hover:bg-gray-100'
        }`}
        aria-label={`${view} view`}
      >
        {view === 'grid' ? <GridIcon size={18} /> : <ListIcon size={18} />}
      </Button>
    ))}
  </header>
);
