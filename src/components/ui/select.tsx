import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: {
    label: string;
    value: string;
  }[];
};

export const Select = ({ options, className, ...props }: SelectProps) => {
  console.log(options);
  return (
    <select
      className={`w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 hover:bg-gray-50 transition-all ${className}`}
      aria-label="Select an option"
      {...props}
    >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
