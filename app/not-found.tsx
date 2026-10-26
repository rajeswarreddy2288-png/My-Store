import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-xl border bg-white p-12 text-center">
      <p className="text-5xl font-extrabold text-indigo-600">404</p>
      <h1 className="mt-3 text-2xl font-bold">We could not find that page</h1>
      <p className="mt-2 text-gray-500">The link may be old, or the product may be gone.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
      >
        Back to shop
      </Link>
    </div>
  );
}
