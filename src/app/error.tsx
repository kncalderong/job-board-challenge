"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid h-screen place-content-center px-6">
      <div className="text-center">
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray sm:text-4xl">
          Something went wrong!
        </h1>
        <button
          className="mt-6 px-4 py-2 text-sm text-white transition-colors bg-red rounded-md hover:cursor-pointer"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
