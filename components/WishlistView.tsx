"use client";

import Link from "next/link";
import { useWishlist } from "@/components/WishlistProvider";


export default function WishlistView() {
  const { items, loaded, toggle } = useWishlist();

  if (!loaded) {
    return <p className="text-gray-500">Loading your wishlist...</p>;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center">
        <h1 className="text-2xl font-bold">Your wishlist is empty</h1>
        <p className="mt-2 text-gray-500">
          Tap the heart on any product to save it here.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Your Wishlist</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col rounded-xl border bg-white p-4 shadow-sm">
            <Link href={"/products/" + item.id} className="block">
              <div className={"mb-4 h-44 overflow-hidden rounded-lg " + item.color}>
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full items-center justify-center text-5xl font-bold text-white/70">
                    {item.name.charAt(0)}
                  </span>
                )}
              </div>
              <h2 className="font-semibold hover:text-indigo-600">{item.name}</h2>
            </Link>
            <p className="mt-2 text-xl font-bold">${item.price.toFixed(2)}</p>
            <Link href={"/products/" + item.id} className="mt-4 block rounded-md bg-indigo-600 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700">View product</Link>
            <button
              type="button"
              onClick={() => toggle(item)}
              className="mt-3 text-sm text-red-500 hover:underline"
            >
              Remove from wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

