import { useState } from "react";
import type { Product } from "@/types";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Get all media (images and videos)
  const allMedia = [
    ...(product?.images || []),
    ...(product?.videos || []),
  ];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnail Images/Videos */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
        {allMedia?.map((media, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-gray-100 flex items-center justify-center overflow-hidden hover:border-2 hover:border-gray-300 transition-all ${
              selectedImage === index ? "border-2 border-black" : ""
            }`}
          >
            {media.type?.startsWith("video") ? (
              <video
                src={media.url}
                className="w-full h-full object-cover"
                muted
              />
            ) : (
              <img
                src={media.url}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            )}
          </button>
        ))}
      </div>

      {/* Main Image/Video */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center min-h-[300px] md:min-h-[400px] md:max-h-[400px] overflow-hidden">
        {allMedia.length > 0 ? (
          allMedia[selectedImage]?.type?.startsWith("video") ? (
            <video
              src={allMedia[selectedImage].url}
              controls
              className="w-full max-h-full object-contain"
            />
          ) : (
            <img
              src={allMedia[selectedImage]?.url}
              alt={product.name}
              className="w-full max-h-full object-contain"
            />
          )
        ) : (
          <div className="text-gray-400 text-center">
            <p>No media available</p>
          </div>
        )}
      </div>
    </div>
  );
}