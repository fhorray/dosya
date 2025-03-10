import React from 'react';
import { Button } from '../ui/button';
import { useDosya } from '@/store';
import { UploadIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type IUploadeFileButtonProps = {
  children?: React.ReactNode;
  className?: string;
};

export const UploadFileButton = ({
  children,
  className,
  ...props
}: IUploadeFileButtonProps) => {
  const { uploader } = useDosya();
  return (
    <Button className={cn('w-full', className)} onClick={uploader.toggle}>
      {children || (
        <>
          <UploadIcon />
          Upload File
        </>
      )}
    </Button>
  );
};
