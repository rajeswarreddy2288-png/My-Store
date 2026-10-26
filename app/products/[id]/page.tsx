import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/lib/products";
import { getProductImage } from "@/lib/images";
import { formatPrice, formatCount } from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";
import ProductCard from "@/components/ProductCard";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "Product not found | My Store" };
  return {
    title: product.brand + " " + product.name + " | My Store",
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const image = getProductImage(product.id);
  const item = {
    id: product.id,
    name: product.brand + " " + product.name,
    price: product.price,
    color: product.color,
    image: image ?? undefined,
  };

  const related = (await getProducts({ category: product.category }))
    .filter((p) => p.subcategory === product.subcategory && p.id !== product.id)
    .slice(0, 4);

  return (
    <div>
      <p className="text-sm text-gray-500">
        <Link href="/" className="hover:text-indigo-600">Home</Link> /{" "}
        <Link href={"/?category=" + product.category + "#shop"} className="hover:text-indigo-600">
          {product.category}
        </Link>{" "}
        / <span className="text-gray-800">{product.subcategory}</span>
      </p>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className={"relative aspect-[3/4] w-full overflow-hidden rounded-lg " + product.color}>
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
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-black/40">
                {product.brand}
              </span>
              <span className="mt-3 text-5xl font-extrabold leading-tight text-black/30">
                {product.subcategory}
              </span>
            </div>
          )}
          {product.badge && (
            <span className="absolute left-3 top-3 rounded bg-indigo-600 px-3 py-1 text-xs font-bold uppercase text-white">
              {product.badge}
            </span>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-extrabold">{product.brand}</h1>
          <p className="text-lg text-gray-500">{product.name}</p>

          <p className="mt-3 inline-flex items-center gap-2 rounded border px-3 py-1 text-sm font-bold">
            <span className="text-green-600">{product.rating} &#9733;</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">{formatCount(product.reviews)} ratings</span>
          </p>

          <div className="mt-5 border-t pt-5">
            <p className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
              <span className="text-lg font-bold text-orange-500">({product.discount}% OFF)</span>
            </p>
            <p className="mt-1 text-sm font-medium text-green-700">inclusive of all taxes</p>
          </div>

          {product.sizes.length > 0 && (
            <p className="mt-5 text-sm text-gray-600">
              Available sizes: <span className="font-semibold">{product.sizes.join(", ")}</span>
            </p>
          )}

          <div className="mt-6 flex items-start gap-3">
            <div className="flex-1">
              <AddToCartButton product={{ ...item, sizes: product.sizes }} />
            </div>
            <div className="mt-4">
              <WishlistButton product={item} />
            </div>
          </div>

          <div className="mt-6 rounded-lg border bg-white p-4 text-sm">
            <p className="font-bold">Offers and delivery</p>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>Free delivery on orders over &#8377;499</li>
              <li>Easy 30-day returns and exchanges</li>
              <li>Cash on delivery available</li>
            </ul>
          </div>

          <div className="mt-6">
            <p className="font-bold">Product details</p>
            <p className="mt-2 text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-wide">More like this</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

