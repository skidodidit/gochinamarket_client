// components/HeroCarousel.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
  products: any;
  brandColor: string;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ products, brandColor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  if (products.length === 0) return null;

  const currentProduct = products[currentIndex];
  const totalProducts = products.length;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalProducts - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalProducts - 1 : prev - 1));
  };

  const shopNowHandler = () => {
    router.push(`/product/${currentProduct._id}`);
  };

  const brandBgClass = `bg-[${brandColor}] hover:bg-opacity-90`;

  // Auto-advance the carousel (optional feature)
  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, totalProducts]);

  const imageUrl = currentProduct.images[0]?.url || 'placeholder.jpg';
  const imageAlt = currentProduct.images[0]?.alt || currentProduct.name;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
      <div className="w-full h-full">
        <Image
          key={currentProduct._id} // Key ensures the image re-renders/transitions
          src={imageUrl}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-500 ease-in-out opacity-100"
          priority={false} // Can be false as it's not the primary hero image
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        {/* Carousel Controls */}
        <button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full z-20 hover:bg-opacity-70 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full z-20 hover:bg-opacity-70 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Shop Now Button and Dots */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center">
            <button
              onClick={shopNowHandler}
              className={`px-6 py-2 text-white font-semibold rounded-full transition duration-300 transform hover:scale-105 ${brandBgClass}`}
              style={{ backgroundColor: brandColor }}
            >
              SHOP NOW
            </button>
            <div className="ml-4 flex space-x-2">
              {products.map((_:any, index:any) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition duration-300 ${
                    index === currentIndex ? `bg-white` : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;