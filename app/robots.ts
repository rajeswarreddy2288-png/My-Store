import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-store-rajesh.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/orders", "/cart", "/api/"] }],
    sitemap: BASE + "/sitemap.xml",
  };
}
