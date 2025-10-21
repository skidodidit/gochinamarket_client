export const SkeletonLoader = () => (
    <div className="w-full bg-gray-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Mobile Skeleton */}
        <div className="md:hidden">
          {/* Main Banner Skeleton */}
          <div className="relative h-64 rounded-lg overflow-hidden mb-4 bg-gray-300/60 animate-pulse">
            <div className="absolute inset-0 flex flex-col justify-center px-6 z-10">
              <div className="h-8 bg-gray-400/60 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-400/60 rounded mb-4 w-1/2"></div>
              <div className="h-10 bg-gray-400/60 rounded w-32"></div>
            </div>
          </div>

          {/* Product Grid Skeleton */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Grid Products Skeleton */}
            {[1, 2].map((idx) => (
              <div key={idx} className="relative h-48 rounded-lg overflow-hidden bg-gray-300/60 animate-pulse">
                <div className="absolute inset-0 flex flex-col justify-end p-3">
                  <div className="h-5 bg-gray-400/60 rounded mb-2 w-3/4"></div>
                  <div className="h-8 bg-gray-400/60 rounded w-20"></div>
                </div>
              </div>
            ))}

            {/* Categories Skeleton */}
            <div className="bg-white rounded-lg overflow-hidden">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 ${
                    index !== 4 ? 'border-b border-gray-100/60' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-300/60 animate-pulse"></div>
                    <div className="h-4 bg-gray-300/60 rounded w-20 animate-pulse"></div>
                  </div>
                  <div className="w-4 h-4 bg-gray-300/60 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Carousel Skeleton */}
            <div className="relative h-48 rounded-lg overflow-hidden bg-gray-300/60 animate-pulse">
              <div className="absolute inset-0 flex flex-col justify-end p-3">
                <div className="h-5 bg-gray-400/60 rounded mb-2 w-3/4"></div>
                <div className="h-8 bg-gray-400/60 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Skeleton */}
        <div className="desktop-visibility flex gap-6">
          {/* Categories Sidebar Skeleton */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 ${
                    index !== 6 ? 'border-b border-gray-100/60' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-300/60 animate-pulse"></div>
                    <div className="h-5 bg-gray-300/60 rounded w-24 animate-pulse"></div>
                  </div>
                  <div className="w-5 h-5 bg-gray-300/60 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 items-center justify-between flex">
            <div className='w-[68%]'>
              {/* Main Banner Skeleton */}
              <div className="relative h-80 rounded-lg overflow-hidden mb-6 bg-gray-300/60 animate-pulse">
                <div className="absolute inset-0 flex flex-col justify-center px-12 z-10">
                  <div className="h-12 bg-gray-400/60 rounded mb-3 w-3/4"></div>
                  <div className="h-6 bg-gray-400/60 rounded mb-6 w-1/2"></div>
                  <div className="h-12 bg-gray-400/60 rounded w-32"></div>
                </div>
              </div>

              {/* Product Grid Skeleton */}
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((idx) => (
                  <div key={idx} className="relative h-64 rounded-lg overflow-hidden bg-gray-300/60 animate-pulse">
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <div className="h-6 bg-gray-400/60 rounded mb-3 w-3/4"></div>
                      <div className="h-10 bg-gray-400/60 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Skeleton */}
            <div className="relative h-full w-[30%] rounded-lg overflow-hidden bg-gray-300 animate-pulse">
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="h-6 bg-gray-400 rounded mb-3 w-3/4"></div>
                <div className="h-10 bg-gray-400 rounded w-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );