import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { infoPages } from "@/app/info/[slug]/page";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-store-rajesh.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  return [
    { url: BASE + "/" },
    ...Object.keys(infoPages).map((slug) => ({ url: BASE + "/info/" + slug })),
    ...products.map((p) => ({ url: BASE + "/products/" + p.id })),
  ];
}
