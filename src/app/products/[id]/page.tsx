"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApi } from "@/hooks/useApi";
import { getProductById, getAllProducts } from "@/lib/api/product";
import type { Product } from "@/types";
import ProductLoading from "@/components/products/id/ProductLoading";
import ProductError from "@/components/products/id/ProductError";
import ProductBreadcrumb from "@/components/products/id/ProductBreadcrumb";
import ProductGallery from "@/components/products/id/ProductGallery";
import ProductInfo from "@/components/products/id/ProductInfo";
import RelatedProducts from "@/components/products/id/RelatedProducts";

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params?.id as string;

  const [quantity, setQuantity] = useState(1);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const {
    data: product,
    loading: productLoading,
    error: productError,
    run: fetchProduct,
  } = useApi(getProductById);

  const {
    data: relatedProductsData,
    loading: relatedLoading,
    run: fetchRelatedProducts,
  } = useApi(getAllProducts);

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  useEffect(() => {
    if (product?.category) {
      fetchRelatedProducts({
        category: product.category,
        limit: 4,
      });
    }
  }, [product?.category]);

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const relatedProducts = relatedProductsData?.data?.filter(
    (p: Product) => p._id !== productId
  ) || [];

  if (productLoading) {
    return <ProductLoading />;
  }

  if (productError || !product) {
    return <ProductError />;
  }

  return (
    <>
      <Navbar />
      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8 text-black">
        <ProductBreadcrumb productName={product.name} />

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <ProductGallery product={product} />
          <ProductInfo
            product={product}
            quantity={quantity}
            favorites={favorites}
            onDecreaseQuantity={decreaseQuantity}
            onIncreaseQuantity={increaseQuantity}
            onToggleFavorite={toggleFavorite}
          />
        </div>

        {/* Related Products */}
        <div className="border-t border-gray-200 pt-6">
          {relatedProducts.length > 0 && (
            <RelatedProducts
              products={relatedProducts}
              loading={relatedLoading}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
