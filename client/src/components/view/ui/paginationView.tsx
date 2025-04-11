'use client';
import { PaginationViewProps } from "../../../types/user";

export default function PaginationView({ 
  currentPage, 
  totalPages, 
  onPageChange,
  startItem,
  endItem,
  totalItems
}: PaginationViewProps) {
  return (
    <div className="flex items-center justify-between mt-6 px-4 py-3 bg-white rounded-lg shadow">
      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-full ${
              currentPage === page 
                ? 'bg-[#3f488d] text-white' 
                : 'bg-[#e630f8] text-[#3f488d] hover:bg-[#9c9ac9]'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      
      <div className="text-sm text-[#8685ac]">
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>

      <div className="flex space-x-2">
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className="p-2 rounded-full disabled:bg-[#e630f8] disabled:text-[#3f488d] bg-[#3f488d] hover:bg-[#9c9ac9] text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="p-2 rounded-full disabled:bg-[#e630f8] disabled:text-[#3f488d] bg-[#3f488d] hover:bg-[#9c9ac9] text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}