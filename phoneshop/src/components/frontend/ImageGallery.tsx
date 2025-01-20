"use client";
import React from "react";
import { useState } from "react";


interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={images[selectedImage]}
          alt="Product"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex space-x-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square w-20 overflow-hidden rounded-lg bg-gray-100 ${
              selectedImage === index ? "ring-2 ring-blue-600" : ""
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};