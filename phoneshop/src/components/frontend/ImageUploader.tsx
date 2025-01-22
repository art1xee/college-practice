import React, { useState } from 'react';
import { uploadImage } from '@/lib/cloudinary';

const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    try {
      const url = await uploadImage(file);
      setImageUrl(url);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to upload image');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
