import Link from "next/link";
import type { Product } from "@/types";
import { ShoppingCart, Ban } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  addingToCart: boolean;
}

export default function ProductCard({ product, onAddToCart, addingToCart }: ProductCardProps) {
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="bg-white/5 border border-white/20 rounded-xl backdrop-blur-sm hover:shadow-lg hover:scale-105 transform transition-transform duration-300 overflow-hidden relative">
      <Link href={`/products/${product._id}`}>
        <div className="relative">
          {product.images && product.images[0] ? (
            <img
              src={product.images[0].url}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-500 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {product?.discount! > 0 && (
            <div className="absolute top-2 right-2 bg-red-500/60 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{product.discount}%
            </div>
          )}
          {!product.inStock && (
            <div className="absolute top-2 left-2 bg-black/40 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Out of Stock
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product._id}`} className="flex items-center gap-1">
          <h3 className="font-semibold text-white hover:text-primary-300 transition line-clamp-2 capitalize">
            {product.name}
          </h3>
          {/* <p className="text-sm text-gray-500">- {product.brand}</p> */}
        </Link>


        <div className="flex items-center mb-2 justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                    }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-400 ml-2">
              {product.ratingCount}
            </span>
          </div>


          <button
            onClick={() => onAddToCart(product._id)}
            disabled={!product.inStock || addingToCart}
            className={`w-8 h-6 font-medium flex items-center justify-center transition rounded-full ${product.inStock
                ? "border border-primary-300 text-primary-300 hover:bg-white/20"
                : "bg-gray-400 text-gray-500 cursor-not-allowed"
              }`}
          >
            {addingToCart ? "..." : product.inStock ? <ShoppingCart size={16} /> : <ShoppingCart size={16} />}
            
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {product.discount ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary-300">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}