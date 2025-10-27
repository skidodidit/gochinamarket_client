import { StepBack, StepForward } from "lucide-react";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= maxVisiblePages; i++) pages.push(i);
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-2 py-2 rounded-lg font-medium transition ${
          currentPage === 1
            ? "bg-gray-500/60 text-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-white/20 border border-gray-500"
        }`}
      >
        <StepBack className="w-4 h-4"/>
      </button>

      <div className="flex gap-1">
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-12 h-10 rounded-lg font-medium transition text-sm ${
              currentPage === pageNum
                ? "bg-primary-300 text-black"
                : "bg-black text-white hover:bg-white/20 border border-gray-300"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-2 py-2 rounded-lg font-medium transition ${
          currentPage === totalPages
            ? "bg-gray-500/60 text-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-white/20 border border-gray-500"
        }`}
      >
        <StepForward className="w-4 h-4"/>
      </button>
    </div>
  );
}