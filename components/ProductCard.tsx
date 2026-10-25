import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { getProductImage } from "@/lib/images";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";

export default function ProductCard({ product }: { product: Product }) {
  const image = getProductImage(product.id);

  return (
    <div className="relative flex flex-col rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="absolute right-6 top-6 z-10">
        <WishlistButton
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            color: product.color,
            image: image ?? undefined,
          }}
        />
      </div>

      <Link href={"/products/" + product.id} className="block">
        <div className={"relative mb-4 h-44 overflow-hidden rounded-lg " + product.color}>
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 280px, (min-width: 640px) 45vw, 100vw"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full items-center justify-center text-5xl font-bold text-white/70">
              {product.name.charAt(0)}
            </span>
          )}
          {product.badge && (
            <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-indigo-700">
              {product.badge}
            </span>
          )}
        </div>
        <p className="text-xs uppercase tracking-wide text-gray-400">{product.category}</p>
        <h2 className="mt-1 font-semibold hover:text-indigo-600">{product.name}</h2>
      </Link>
      <p className="mt-1 text-sm text-amber-500">
        &#9733; {product.rating} <span className="text-gray-400">({product.reviews})</span>
      </p>
      <p className="mt-1 flex-1 text-sm text-gray-600">{product.description}</p>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
        {product.oldPrice && (
          <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
        )}
      </div>
      <AddToCartButton
        product={{
          id: product.id,
          name: product.name,
          price: product.price,
          color: product.color,
          image: image ?? undefined,
        }}
      />
    </div>
  );
}
