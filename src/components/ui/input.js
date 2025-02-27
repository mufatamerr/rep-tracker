import React from "react";

export function Input({ type = "text", placeholder, value, onChange, className }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-3 rounded-xl bg-gray-700 text-white border-none w-full ${className}`}
    />
  );
}
