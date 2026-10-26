export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  color: string;
  sizes: string[];
  badge?: string;
};

export const categories = ["Men", "Women", "Kids", "Footwear", "Accessories", "Electronics", "Home"];

export const priceRanges = [
  { key: "0-499", min: 0, max: 499 },
  { key: "500-999", min: 500, max: 999 },
  { key: "1000-1999", min: 1000, max: 1999 },
  { key: "2000-99999", min: 2000, max: 99999 },
];

const brandsByCategory: Record<string, string[]> = {
  Men: ["Urbanly", "Northline", "Bluepeak", "Dapper & Co", "Roamer"],
  Women: ["Aarya", "Zaina", "Lavanya", "Velvet Lane", "Mirabel"],
  Kids: ["Tiny Trails", "Little Orbit", "Joy Bugs", "Playpen"],
  Footwear: ["StepUp", "Trailmate", "Soleful", "Pacer", "Walkwell"],
  Accessories: ["Chronos", "Shade Co", "Packwell", "Leatherly", "Orbit"],
  Electronics: ["Voltix", "SoundNest", "Pulsar", "Zenith", "ChargeUp"],
  Home: ["Casa Verde", "Nestwell", "Lumina Home", "Woven", "Hearthly"],
};

const stylesByCategory: Record<string, string[]> = {
  Men: ["Slim Fit", "Regular Fit", "Printed", "Solid", "Casual", "Classic"],
  Women: ["Printed", "Embroidered", "Solid", "Floral", "Festive", "Everyday"],
  Kids: ["Cartoon Print", "Soft Cotton", "Striped", "Colorblock", "Playtime", "Cute"],
  Footwear: ["Lightweight", "Cushioned", "Classic", "Sport", "Everyday", "Premium"],
  Accessories: ["Classic", "Minimal", "Premium", "Everyday", "Sport", "Retro"],
  Electronics: ["Wireless", "Pro", "Lite", "Max", "Compact", "Fast"],
  Home: ["Cotton", "Handcrafted", "Modern", "Classic", "Cozy", "Premium"],
};

const palette = [
  { n: "Blue", c: "bg-blue-200" },
  { n: "Red", c: "bg-red-200" },
  { n: "Green", c: "bg-green-200" },
  { n: "Yellow", c: "bg-yellow-200" },
  { n: "Purple", c: "bg-purple-200" },
  { n: "Pink", c: "bg-pink-200" },
  { n: "Orange", c: "bg-orange-200" },
  { n: "Teal", c: "bg-teal-200" },
  { n: "Grey", c: "bg-slate-300" },
  { n: "Beige", c: "bg-stone-300" },
];

type Group = {
  category: string;
  sub: string;
  item: string;
  min: number;
  max: number;
  sizes: string[];
};

const apparel = ["S", "M", "L", "XL"];
const kidSizes = ["2-3Y", "4-5Y", "6-7Y"];
const shoeSizes = ["6", "7", "8", "9", "10"];
const none: string[] = [];

const groups: Group[] = [
  { category: "Men", sub: "T-Shirts", item: "T-Shirt", min: 399, max: 1499, sizes: apparel },
  { category: "Men", sub: "Shirts", item: "Shirt", min: 599, max: 2499, sizes: apparel },
  { category: "Men", sub: "Jeans", item: "Jeans", min: 899, max: 2999, sizes: apparel },
  { category: "Men", sub: "Jackets", item: "Jacket", min: 1499, max: 4999, sizes: apparel },
  { category: "Women", sub: "Kurtas", item: "Kurta", min: 499, max: 2499, sizes: apparel },
  { category: "Women", sub: "Dresses", item: "Dress", min: 799, max: 3499, sizes: apparel },
  { category: "Women", sub: "Tops", item: "Top", min: 399, max: 1599, sizes: apparel },
  { category: "Women", sub: "Sarees", item: "Saree", min: 999, max: 5999, sizes: none },
  { category: "Kids", sub: "Tees", item: "Tee", min: 299, max: 999, sizes: kidSizes },
  { category: "Kids", sub: "Frocks", item: "Frock", min: 499, max: 1799, sizes: kidSizes },
  { category: "Kids", sub: "Shorts", item: "Shorts", min: 299, max: 899, sizes: kidSizes },
  { category: "Kids", sub: "Sets", item: "Set", min: 599, max: 1999, sizes: kidSizes },
  { category: "Footwear", sub: "Sneakers", item: "Sneakers", min: 999, max: 4999, sizes: shoeSizes },
  { category: "Footwear", sub: "Running Shoes", item: "Running Shoes", min: 1299, max: 5499, sizes: shoeSizes },
  { category: "Footwear", sub: "Sandals", item: "Sandals", min: 399, max: 1999, sizes: shoeSizes },
  { category: "Footwear", sub: "Formal Shoes", item: "Formal Shoes", min: 1199, max: 3999, sizes: shoeSizes },
  { category: "Accessories", sub: "Watches", item: "Watch", min: 999, max: 6999, sizes: none },
  { category: "Accessories", sub: "Sunglasses", item: "Sunglasses", min: 499, max: 2999, sizes: none },
  { category: "Accessories", sub: "Backpacks", item: "Backpack", min: 699, max: 3499, sizes: none },
  { category: "Accessories", sub: "Wallets", item: "Wallet", min: 299, max: 1499, sizes: none },
  { category: "Electronics", sub: "Headphones", item: "Headphones", min: 799, max: 7999, sizes: none },
  { category: "Electronics", sub: "Smart Watches", item: "Smart Watch", min: 1499, max: 9999, sizes: none },
  { category: "Electronics", sub: "Speakers", item: "Speaker", min: 999, max: 5999, sizes: none },
  { category: "Electronics", sub: "Power Banks", item: "Power Bank", min: 599, max: 2499, sizes: none },
  { category: "Home", sub: "Bedsheets", item: "Bedsheet", min: 499, max: 2499, sizes: none },
  { category: "Home", sub: "Cushions", item: "Cushion Cover", min: 299, max: 1299, sizes: none },
  { category: "Home", sub: "Lamps", item: "Lamp", min: 399, max: 2999, sizes: none },
  { category: "Home", sub: "Wall Decor", item: "Wall Decor", min: 299, max: 1999, sizes: none },
];

// Change this number to get more or fewer products per type.
const PER_GROUP = 14;

function makeRng(seed: number) {
  let a = seed;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function build(): Product[] {
  const rand = makeRng(20261025);
  const list: Product[] = [];
  let n = 0;

  for (const g of groups) {
    const brands = brandsByCategory[g.category];
    const styles = stylesByCategory[g.category];

    for (let i = 0; i < PER_GROUP; i++) {
      const brand = brands[Math.floor(rand() * brands.length)];
      const style = styles[Math.floor(rand() * styles.length)];
      const color = palette[Math.floor(rand() * palette.length)];

      const base = g.min + rand() * (g.max - g.min);
      const oldPrice = Math.max(199, Math.round(base / 100) * 100 - 1);
      const wanted = 10 + Math.floor(rand() * 61);
      const price = Math.max(99, Math.round((oldPrice * (1 - wanted / 100)) / 10) * 10 - 1);
      const discount = Math.round((1 - price / oldPrice) * 100);

      const rating = Math.round((3.4 + rand() * 1.5) * 10) / 10;
      const reviews = Math.floor(15 + rand() * rand() * 4500);

      n += 1;
      const badge =
        rating >= 4.5 && reviews > 800 ? "Best seller" : rand() < 0.1 ? "New" : undefined;

      list.push({
        id: String(n),
        name: style + " " + g.item + " in " + color.n,
        brand,
        category: g.category,
        subcategory: g.sub,
        description:
          brand + " " + style.toLowerCase() + " " + g.item.toLowerCase() + " in " + color.n.toLowerCase() +
          ". Comfortable, durable and made to last.",
        price,
        oldPrice,
        discount,
        rating,
        reviews,
        color: color.c,
        sizes: g.sizes,
        badge,
      });
    }
  }

  // Mix the products so the default feed is not grouped by type.
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

const products = build();

export type Filters = {
  q?: string;
  category?: string;
  sub?: string;
  brands?: string[];
  price?: string;
  discount?: number;
  rating?: number;
  sort?: string;
};

export async function getProducts(filters: Filters = {}): Promise<Product[]> {
  const tokens = (filters.q ?? "").toLowerCase().trim().split(/\s+/).filter(Boolean);
  const range = priceRanges.find((r) => r.key === filters.price);

  const result = products.filter((p) => {
    if (tokens.length > 0) {
      const text = (p.name + " " + p.brand + " " + p.category + " " + p.subcategory).toLowerCase();
      if (!tokens.every((t) => text.includes(t))) return false;
    }
    if (filters.category && p.category !== filters.category) return false;
    if (filters.sub && p.subcategory !== filters.sub) return false;
    if (filters.brands && filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;
    if (range && (p.price < range.min || p.price > range.max)) return false;
    if (filters.discount && p.discount < filters.discount) return false;
    if (filters.rating && p.rating < filters.rating) return false;
    return true;
  });

  const sorted = [...result];
  switch (filters.sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "discount":
      sorted.sort((a, b) => b.discount - a.discount);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      sorted.sort((a, b) => Number(b.id) - Number(a.id));
      break;
  }
  return sorted;
}

export function getBrands(category?: string): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of products) {
    if (!category || p.category === category) {
      counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

