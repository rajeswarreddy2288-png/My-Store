"use client";

import Link from "next/link";
import { useWishlist } from "@/components/WishlistProvider";

export default function WishlistLink() {
  const { count, loaded } = useWishlist();

  return (
    <Link href="/wishlist" className="relative hover:text-indigo-600">
      Wishlist
      {loaded && count > 0 && (
        <span className="absolute -right-4 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
