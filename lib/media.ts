import { getProductImage } from "@/lib/images";
import type { Product } from "@/lib/products";

// Switch this to true once real, checked photos are in place.
const USE_PHOTOS = false;

export function getProductVisual(product: Product): string | null {
  if (!USE_PHOTOS) return null;
  return getProductImage(product.id);
}
