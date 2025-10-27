"use client";
import { useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { getAllProducts } from "@/lib/api/product";
import { getCategories } from "@/lib/api/category";
import type { Product, Category } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import ProductPagination from "@/components/products/ProductPagination";
import ResultsHeader from "@/components/products/ResultsHeader";
import LoadingState from "@/components/products/LoadingState";
import ErrorState from "@/components/products/ErrorState";
import NoResults from "@/components/products/NoResults";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function ProductListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    page: 1,
    search: "",
    selectedCategory: "" as any,
    sortBy: "createdAt",
    sortOrder: "desc" as "asc" | "desc",
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    inStock: undefined as boolean | undefined,
    secondHand: true
  });

  const [searchInput, setSearchInput] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const limit = 20;

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    run: fetchProducts,
  } = useApi(getAllProducts);

  const {
    data: categories,
    loading: categoriesLoading,
    run: fetchCategories,
  } = useApi(getCategories);

  // Initialize categories and read URL params on mount
  useEffect(() => {
    fetchCategories();

    const params = Object.fromEntries(searchParams.entries());

    setFilters(prev => ({
      ...prev,
      page: Number(params.page) || 1,
      search: params.search || "",
      selectedCategory: params.category || "",
      sortBy: params.sortBy || "createdAt",
      sortOrder: (params.sortOrder as "asc" | "desc") || "desc",
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      inStock: params.inStock ? params.inStock === "true" : undefined,
    }));

    setSearchInput(params.search || "");
    setIsInitialLoad(false);
  }, []);

  // Fetch products when filters change (excluding initial mount)
  useEffect(() => {
    if (isInitialLoad) return;

    const fetchData = async () => {
      await fetchProducts({
        page: filters.page,
        limit,
        search: filters.search,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        category: filters.selectedCategory,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        inStock: filters.inStock,
        secondHand: true
      });
    };

    fetchData();
  }, [filters, isInitialLoad]);

  // Update URL when filters change (excluding initial mount)
  useEffect(() => {
    if (isInitialLoad) return;

    const query = new URLSearchParams();

    if (filters.page && filters.page !== 1) query.set("page", filters.page.toString());
    if (filters.search) query.set("search", filters.search);
    if (filters.selectedCategory) query.set("category", filters.selectedCategory);
    if (filters.sortBy !== "createdAt") query.set("sortBy", filters.sortBy);
    if (filters.sortOrder !== "desc") query.set("sortOrder", filters.sortOrder);
    if (filters.minPrice) query.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) query.set("maxPrice", filters.maxPrice.toString());
    if (filters.inStock !== undefined) query.set("inStock", filters.inStock.toString());

    const queryString = query.toString();
    const newUrl = queryString ? `?${queryString}` : '';

    // Use replace instead of push to avoid adding to browser history for every filter change
    router.replace(newUrl, { scroll: false });
  }, [filters, isInitialLoad, router]);

  const updateFilter = useCallback((key: keyof typeof filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      // Reset to page 1 only for filter changes, not for page changes
      page: key !== 'page' ? 1 : value
    }));
  }, []);

  const handleSearch = useCallback(() => {
    updateFilter("search", searchInput);
  }, [searchInput, updateFilter]);

  const clearFilters = useCallback(() => {
    setFilters({
      page: 1,
      search: "",
      selectedCategory: "",
      sortBy: "createdAt",
      sortOrder: "desc",
      minPrice: undefined,
      maxPrice: undefined,
      inStock: undefined,
      secondHand: true,
    });
    setSearchInput("");
  }, []);

  const handlePageChange = useCallback((page: number) => {
    updateFilter("page", page);
  }, [updateFilter]);

  const products = productsData?.data || [];
  const total = productsData?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-darkBackground">
      <Navbar show={false}/>
      <div className="min-h-screen text-white relative">

        <div className="bg-primary-300 md:w-[50dvh] md:h-[50dvh] w-[40dvh] h-[40dvh] fixed rounded-full opacity-50 blur-[170px] md:top-1/4 top-1/3 md:right-1/4" />
        <div className="bg-primary-300 w-48 h-48 fixed rounded-full opacity-50 blur-[150px] -top-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-5">
          {/* Filters */}
          <ProductFilters
            filters={filters}
            searchInput={searchInput}
            categories={categories || []}
            categoriesLoading={categoriesLoading}
            onFilterChange={updateFilter}
            onSearchInputChange={setSearchInput}
            onSearch={handleSearch}
            onClearFilters={clearFilters}
          />

          {/* Results Count */}
          <ResultsHeader
            showing={products.length}
            total={total}
            currentPage={filters.page}
            limit={limit}
          />

          {/* Loading State */}
          {productsLoading && <LoadingState />}

          {/* Error State */}
          {(!productsLoading && productsError) && <ErrorState />}

          {/* Products Grid */}
          {!productsLoading && products.length > 0 && (
            <ProductGrid products={products} />
          )}

          {/* No Results */}
          {!productsLoading && products.length === 0 && <NoResults />}

          {/* Pagination */}
          {totalPages > 1 && !productsLoading && (
            <ProductPagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}