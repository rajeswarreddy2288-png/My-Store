import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { getProductImage } from "@/lib/images";
import { formatPrice, formatCount } from "@/lib/format";

import WishlistButton from "@/components/WishlistButton";

export default function ProductCard({ product }: { product: Product }) {
  const image = getProductImage(product.id);

  const item = {
    id: product.id,
    name: product.brand + " " + product.name,
    price: product.price,
    color: product.color,
    image: image ?? undefined,
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute right-3 top-3 z-20">
        <WishlistButton product={item} />
      </div>

      <Link href={"/products/" + product.id} className="block">
        <div className={"relative aspect-[3/4] w-full overflow-hidden " + product.color}>
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 48vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-3 text-center">
              <span className="text-xs font-bold uppercase tracking-[3px] text-gray-400">
                {product.brand}
              </span>
              <span className="mt-4 text-3xl font-black text-gray-300">
                {product.subcategory}
              </span>
              <span className="mt-2 rounded-full bg-white px-4 py-1 text-xs font-semibold text-gray-500 shadow-sm">
                Explore Collection
              </span>
            </div>
          )}

          {product.badge && (
            <span className="absolute left-2 top-2 rounded-md bg-indigo-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
              {product.badge}
            </span>
          )}

          <span className="absolute bottom-3 left-3 rounded-md bg-white/95 px-2 py-1 text-xs font-bold text-gray-800 shadow">
            {product.rating} ? | {formatCount(product.reviews)}
          </span>
        </div>

        <div className="px-3 pb-2 pt-4">
          <p className="truncate text-sm font-bold text-gray-900">{product.brand}</p>
          <p className="mt-1 truncate text-sm text-gray-500">{product.name}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-base font-extrabold text-gray-900">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
            <span className="text-xs font-bold text-orange-600">
              {product.discount}% OFF
            </span>
          </div>

          <p className="mt-2 text-xs font-medium text-green-700">
            Free delivery on eligible orders
          </p>
        </div>
      </Link>

      <div className="mt-auto px-3 pb-3 pt-2">
        
      </div>
    </div>
  );
}

