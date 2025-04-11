import { TableActionsViewProps } from '../../../types/user';

interface ExtendedTableActionsViewProps extends TableActionsViewProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onEdit: () => void;
  onView: () => void;
}

export default function TableActionsView({  
  isOpen, 
  setIsOpen, 
  onEdit, 
  onView 
}: ExtendedTableActionsViewProps) {
  return (
    <div className="relative flex items-center">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-black hover:text-[#3f488d] p-1 focus:outline-none"
        aria-label="Actions"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 inline-block"
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <circle cx="12" cy="8" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="16" r="1.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-[#3f488d] rounded-md shadow-lg z-50 border border-[#9c9ac9]">
          <div className="py-1">
            <button 
              onClick={() => {
                setIsOpen(false);
                onView();
              }}
              className="block w-full px-4 py-2 text-sm text-white hover:bg-[#9c9ac9] text-left"
            >
              View
            </button>
            <button 
              onClick={() => {
                setIsOpen(false);
                onEdit();
              }}
              className="block w-full px-4 py-2 text-sm text-white hover:bg-[#9c9ac9] text-left"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}