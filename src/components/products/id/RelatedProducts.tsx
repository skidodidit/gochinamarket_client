import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import type { Product } from "@/types";
import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";

interface RelatedProductsProps {
  products: Product[];
  loading: boolean;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export default function RelatedProducts({
  products,
  loading,
  favorites,
  onToggleFavorite,
}: RelatedProductsProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="mb-16 pt-10">
      <SectionHeader title="Related Items" />

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
        {products?.map((product) => (
          <RelatedProductCard
            key={product._id}
            product={product}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-5 h-10 bg-primary-300 rounded"></div>
      <span className="text-primary-300 font-semibold text-lg">{title}</span>
    </div>
  );
}

interface RelatedProductCardProps {
  product: Product;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

function RelatedProductCard({ product, favorites, onToggleFavorite }: RelatedProductCardProps) {
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="group bg-white/5 border border-white/20 rounded-xl backdrop-blur-sm hover:shadow-lg hover:scale-105 transform transition-transform duration-300 overflow-hidden relative">
      <div className="relative bg-gray-100 mb-4 flex items-center justify-center h-54 overflow-hidden">
        {product.discount! > 0 && (
          <div className="bg-red-500/60 absolute top-3 left-3 text-xs font-semibold px-3 py-1 z-10">
            <span className="text-white">
              -{product.discount}%
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <FavoriteButton
            productId={product._id}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
          <ViewButton productId={product._id} />
        </div>

        <Link href={`/products/${product._id}`} className="w-full h-full flex items-center justify-center">
          {product.images && product.images[0] ? (
            <img
              src={product.images[0].url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400">No image</div>
          )}
        </Link>
      </div>

      <ProductCardInfo
        product={product}
        discountedPrice={discountedPrice}
      />
    </div>
  );
}

function FavoriteButton({ productId, favorites, onToggleFavorite }: { productId: string; favorites: Set<string>; onToggleFavorite: (id: string) => void }) {
  return (
    <button
      onClick={() => onToggleFavorite(productId)}
      className="p-2 bg-white rounded-full hover:bg-red-500 hover:text-white transition-colors"
    >
      <Heart
        className="w-5 h-5"
        fill={favorites.has(productId) ? "currentColor" : "none"}
      />
    </button>
  );
}

function ViewButton({ productId }: { productId: string }) {
  return (
    <Link href={`/products/${productId}`}>
      <button className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors">
        <Eye className="w-5 h-5" />
      </button>
    </Link>
  );
}

function ProductCardInfo({ product, discountedPrice }: { product: Product; discountedPrice: number }) {
  return (
    <div className="px-4 pb-5">
      <Link href={`/products/${product._id}`}>
        <h3 className="font-semibold mb-2 text-white transition line-clamp-2">
          {product.name}
        </h3>
      </Link>

      <ProductPrice
        price={product.price}
        discount={product.discount}
        discountedPrice={discountedPrice}
        size="small"
      />

      <ProductRating
        rating={product.rating}
        reviews={product.ratingCount}
        inStock={product.inStock}
        size="small"
      />
    </div>
  );
}