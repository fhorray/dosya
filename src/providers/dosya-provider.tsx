import { DosyaPreview } from "@/components/dosya-preview";
import { CreateFolder } from "@/components/modals/create-folder";
import { FileUploader } from "@/components/modals/uploader";
import { useDosya } from "@/store";
import { DosyaConfig } from "@/types";
import { useEffect } from "react";

export const DosyaProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config?: DosyaConfig;
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
      <FileUploader />
      <CreateFolder />
      <DosyaPreview />
    </>
  );
};
