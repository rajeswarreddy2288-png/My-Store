import Link from "next/link";
import { categories } from "@/lib/products";

const style: Record<string, { gradient: string; text: string }> = {
  Men: { gradient: "from-sky-500 to-indigo-600", text: "Shirts, jeans and jackets" },
  Women: { gradient: "from-pink-500 to-rose-600", text: "Kurtas, dresses and sarees" },
  Kids: { gradient: "from-amber-400 to-orange-500", text: "Tees, frocks and sets" },
  Footwear: { gradient: "from-emerald-500 to-teal-600", text: "Sneakers, sandals and more" },
  Accessories: { gradient: "from-violet-500 to-purple-700", text: "Watches, bags and shades" },
  Electronics: { gradient: "from-slate-600 to-slate-900", text: "Audio, wearables and power" },
  Home: { gradient: "from-lime-500 to-green-700", text: "Decor, lamps and bedding" },
};

export default function CategoryTiles() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-bold uppercase tracking-wide">Shop by category</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {categories.map((c) => {
          const s = style[c] ?? { gradient: "from-gray-500 to-gray-700", text: "Shop now" };
          return (
            <Link
              key={c}
              href={"/?category=" + c + "#shop"}
              className={
                "group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-br p-4 text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl " +
                s.gradient
              }
            >
              <span className="absolute -right-3 -top-6 text-8xl font-extrabold text-white/20 transition duration-500 group-hover:scale-110">
                {c.charAt(0)}
              </span>
              <span className="relative text-lg font-extrabold">{c}</span>
              <span className="relative text-xs text-white/85">{s.text}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
