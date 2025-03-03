import { cn } from '@/lib/utils';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex gap-2 items-center justify-center whitespace-nowrap p-2 px-4 cursor-pointer text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md border-2 border-gray-200 bg-gray-200 hover:bg-gray-300 text-black',
        className,
      )}
    >
      {children}
    </button>
  );
};
