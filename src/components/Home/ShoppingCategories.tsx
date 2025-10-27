"use client";
import { useState } from "react";
import { Category } from "@/types";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCategoryIcon } from "@/constants/categoryIcon";
import { motion, Variants } from "framer-motion";

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCategoryClick = (category: Category) => {
    router.push(`/products?category=${encodeURIComponent(category.name)}`);
  };

  const scrollLeft = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex(prev => Math.min(categories.length - 6, prev + 1));
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1, // delay between each card
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="w-full max-w-7xl mx-auto md:px-10 px-5 py-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // triggers when 20% in view
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-8 bg-primary-300 rounded"></div>
        <span className="text-primary-300 font-medium">Categories</span>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-300">
          Browse By Category
        </h2>
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-gray-100/40 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollRight}
            disabled={currentIndex >= categories.length - 6}
            className="p-2 rounded-full bg-gray-100/40 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Category Cards */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
        variants={containerVariants}
      >
        {categories?.map((category) => {
          const Icon = getCategoryIcon(category.name);

          return (
            <motion.div
              key={category._id}
              variants={itemVariants}
              onClick={() => handleCategoryClick(category)}
              className="flex flex-col items-center justify-center py-6 px-4 cursor-pointer transition-all duration-300 bg-white/5 border border-white/20 backdrop-blur-sm rounded-xl hover:border-primary-300 hover:shadow-md"
            >
              <div className="text-3xl mb-3 transition-transform duration-300 hover:scale-110">
                <Icon className="w-6 h-6 text-primary-300" />
              </div>
              <span className="font-medium text-sm text-center capitalize">
                {category.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
