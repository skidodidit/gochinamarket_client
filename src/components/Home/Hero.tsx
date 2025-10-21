import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product, Category } from "@/types";
import { useRouter } from 'next/navigation';
import { SkeletonLoader } from './hero_components/SkeletonLoader';
import { getCategoryIcon } from "@/constants/categoryIcon";

interface HeroSectionProps {
  bannerProducts: Product[];
  categories: Category[];
  loading?: boolean;
}

const HeroSection = ({ bannerProducts, categories, loading }: HeroSectionProps) => {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  // Main banner product (first in list)
  const mainBannerProduct = bannerProducts[0];

  // Grid products (second and third in list)
  const gridProducts = bannerProducts.slice(1, 3);

  // Carousel products (rest of the products)
  const carouselProducts = bannerProducts.slice(3);

  useEffect(() => {
    if (carouselProducts.length > 1 && !loading) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselProducts.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [carouselProducts.length, loading]);

  const handleShopNow = (productId: string) => {
    console.log(`Navigate to product: ${productId}`);
    router.push(`/products/${productId}`)
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length);
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  const handleCategoryClick = (category: any) => {
    const categoryParam = category.name;
    router.push(`/products?category=${encodeURIComponent(categoryParam)}`);
  };

  return (
    <div className="w-full bg-gray-50 py-4 md:py-8 md:px-10">
      <div className="max-w-7xl mx-auto px-5">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Main Banner */}
          <motion.div
            className="relative h-[20dvh] overflow-hidden mb-4 bg-gradient-to-r from-gray-500 to-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 flex flex-col justify-center px-5 z-10">
              <motion.h1
                className="text-lg font-bold text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {mainBannerProduct?.bannerText || "UNBEATABLE DEALS ON EVERYTHING!"}
              </motion.h1>
              <motion.p
                className="text-white text-xs mb-2 drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Furniture, Gadgets, Electronics & More
              </motion.p>
              <motion.button
                onClick={() => mainBannerProduct && handleShopNow(mainBannerProduct._id)}
                className="bg-cyan-400 hover:bg-cyan-500 text-xs text-black py-1.5 px-5 w-fit transition-colors"
                style={{ backgroundColor: '#30d9dc' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SHOP NOW
              </motion.button>
            </div>
            {mainBannerProduct?.images?.[0] && (
              <img
                src={mainBannerProduct.images[0].url}
                alt={mainBannerProduct.name}
                className="w-full h-full object-cover opacity-70"
              />
            )}
          </motion.div>

          {/* Product Grid - 2x2 layout */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Grid Products */}
            {gridProducts?.map((product, idx) => (
              <motion.div
                key={product._id}
                className="relative h-36 overflow-hidden bg-gray-200 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleShopNow(product._id)}
              >
                {product.images?.[0] && (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-3">
                  {/* <h3 className="text-white font-semibold text-sm mb-2 capitalize">{product.name}</h3>
                  <motion.button
                    onClick={() => handleShopNow(product._id)}
                    className="bg-cyan-400 hover:bg-cyan-500 text-black text-xs font-semibold py-1.5 px-4 transition-colors w-fit"
                    style={{ backgroundColor: '#30d9dc' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    SHOP NOW
                  </motion.button> */}
                </div>
              </motion.div>
            ))}

            {/* Categories */}
            <motion.div
              className="bg-white overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {categories.slice(0, 4).map((category, index) => {
                const Icon = getCategoryIcon(category.name);
                return (
                  <motion.div
                    key={category._id}
                    onClick={() => handleCategoryClick(category)}
                    className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors ${index !== 3 ? 'border-b border-gray-100' : ''
                      }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.4 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(48, 217, 220, 0.05)" }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-5.5 h-5.5 flex items-center justify-center"
                        style={{ backgroundColor: '#30d9dc20' }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <span className="text-base text-primary-300">
                          <Icon className="w-6 h-6" />
                        </span>
                      </motion.div>
                      <span className="font-medium text-gray-700 text-sm capitalize">{category.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </motion.div>
                )

              })}
            </motion.div>

            {/* Carousel */}
            {carouselProducts.length > 0 && (
              <motion.div
                className="relative h-48 overflow-hidden bg-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    variants={carouselVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    {carouselProducts[currentSlide]?.images?.[0] && (
                      <img
                        src={carouselProducts[currentSlide].images[0].url}
                        alt={carouselProducts[currentSlide].name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-3"
                      onClick={() => handleShopNow(carouselProducts[currentSlide]._id)}
                    >
                      {/* <h3 className="text-white font-semibold text-sm mb-2">
                        {carouselProducts[currentSlide]?.name}
                      </h3>
                      <motion.button
                        onClick={() => handleShopNow(carouselProducts[currentSlide]._id)}
                        className="bg-cyan-400 hover:bg-cyan-500 text-black text-xs py-1.5 px-4 transition-colors w-fit"
                        style={{ backgroundColor: '#30d9dc' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        SHOP NOW
                      </motion.button> */}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {carouselProducts.length > 1 && (
                  <>
                    <motion.button
                      onClick={prevSlide}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={nextSlide}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="desktop-visibility flex gap-6">
          {/* Categories Sidebar */}
          <motion.div
            className="w-64 flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white overflow-y-auto">
              {categories?.map((category, index) => {
                const Icon = getCategoryIcon(category.name);
                return (
                  <motion.div
                    key={category._id}
                    onClick={() => handleCategoryClick(category)}
                    className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${index !== categories.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{
                      x: 8,
                      backgroundColor: "rgba(48, 217, 220, 0.05)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-11 h-11 flex items-center justify-center"
                        style={{ backgroundColor: '#30d9dc16' }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <span className="text-2xl text-primary-300">
                          <Icon className="w-6 h-6"/>
                        </span>
                      </motion.div>
                      <span className="font-medium text-gray-700 capitalize">{category.name}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 items-center justify-between flex">
            <div className='w-[68%]'>
              {/* Main Banner */}
              <motion.div
                className="relative h-80 overflow-hidden mb-6 bg-gradient-to-r from-gray-800 to-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 flex flex-col justify-center px-12 z-10">
                  <motion.h1
                    className="text-5xl font-bold text-white mb-3 drop-shadow-lg"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mainBannerProduct?.bannerText || "UNBEATABLE DEALS ON EVERYTHING!"}
                  </motion.h1>
                  <motion.p
                    className="text-white text-lg mb-6 drop-shadow-md"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Furniture, Gadgets, Electronics & More
                  </motion.p>
                  <motion.button
                    onClick={() => mainBannerProduct && handleShopNow(mainBannerProduct._id)}
                    className="bg-cyan-400 hover:bg-cyan-500 font-semibold text-black py-3 px-8 w-fit transition-colors"
                    style={{ backgroundColor: '#30d9dc' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    SHOP NOW
                  </motion.button>
                </div>
                {mainBannerProduct?.images?.[0] && (
                  <img
                    src={mainBannerProduct.images[0].url}
                    alt={mainBannerProduct.name}
                    className="w-full h-full object-cover opacity-40"
                  />
                )}
              </motion.div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 gap-4">
                {gridProducts?.map((product, index) => (
                  <motion.div
                    key={product._id}
                    className="relative h-64 overflow-hidden bg-gray-200 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {product.images?.[0] && (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4"
                      onClick={() => handleShopNow(product._id)}
                    >
                      {/* <h3 className="text-white font-semibold text-lg mb-3">{product.name}</h3>
                      <motion.button
                        onClick={() => handleShopNow(product._id)}
                        className="bg-cyan-400 hover:bg-cyan-500 text-black py-2 px-6 transition-colors w-fit"
                        style={{ backgroundColor: '#30d9dc' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        SHOP NOW
                      </motion.button> */}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Carousel */}
            {carouselProducts?.length > 0 && (
              <motion.div
                className="relative h-full w-[30%] overflow-hidden bg-gray-200"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    variants={carouselVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    {carouselProducts[currentSlide]?.images?.[0] && (
                      <img
                        src={carouselProducts[currentSlide].images[0].url}
                        alt={carouselProducts[currentSlide].name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4"
                      onClick={() => handleShopNow(carouselProducts[currentSlide]._id)}
                    >
                      {/* <h3 className="text-white font-semibold text-lg mb-3">
                        {carouselProducts[currentSlide]?.name}
                      </h3>
                      <motion.button
                        onClick={() => handleShopNow(carouselProducts[currentSlide]._id)}
                        className="bg-cyan-400 hover:bg-cyan-500 text-black py-2 px-6 transition-colors w-fit"
                        style={{ backgroundColor: '#30d9dc' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        SHOP NOW
                      </motion.button> */}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {carouselProducts.length > 1 && (
                  <>
                    <motion.button
                      onClick={prevSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={nextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;