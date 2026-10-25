"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    color: string;
    image?: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      color: product.color,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        "mt-4 rounded-lg py-2 text-sm font-medium text-white " +
        (added ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-700")
      }
    >
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
