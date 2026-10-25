export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  color: string;
  badge?: string;
};

export const categories = ["Clothing", "Footwear", "Accessories", "Electronics", "Home"];

const products: Product[] = [
  { id: "1", name: "Classic T-Shirt", description: "Soft 100% cotton tee.", price: 19.99, oldPrice: 24.99, category: "Clothing", rating: 4.6, reviews: 214, color: "bg-blue-200", badge: "Best seller" },
  { id: "2", name: "Slim Fit Denim", description: "Stretch jeans, all-day comfort.", price: 59.0, category: "Clothing", rating: 4.4, reviews: 98, color: "bg-sky-200" },
  { id: "3", name: "Hooded Sweatshirt", description: "Warm fleece-lined hoodie.", price: 44.5, oldPrice: 59.0, category: "Clothing", rating: 4.7, reviews: 156, color: "bg-slate-300", badge: "Sale" },
  { id: "4", name: "Running Shoes", description: "Lightweight and comfortable.", price: 79.0, category: "Footwear", rating: 4.8, reviews: 320, color: "bg-red-200", badge: "Best seller" },
  { id: "5", name: "Leather Sneakers", description: "Clean look, durable sole.", price: 89.0, category: "Footwear", rating: 4.5, reviews: 77, color: "bg-orange-200", badge: "New" },
  { id: "6", name: "Summer Sandals", description: "Breathable and easy to wear.", price: 29.5, category: "Footwear", rating: 4.2, reviews: 64, color: "bg-amber-200" },
  { id: "7", name: "Backpack", description: "Fits a 15-inch laptop.", price: 49.5, category: "Accessories", rating: 4.6, reviews: 187, color: "bg-green-200" },
  { id: "8", name: "Sunglasses", description: "UV400 protection.", price: 34.99, oldPrice: 49.99, category: "Accessories", rating: 4.3, reviews: 91, color: "bg-yellow-200", badge: "Sale" },
  { id: "9", name: "Wrist Watch", description: "Steel strap, water resistant.", price: 119.0, category: "Accessories", rating: 4.7, reviews: 143, color: "bg-stone-300" },
  { id: "10", name: "Wireless Headphones", description: "Noise-cancelling, 30h battery.", price: 129.0, category: "Electronics", rating: 4.8, reviews: 452, color: "bg-purple-200", badge: "Best seller" },
  { id: "11", name: "Bluetooth Speaker", description: "Waterproof, rich bass.", price: 89.99, category: "Electronics", rating: 4.5, reviews: 267, color: "bg-indigo-200" },
  { id: "12", name: "Desk Lamp", description: "Adjustable warm LED light.", price: 39.0, category: "Home", rating: 4.4, reviews: 58, color: "bg-pink-200", badge: "New" },
];

export type Filters = {
  q?: string;
  category?: string;
  max?: number;
  sort?: string;
};

export async function getProducts(filters: Filters = {}): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const q = filters.q?.toLowerCase().trim();

  const result = products.filter((p) => {
    if (q && !(p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.max && p.price > filters.max) return false;
    return true;
  });

  const sorted = [...result];
  if (filters.sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (filters.sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (filters.sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
  return sorted;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}
