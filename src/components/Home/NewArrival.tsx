"use client";
import { Product } from '@/types';
import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

interface NewArrivalProps {
  products: Product[];
  loading?: boolean;
}

const NewArrival = ({ products, loading }: NewArrivalProps) => {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15, 
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-5 md:px-10 py-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Header */}
      <motion.div variants={cardVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-10 bg-primary-300 rounded"></div>
          <span className="text-primary-300 font-semibold">Featured</span>
        </div>
        <h2 className="text-4xl font-bold text-primary-300 mb-2">New Arrival</h2>
      </motion.div>

      {/* Grid Layout */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        {/* Featured Product - Large Card */}
        <motion.div variants={cardVariants} className="lg:col-span-2 lg:row-span-2">
          <div className="relative bg-white/5 rounded-xl border border-white/20 overflow-hidden h-full min-h-[400px] lg:min-h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img 
              src={`${products[0]?.images[0]?.url}`} 
              alt={products[0]?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2 capitalize">{products[0]?.name}</h3>
              <p className="text-gray-200 mb-4 text-sm lg:text-base">{products[0]?.description}</p>
              <Link href={`/products/${products[0]?._id}`} className="text-white underline underline-offset-4 hover:text-gray-300 transition-colors font-medium">
                Shop Now
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 2nd Product */}
        <motion.div variants={cardVariants} className="lg:col-span-2">
          <div className="relative bg-white/5 rounded-xl border border-white/20 overflow-hidden h-full min-h-[280px]">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
            <img 
              src={`${products[1]?.images[0]?.url}`} 
              alt={products[1]?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
              <h3 className="text-xl lg:text-2xl font-bold mb-2 capitalize">{products[1]?.name}</h3>
              <p className="text-gray-200 mb-4 text-sm">{products[1]?.description}</p>
              <Link href={`/products/${products[1]?._id}`} className="text-white underline underline-offset-4 hover:text-gray-300 transition-colors font-medium">
                Shop Now
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Speakers */}
        <motion.div variants={cardVariants} className="lg:col-span-1">
          <div className="relative bg-white/5 rounded-xl border border-white/20 overflow-hidden h-full min-h-[280px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img 
              src={`${products[2]?.images[0]?.url}`}  
              alt={products[2]?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
              <h3 className="text-lg lg:text-xl font-bold mb-2 capitalize">{products[2]?.name}</h3>
              <p className="text-gray-200 mb-4 text-xs lg:text-sm">{products[2]?.description}</p>
              <Link href={`/products/${products[2]?._id}`} className="text-white underline underline-offset-4 hover:text-gray-300 transition-colors font-medium text-sm">
                Shop Now
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Perfume */}
        <motion.div variants={cardVariants} className="lg:col-span-1">
          <div className="relative bg-white/5 rounded-xl border border-white/20 overflow-hidden h-full min-h-[280px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img 
              src={`${products[3]?.images[0]?.url}`} 
              alt={products[3]?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
              <h3 className="text-lg lg:text-xl font-bold mb-2 capitalize">{products[3]?.name}</h3>
              <p className="text-gray-200 mb-4 text-xs lg:text-sm">{products[3]?.description}</p>
              <Link href={`/products/${products[3]?._id}`} className="text-white underline underline-offset-4 hover:text-gray-300 transition-colors font-medium text-sm">
                Shop Now
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NewArrival;
