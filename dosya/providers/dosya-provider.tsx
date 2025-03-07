import { DosyaPreview } from "@/components/dosya-preview";
import { CreateFolder } from "@/components/modals/create-folder";
import { FileUploader } from "@/components/modals/uploader";
import { Toaster } from "@/components/ui/sonner";
import { useDosya } from "@/store";
import { DosyaConfig, DosyaFolder } from "@/types";
import { useEffect } from "react";

export const DosyaProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config?: DosyaConfig;
  onFolderCreate?: () => void | Promise<void | DosyaFolder | null>;
}) => {
  const { context } = useDosya();
  // useEffect to set config in context
  useEffect(() => {
    context.setConfig({
      baseUrl: config?.baseUrl || "/",
      defaultFolder: config?.defaultFolder || "/",
      defaultView: config?.defaultView || "grid",
    });
    context.config.viewMode.set(config?.defaultView || "grid");
  }, []);

  return (
    <>
      {children}
      <Toaster />
      <FileUploader />
      <DosyaPreview />
    </>
  );
};
