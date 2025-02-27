import React from "react";

export function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl ${className}`}
    >
      {children}
    </button>
  );
}
