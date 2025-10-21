import Link from "next/link";
import { useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { addToCart } from "@/lib/api/cart";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import { useGuestId } from "@/hooks/useGuestId";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { run: add, loading: addingToCart, setLoading } = useApi(addToCart);

  const guestId = useGuestId();
  useEffect(() => {
    setLoading(false)
  }, [])

  const handleAddToCart = async (productId: string) => {
    try {
      await add(productId, 1, guestId);
      alert("Product added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add product to cart");
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 gap-2 mb-8">
      {products?.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={handleAddToCart}
          addingToCart={addingToCart}
        />
      ))}
    </div>
  );
}