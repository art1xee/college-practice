import React from "react";
import { Plus } from "lucide-react";

interface ImageUploadProps {
  onImageSelect: (files: FileList) => void;
  previews: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, previews }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onImageSelect(e.target.files);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Plus className="w-8 h-8 mb-2 text-gray-400" />
          <p className="text-sm text-gray-500">Додати фото</p>
        </div>
        <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" multiple />
      </label>
      
      {previews.map((preview, index) => (
        <div key={index} className="relative w-full h-32">
          <img
            src={preview}
            alt={`Preview ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};