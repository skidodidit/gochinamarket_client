import { useState, useEffect } from 'react';
import { Heart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import type { Product } from "@/types";
import Link from 'next/link';

interface ProductShowcaseProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductShowcase({ products, loading }: ProductShowcaseProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollLeft = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex(prev => Math.min(products.length - 4, prev + 1));
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const slideVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="w-full md:px-10 px-5 max-w-7xl mx-auto py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Skeleton */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="w-48 h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
          </div>

          {/* Countdown Timer Skeleton */}
          <div className="flex items-center gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-12 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                {i < 3 && <div className="w-2 h-2 bg-gray-200 rounded animate-pulse"></div>}
              </div>
            ))}
            
            {/* Navigation Arrows Skeleton */}
            <div className="desktop-visibility flex items-center gap-2 ml-8">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid Skeleton */}
        <motion.div variants={itemVariants} className="relative overflow-hidden mb-12">
          <div className="flex gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="min-w-[calc(100%-1.5rem)] sm:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(25%-1.125rem)] bg-white overflow-hidden"
              >
                {/* Product Image Skeleton */}
                <div className="relative bg-gray-200 h-64 flex items-center justify-center animate-pulse">
                  <div className="absolute top-3 left-3 w-12 h-6 bg-gray-300 rounded"></div>
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  </div>
                </div>

                {/* Product Info Skeleton */}
                <div className="p-4">
                  <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                      ))}
                    </div>
                    <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Button Skeleton */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="w-48 h-12 bg-gray-200 rounded animate-pulse"></div>
        </motion.div>

        {/* Divider Skeleton */}
        <motion.div variants={itemVariants} className="border-t border-gray-200 mt-12"></motion.div>
      </motion.div>
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="w-full md:px-10 px-5 max-w-7xl mx-auto py-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8">
        <div className="mb-6 lg:mb-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-10 bg-primary-300 rounded"></div>
            <span className="text-primary-300 font-semibold">Today's</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-300">Discount Sales</h2>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-4">
          <motion.div variants={slideVariants} className="text-center">
            <div className="text-xs mb-1">Days</div>
            <div className="text-3xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
          </motion.div>
          <motion.div variants={slideVariants} className="text-3xl font-bold text-primary-300">:</motion.div>
          <motion.div variants={slideVariants} className="text-center">
            <div className="text-xs mb-1">Hours</div>
            <div className="text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
          </motion.div>
          <motion.div variants={slideVariants} className="text-3xl font-bold text-primary-300">:</motion.div>
          <motion.div variants={slideVariants} className="text-center">
            <div className="text-xs mb-1">Minutes</div>
            <div className="text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
          </motion.div>
          <motion.div variants={slideVariants} className="text-3xl font-bold text-primary-300">:</motion.div>
          <motion.div variants={slideVariants} className="text-center">
            <div className="text-xs mb-1">Seconds</div>
            <div className="text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
          </motion.div>

          {/* Navigation Arrows */}
          <motion.div variants={itemVariants} className="desktop-visibility flex items-center gap-2 ml-8">
            <button
              onClick={scrollLeft}
              disabled={currentIndex === 0}
              className="w-10 h-10 text-black rounded-full bg-gray-100/40 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              disabled={currentIndex >= products.length - 4}
              className="w-10 h-10 text-black rounded-full bg-gray-100/40 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div variants={itemVariants} className="relative overflow-x-auto overflow-y-hidden mb-12">
        <div
          className="flex md:gap-4 gap-2 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
        >
          {products?.map((product, index) => {
            const discountedPrice = product.discount 
              ? product.price - (product.price * product.discount / 100)
              : product.price;

            return (
              <motion.div
                key={product._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }
                  }
                }}
                className="min-w-[calc(56%-1.5rem)] sm:min-w-[calc(50%-0.75rem)] md:min-w-[calc(20%-1.125rem)] bg-white/5 rounded-xl border border-white/20 backdrop-blur-sm overflow-hidden group"
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Image */}
                <Link href={`/products/${product._id}`} className="relative bg-gray-100 md:h-54 h-42  flex items-center justify-center">
                  {product.discount && product.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500/60 px-3 py-1 rounded text-sm font-semibold">
                      <span className='text-white'>-{product.discount}%</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <Link href={`/products/${product._id}`} className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-primary-300 hover:text-white transition-colors">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                  {product.images?.[0] && (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-sm capitalize">{product.name}</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-primary-300 font-semibold text-lg">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    {product.discount && product.discount > 0 && (
                      <span className="text-gray-400 line-through text-sm">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-lg">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-gray-500 text-sm">({product.ratingCount || 0})</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* View All Products Button */}
      <motion.div variants={itemVariants} className="flex justify-center">
        <Link 
          href={'/products'} 
          className="bg-primary-300 text-black px-12 md:py-4 py-3 rounded-2xl hover:bg-primary-300/60 transition-colors font-medium"
        >
          View All Products
        </Link>
      </motion.div>

      {/* Divider */}
      <motion.div variants={itemVariants} className="border-t border-gray-200/40 mt-12"></motion.div>
    </motion.div>
  );
}