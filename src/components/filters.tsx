import { useDosya } from "@/store";
import { SearchIcon } from "lucide-react";

export const Filters = () => {
  const { filters } = useDosya();

  return (
    <div className="w-full flex items-center  gap-4 p-4">
      {/* SEARCH */}
      <div className="relative w-full max-w-[30%]">
        <input
          type="text"
          placeholder="Search files..."
          className="w-full p-2 border border-gray-200 rounded-md"
          onChange={(e) => {
            if (e.target.value === "") {
              filters.reset();
            }

            filters.setSearch({
              name: e.target.value,
            });
          }}
        />

        <SearchIcon className="absolute right-2 top-2 text-gray-400" />
      </div>

      {/* SIZE */}
      <div className="relative w-full max-w-[30%]">
        <input
          type="number"
          placeholder="5 (MB)"
          className="w-full p-2 border border-gray-200 rounded-md"
          onChange={(e) => {
            if (e.target.value === "") {
              filters.reset();
            }

            filters.setSearch({
              size: e.target.value,
            });
          }}
        />

        <SearchIcon className="absolute right-2 top-2 text-gray-400" />
      </div>
    </div>
  );
};
