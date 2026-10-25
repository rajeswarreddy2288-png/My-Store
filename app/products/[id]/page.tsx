import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { getProductImage } from "@/lib/images";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const image = getProductImage(product.id);

  return (
    <div>
      <Link href="/#shop" className="text-sm text-indigo-600 hover:underline">
        &larr; Back to shop
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div
          className={
            "relative h-96 overflow-hidden rounded-2xl " + product.color
          }
        >
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full items-center justify-center text-8xl font-bold text-white/70">
              {product.name.charAt(0)}
            </span>
          )}
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-semibold text-indigo-700">
              {product.badge}
            </span>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            {product.category}
          </p>
          <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-amber-500">
            &#9733; {product.rating}{" "}
            <span className="text-gray-400">({product.reviews} reviews)</span>
          </p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="mt-6 text-gray-700">{product.description}</p>

          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>Free shipping on orders over $50</li>
            <li>Easy 30-day returns</li>
            <li>In stock and ready to ship</li>
          </ul>

          <div className="mt-8 max-w-xs [&>button]:w-full [&>button]:py-3">
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
        </div>
      </div>
    </div>
  );
}
