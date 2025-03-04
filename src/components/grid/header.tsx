import { DosyaConfig } from "@/store";
import { GridIcon, ListIcon } from "lucide-react";
import { Breadbrumbs } from "../breadcrumbs";
import { Button } from "../ui/button";

// Component for view mode toggle
export const Header = ({
  currentView,
  setView,
}: {
  currentView: DosyaConfig["defaultView"];
  setView: (value: DosyaConfig["defaultView"]) => void;
}) => {
  return (
    <header className="flex justify-between items-center space-x-2 py-4 border-b-2 border-gray-200 p-4">
      {/* BREADCRUMBS */}
      <Breadbrumbs />

      <div>
        {["grid", "list"].map((view) => (
          <Button
            key={view}
            onClick={() => setView(view as DosyaConfig["defaultView"])}
            className={`p-2 rounded-md ${
              currentView === view
                ? "bg-blue-100 text-blue-600 border-0"
                : "bg-transparent border-0 text-gray-500 hover:bg-gray-100"
            }`}
            aria-label={`${view} view`}
          >
            {view === "grid" ? <GridIcon size={18} /> : <ListIcon size={18} />}
          </Button>
        ))}
      </div>
    </header>
  );
};
