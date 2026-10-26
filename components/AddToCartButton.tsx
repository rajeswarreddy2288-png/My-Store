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
    sizes?: string[];
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState("");
  const [warn, setWarn] = useState(false);
  const sizes = product.sizes ?? [];

  function handleClick() {
    if (sizes.length > 0 && !size) {
      setWarn(true);
      return;
    }
    addItem({
      id: size ? product.id + "-" + size : product.id,
      name: product.name,
      price: product.price,
      color: product.color,
      image: product.image,
      size: size || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div>
      {sizes.length > 0 && (
        <div className="mt-1">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide">Select size</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setWarn(false);
                }}
                className={
                  "min-w-12 rounded-full border px-4 py-2 text-sm font-semibold " +
                  (size === s
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "bg-white hover:border-indigo-600")
                }
              >
                {s}
              </button>
            ))}
          </div>
          {warn && !size && (
            <p className="mt-2 text-sm font-medium text-red-500">Please select a size</p>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={handleClick}
        className={
          "mt-4 w-full rounded-md py-3 text-sm font-bold uppercase tracking-wide text-white " +
          (added ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-700")
        }
      >
        {added ? "Added to cart" : "Add to cart"}
      </button>
    </div>
  );
}
