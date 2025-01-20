import React from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        className={cn(
          "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20",
          error ? "border-red-500" : "border-input",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};