import { useDosya } from "@/store";
import { UploadIcon } from "lucide-react";
import { DosyaTree } from "../dosya-tree";
import { Button } from "../ui/button";

export const DosyaSidebar = () => {
  const { context, uploader } = useDosya();

  return (
    <aside className="w-full max-w-[20%] border-r-2 border-gray-200 p-4 h-screen overflow-y-auto fixed bg-white space-y-4">
      {/* ERROR */}
      {context.error.message && (
        <div className="bg-red-500 text-white p-2 rounded">
          {context.error.message}
        </div>
      )}

      <Button
        className="w-full rounded-md bg-blue-400 text-white"
        onClick={() => {
          uploader.toggle();
        }}
      >
        <UploadIcon />
        Upload File
      </Button>
      <DosyaTree />
    </aside>
  );
};
