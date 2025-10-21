import React from 'react';
import { ChevronRight } from 'lucide-react'; 

interface CategoryListProps {
  categories: any;
  brandColor: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, brandColor }) => {
  const brandColorClass = `text-[${brandColor}]`; 

  return (
    <nav className="p-4 space-y-3 md:p-0 md:space-y-4">
      {categories?.map((category: any) => (
        <a
          key={category.name}
          href={`/category/${category.name.toLowerCase().replace(/\s/g, '-')}`}
          className="flex items-center text-gray-700 hover:text-gray-900 transition duration-150"
        >
          <span className={`text-xl mr-3 ${brandColorClass}`} style={{ color: brandColor }}>
            {category.icon}
          </span>
          <span className="font-medium">{category.name}</span>
          {category.name === "FURNITURE" && (
            <ChevronRight className="w-5 h-5 ml-auto text-gray-500" />
          )}
        </a>
      ))}
    </nav>
  );
};

export default CategoryList;