export default function LoadingState() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 gap-2 mb-8">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="bg-white overflow-hidden animate-pulse">
          {/* Product Image Skeleton */}
          <div className="w-full h-48 bg-gray-200 relative">
            <div className="absolute top-2 right-2 w-10 h-5 bg-gray-300 rounded-full"></div>
          </div>

          {/* Product Info Skeleton */}
          <div className="p-4">
            {/* Product Name */}
            <div className="flex flex-col gap-1 mb-3">
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
              <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
            </div>

            {/* Rating and Button */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3.5 h-3.5 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="w-6 h-3 bg-gray-200 rounded ml-2"></div>
              </div>
              <div className="w-8 h-6 bg-gray-200 rounded-full"></div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <div className="w-16 h-5 bg-gray-200 rounded"></div>
              <div className="w-12 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}