"use client";

import { useWishlist, type WishItem } from "@/components/WishlistProvider";

export default function WishlistButton({ product }: { product: WishItem }) {
  const { has, toggle, loaded } = useWishlist();
  const on = loaded && has(product.id);

  return (
    <button
      type="button"
      onClick={() => toggle(product)}
      aria-label={on ? "Remove from wishlist" : "Add to wishlist"}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl shadow hover:scale-110"
    >
      <span className={on ? "text-red-500" : "text-gray-400"}>
        {on ? <>&#9829;</> : <>&#9825;</>}
      </span>
    </button>
  );
}
