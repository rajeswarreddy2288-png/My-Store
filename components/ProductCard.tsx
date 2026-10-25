import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { getProductImage } from "@/lib/images";
import { formatPrice, formatCount } from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";
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
    <div className="relative flex flex-col overflow-hidden rounded-lg border bg-white transition hover:shadow-lg">
      <div className="absolute right-2 top-2 z-10">
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
              className="object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-3 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-black/40">
                {product.brand}
              </span>
              <span className="mt-2 text-2xl font-extrabold leading-tight text-black/30">
                {product.subcategory}
              </span>
            </div>
          )}
          <span className="absolute bottom-2 left-2 rounded bg-white/90 px-1.5 py-0.5 text-xs font-bold text-gray-800">
            {product.rating} &#9733; | {formatCount(product.reviews)}
          </span>
          {product.badge && (
            <span className="absolute left-2 top-2 rounded bg-indigo-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
              {product.badge}
            </span>
          )}
        </div>

        <div className="px-3 pt-3">
          <p className="truncate font-bold text-gray-900">{product.brand}</p>
          <p className="truncate text-sm text-gray-500">{product.name}</p>
          <p className="mt-1 flex flex-wrap items-baseline gap-x-2 text-sm">
            <span className="font-bold">{formatPrice(product.price)}</span>
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
            <span className="text-xs font-semibold text-orange-500">({product.discount}% OFF)</span>
          </p>
        </div>
      </Link>

      <div className="flex flex-col px-3 pb-3">
        <AddToCartButton product={item} />
      </div>
    </div>
  );
}
