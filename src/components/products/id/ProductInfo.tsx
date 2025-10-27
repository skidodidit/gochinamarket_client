import { useState } from "react";
import { Heart, Truck, RotateCcw, Minus, Plus, Shield, Check, Star, Share2 } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { addToCart } from "@/lib/api/cart";
import type { Product } from "@/types";
import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";
import DeliveryInfo from "./DeliveryInfo";
import { useGuestId } from "@/hooks/useGuestId";

interface ProductInfoProps {
  product: Product;
  quantity: number;
  favorites: Set<string>;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
  onToggleFavorite: (id: string) => void;
}

export default function ProductInfo({
  product,
  quantity,
  favorites,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onToggleFavorite,
}: ProductInfoProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const { run: add, loading: addingToCart } = useApi(addToCart);
  const guestId = useGuestId();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await add(product._id, quantity, guestId);
      alert("Product added to cart!");
    } catch (err) {
      alert("Failed to add product to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    window.location.href = "/cart";
  };

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;


  return (
    <div className="space-y-6 text-white">
      {/* Header Section */}
      <div className="border-b border-gray-500 pb-6">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-2xl md:text-3xl font-bold capitalize flex-1">
            {product.name}
          </h1>
          <ShareButton />
        </div>

        {/* Brand and Stock Status */}
        <div className="flex items-center gap-4 mb-3">
          {product.brand && (
            <span className="text-lg text-gray-400 font-medium">{product.brand}</span>
          )}
          <StockStatus inStock={product.inStock} />
        </div>

        {/* Rating and Reviews */}
        <ProductRating
          rating={product.rating}
          reviews={product.ratingCount}
          inStock={product.inStock}
        />
      </div>

      {/* Price Section */}
      <div className="border-b border-gray-500 pb-6">
        <ProductPrice
          price={product.price}
          discount={product.discount}
          discountedPrice={discountedPrice}
        />

        {/* Savings Badge */}
        {product.discount! > 0 && (
          <div className="mt-2">
            <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-sm font-medium">
              Save ${(product.price - discountedPrice).toFixed(2)} ({product.discount}% off)
            </span>
          </div>
        )}
      </div>


      {/* Description */}
      <div className="border-b border-gray-500 pb-6">
        <h3 className="font-semibold text-lg mb-3">Description</h3>
        <p className="text-gray-400 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Quantity and Actions */}
      <div className="border-b border-gray-500 pb-6">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold">Quantity:</span>
            <QuantitySelector
              quantity={quantity}
              disabled={!product.inStock}
              onDecrease={onDecreaseQuantity}
              onIncrease={onIncreaseQuantity}
            />
          </div>

          <div className="text-sm text-gray-600">
            {product.inStock ? `In stock` : "Out of Stock"}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
            className="flex-1 min-w-[200px] bg-primary-300 text-black font-semibold rounded-full px-8 py-4 hover:bg-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAddingToCart ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Adding to Cart...
              </>
            ) : (
              "Add to Cart"
            )}
          </button>

          <button
            onClick={handleBuyNow}
            disabled={!product.inStock || addingToCart}
            className="flex-1 min-w-[200px] bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Buy Now
          </button>

          <FavoriteButton
            productId={product._id}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      </div>

      {/* Delivery & Returns */}
      <div className=" pb-6">
        <DeliveryInfo />
      </div>
    </div>
  );
}

// Enhanced Sub-components
interface QuantitySelectorProps {
  quantity: number;
  disabled: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
}

function QuantitySelector({ quantity, disabled, onDecrease, onIncrease }: QuantitySelectorProps) {
  return (
    <div className="flex items-center border border-gray-300 rounded-full">
      <button
        onClick={onDecrease}
        disabled={disabled || quantity <= 1}
        className="w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed rounded-l-full hover:bg-gray-100"
      >
        <Minus className="w-4 h-4" />
      </button>
      <div className="w-12 h-10 flex items-center justify-center font-semibold border-l border-r border-gray-300">
        {quantity}
      </div>
      <button
        onClick={onIncrease}
        disabled={disabled}
        className="w-10 h-10 flex items-center justify-center rounded-r-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

interface FavoriteButtonProps {
  productId: string;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

function FavoriteButton({ productId, favorites, onToggleFavorite }: FavoriteButtonProps) {
  const isFavorite = favorites.has(productId);

  return (
    <button
      onClick={() => onToggleFavorite(productId)}
      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isFavorite
        ? "bg-red-50 text-red-500 hover:bg-red-100"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
    >
      <Heart
        className="w-5 h-5"
        fill={isFavorite ? "currentColor" : "none"}
      />
    </button>
  );
}

function ShareButton() {
  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-10 h-10 rounded-full bg-primary-300 flex items-center justify-center hover:bg-gray-200 transition-colors relative"
      title="Copy link"
    >
      <Share2 className="w-4 h-4" color="black"/>
      {copied && (
        <span className="absolute -top-7 text-xs bg-gray-600 text-white px-2 py-1 rounded">
          Copied!
        </span>
      )}
    </button>
  );
}

function StockStatus({ inStock }: { inStock: boolean }) {
  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${inStock
      ? "bg-green-500/20 text-green-500"
      : "bg-red-500/20 text-red-500"
      }`}>
      <div className={`w-2 h-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
      {inStock ? "In Stock" : "Out of Stock"}
    </div>
  );
}