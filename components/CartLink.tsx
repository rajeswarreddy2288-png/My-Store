"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartLink() {
  const { count, loaded } = useCart();

  return (
    <Link href="/cart" className="relative hover:text-indigo-600">
      Cart
      {loaded && count > 0 && (
        <span className="absolute -right-4 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
