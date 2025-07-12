import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="text-center py-20 px-6">
      <h1 className="text-4xl font-bold text-gray-100 mb-4">404</h1>
      <p className="text-gray-400 mb-6">This page does not exis.</p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-red text-white font-semibold rounded-lg transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
