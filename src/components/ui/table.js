import React from "react";

export function Table({ children, className }) {
  return <table className={`w-full bg-gray-800 rounded-2xl overflow-hidden ${className}`}>{children}</table>;
}

export function TableHead({ children }) {
  return <thead className="bg-gray-700 text-white">{children}</thead>;
}

export function TableRow({ children }) {
  return <tr className="border-b border-gray-700">{children}</tr>;
}

export function TableCell({ children }) {
  return <td className="px-4 py-2">{children}</td>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}
