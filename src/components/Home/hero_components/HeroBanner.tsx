// components/HeroBannerItem.tsx
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // For shop now button navigation

interface HeroBannerItemProps {
  product: any;
  brandColor: string;
  isLargeMobileBanner?: boolean;
}

const HeroBannerItem: React.FC<HeroBannerItemProps> = ({ product, brandColor, isLargeMobileBanner = false }) => {
  const router = useRouter();
  const shopNowHandler = () => {
    // Navigate to the product details page
    router.push(`/product/${product._id}`);
  };

  const brandBgClass = `bg-[${brandColor}] hover:bg-opacity-90`;

  // Determine image source - using the first image in the array
  const imageUrl = product.images[0]?.url || 'placeholder.jpg';
  const imageAlt = product.images[0]?.alt || product.name;

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-lg shadow-lg ${isLargeMobileBanner ? 'h-64 sm:h-auto' : 'h-full min-h-[150px]'}`}>
      <Image
        src={imageUrl}
        alt={imageAlt}
        layout="fill"
        objectFit="cover"
        className="transition duration-500 ease-in-out hover:scale-105"
        priority={true} // Priority for the hero section images
      />
      <div className={`absolute inset-0 ${isLargeMobileBanner ? 'bg-black bg-opacity-30' : 'bg-black bg-opacity-10'}`}></div>

      {/* Banner Text Overlay for the large mobile banner / top desktop banner */}
      {product.bannerText && (
        <div className={`absolute p-6 ${isLargeMobileBanner ? 'bottom-0 left-0 text-white' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-lg'}`}>
          <h2 className="text-2xl md:text-4xl font-extrabold leading-tight drop-shadow-lg text-white">
            UNBEATABLE DEALS ON EVERYTHING!
          </h2>
          <p className="mt-2 text-sm text-gray-100 drop-shadow-md hidden md:block">
            Find the perfect item for your home, office, or outdoor adventures.
          </p>
        </div>
      )}

      {/* Shop Now Button */}
      <button
        onClick={shopNowHandler}
        className={`absolute bottom-4 left-4 z-10 px-6 py-2 text-white font-semibold rounded-full transition duration-300 transform hover:scale-105 ${brandBgClass}`}
        style={{ backgroundColor: brandColor }}
      >
        SHOP NOW
      </button>
    </div>
  );
};

export default HeroBannerItem;