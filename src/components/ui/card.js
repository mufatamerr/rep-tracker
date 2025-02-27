import React from "react";

export function Card({ children, className }) {
  return <div className={`bg-gray-800 p-6 rounded-2xl shadow-md ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
