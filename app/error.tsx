"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-xl border bg-white p-12 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-gray-500">Please try again in a moment.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-md bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
      >
        Try again
      </button>
    </div>
  );
}
