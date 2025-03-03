import { DosyaPreview } from '@/components/dosya-preview';
import { FileUploader } from '@/components/uploader';
import { DosyaPreferences } from '@/store';

export const DosyaProvider = ({
  children,
}: {
  children: React.ReactNode;
  preferences?: DosyaPreferences;
}) => {
  return (
    <>
      {children}
      <FileUploader />
      <DosyaPreview />
    </>
  );
};
