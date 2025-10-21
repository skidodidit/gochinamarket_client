interface ProductRatingProps {
  rating: number;
  reviews: number;
  inStock: boolean;
  size?: "default" | "small";
}

export default function ProductRating({ rating, reviews, inStock, size = "default" }: ProductRatingProps) {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  const textSize = size === "small" ? "text-xs" : "text-sm";

  return (
    <div className={`flex items-center gap-2 ${size === "default" ? "mb-4" : ""}`}>
      <div className={`flex ${textSize}`}>{renderStars(rating)}</div>
      <span className={`text-gray-500 ${textSize}`}>({reviews})</span>
      {size === "default" && (
        <>
          <span className="text-gray-300">|</span>
          <span className={`${textSize} ${inStock ? "text-green-500" : "text-red-500"}`}>
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </>
      )}
    </div>
  );
}