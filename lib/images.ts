export const productImages: Record<string, string> = {
};

export function getProductImage(id: string): string | null {
  return productImages[id] ?? null;
}
