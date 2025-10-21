interface ResultsHeaderProps {
  showing: number;
  total: number;
  currentPage?: number;
  limit?: number;
}

export default function ResultsHeader({ 
  showing, 
  total, 
  currentPage = 1, 
  limit = 12 
}: ResultsHeaderProps) {
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  return (
    <div className="mb-6">
      <p className="text-gray-600">
        Showing {startItem}-{endItem} of {total} products
      </p>
    </div>
  );
}