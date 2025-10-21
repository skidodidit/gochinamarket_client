interface ProductPriceProps {
  price: number;
  discount?: number;
  discountedPrice: number;
  size?: "default" | "small";
}

export default function ProductPrice({ price, discount, discountedPrice, size = "default" }: ProductPriceProps) {
  const textSize = size === "small" ? "text-base" : "text-3xl";
  const discountTextSize = size === "small" ? "text-sm" : "text-xl";

  return (
    <div className="mb-2">
      {discount! > 0 ? (
        <div className="flex items-center gap-2">
          <span className={`font-semibold text-red-500 ${textSize}`}>
            ${discountedPrice.toFixed(2)}
          </span>
          <span className={`text-gray-400 line-through ${discountTextSize}`}>
            ${price.toFixed(2)}
          </span>
          {size === "default" && (
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
              -{discount}% OFF
            </span>
          )}
        </div>
      ) : (
        <span className={`font-semibold ${textSize}`}>
          ${price.toFixed(2)}
        </span>
      )}
    </div>
  );
}