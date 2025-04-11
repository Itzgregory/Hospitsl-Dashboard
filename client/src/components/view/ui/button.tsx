import {ButtonProps} from "../../../types/user";
  
  export default function Button({ children, onClick, className }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded ${className}`}
      >
        {children}
      </button>
    );
  }