import type { Category } from "@/types";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

interface ProductFiltersProps {
  filters: {
    selectedCategory: any;
    sortBy: string;
    sortOrder: "asc" | "desc";
    minPrice: number | undefined;
    maxPrice: number | undefined;
    inStock: boolean | undefined;
  };
  searchInput: string;
  categories: Category[];
  categoriesLoading: boolean;
  onFilterChange: any;
  onSearchInputChange: (value: string) => void;
  onSearch: any;
  onClearFilters: () => void;
}

export default function ProductFilters({
  filters,
  searchInput,
  categories,
  categoriesLoading,
  onFilterChange,
  onSearchInputChange,
  onSearch,
  onClearFilters,
}: ProductFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const hasActiveFilters =
    filters.selectedCategory ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.inStock !== undefined;

  const handleSortChange = (value: string) => {
    const [field, order] = value.split("-");
    onFilterChange("sortBy", field);
    onFilterChange("sortOrder", order);
  };

  const handlePriceFilter = () => {
    onFilterChange("minPrice", filters.minPrice);
    onFilterChange("maxPrice", filters.maxPrice);
  };

  const activeFilterCount = [
    filters.selectedCategory,
    filters.minPrice,
    filters.maxPrice,
    filters.inStock !== undefined
  ].filter(Boolean).length;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/5 md:p-2 p-1 mb-6 shadow-sm md:mt-0 -mt-4">
      {/* Mobile: Search and Filter Button Only */}
      <div className="flex items-center gap-3 lg:hidden">
        {/* Search - Takes most space */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => onSearchInputChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSearch()}
              className="w-full pl-2 pr-4 py-2.5 bg-white/5 border-0 rounded-lg outline-none focus:ring-1 focus:ring-primary-300 transition-all text-sm"
            />
            <button 
              onClick={onSearch} 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-black bg-primary-300 rounded-lg p-2"
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-lg hover:bg-primary-300/60 transition-colors flex-shrink-0"
        >
          <Filter className="w-4 h-4" />
          {activeFilterCount > 0 && (
            <span className="bg-primary-300 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Layout */}
      <div className="desktop-visibility lg:flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search */}
        <div className="flex-1 w-full md:max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => onSearchInputChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSearch()}
              className="w-full pl-2 pr-4 py-2.5 bg-white/5 border-0 rounded-lg outline-none focus:ring-1 focus:ring-primary-300 transition-all"
            />
            <button onClick={onSearch} className="absolute right-1 top-1/2 transform -translate-y-1/2 text-black bg-primary-300 rounded-lg p-2">
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Sort */}
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => handleSortChange(e.target.value)}
            className="flex-1 lg:flex-none px-3 py-2.5 bg-white/5 border-0 rounded-lg outline-none focus:ring-1 focus:ring-primary-300 transition-all"
          >
            <option value="createdAt-desc">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Top Rated</option>
          </select>

          {/* Category */}
          <select
            value={filters.selectedCategory}
            onChange={(e) => onFilterChange("selectedCategory", e.target.value)}
            className="px-3 py-2.5 bg-white/5 border-0 rounded-lg outline-none focus:ring-1 focus:ring-primary-300 transition-all min-w-[140px]"
            disabled={categoriesLoading}
          >
            <option value="">All Categories</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={filters.inStock === undefined ? "" : filters.inStock ? "true" : "false"}
            onChange={(e) =>
              onFilterChange("inStock", e.target.value === "" ? undefined : e.target.value === "true")
            }
            className="px-3 py-2.5 bg-white/5 border-0 rounded-lg outline-none focus:ring-1 focus:ring-primary-300 transition-all"
          >
            <option value="">All Stock</option>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>

          {/* Price Inputs */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min $"
              value={filters.minPrice || ""}
              onChange={(e) =>
                onFilterChange("minPrice", e.target.value ? Number(e.target.value) : undefined)
              }
              onBlur={handlePriceFilter}
              className="w-20 px-3 py-2.5 bg-white/5 border-0 rounded-lg outline-none focus:ring-1 focus:ring-primary-300 transition-all text-sm"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max $"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                onFilterChange("maxPrice", e.target.value ? Number(e.target.value) : undefined)
              }
              onBlur={handlePriceFilter}
              className="w-20 px-3 py-2.5 bg-white/5 border-0 rounded-lg outline-none focus:ring-1 focus:ring-primary-300 transition-all text-sm"
            />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 px-3 py-2.5 text-primary-300 hover:text-gray-700 transition-colors text-sm"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filter Panel - Shows when expanded */}
      {showMobileFilters && (
        <div className="lg:hidden mt-4 pt-4 border-t border-white/10">
          <div className="space-y-4">
            {/* Sort Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border-0 rounded-lg outline-none focus:ring-1 focus:ring-primary-300 transition-all text-sm"
              >
                <option value="createdAt-desc">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Top Rated</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={filters.selectedCategory}
                onChange={(e) => onFilterChange("selectedCategory", e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border-0 rounded-lg outline-none focus:ring-1 focus:ring-primary-300 transition-all text-sm"
                disabled={categoriesLoading}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Stock Status
              </label>
              <select
                value={filters.inStock === undefined ? "" : filters.inStock ? "true" : "false"}
                onChange={(e) =>
                  onFilterChange("inStock", e.target.value === "" ? undefined : e.target.value === "true")
                }
                className="w-full px-3 py-2 bg-white/5 border-0 rounded-lg outline-none focus:ring-1 focus:ring-primary-300 transition-all text-sm"
              >
                <option value="">All Stock</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min $"
                  value={filters.minPrice || ""}
                  onChange={(e) =>
                    onFilterChange("minPrice", e.target.value ? Number(e.target.value) : undefined)
                  }
                  onBlur={handlePriceFilter}
                  className="flex-1 px-3 py-2 bg-white/5 border-0 rounded-lg outline-none focus:ring-1 focus:ring-primary-300 transition-all text-sm"
                />
                <span className="text-gray-400 text-sm">to</span>
                <input
                  type="number"
                  placeholder="Max $"
                  value={filters.maxPrice || ""}
                  onChange={(e) =>
                    onFilterChange("maxPrice", e.target.value ? Number(e.target.value) : undefined)
                  }
                  onBlur={handlePriceFilter}
                  className="flex-1 px-3 py-2 bg-white/5 border-0 rounded-lg outline-none focus:ring-1 focus:ring-primary-300 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Mobile Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-300">
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
              </span>
              <button
                onClick={onClearFilters}
                className="flex items-center gap-1 px-3 py-2 text-primary-300 hover:text-primary-400 transition-colors text-sm font-medium"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Badge */}
      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-300">Active filters:</span>
            {filters.selectedCategory && (
              <span className="bg-primary-300/20 text-primary-300 px-2 py-1 rounded text-xs">
                {categories.find(c => c._id === filters.selectedCategory)?.name}
              </span>
            )}
            {filters.inStock !== undefined && (
              <span className="bg-primary-300/20 text-primary-300 px-2 py-1 rounded text-xs">
                {filters.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="bg-primary-300/20 text-primary-300 px-2 py-1 rounded text-xs">
                ${filters.minPrice || 0} - ${filters.maxPrice || '∞'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}