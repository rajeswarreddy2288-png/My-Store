import Link from "next/link";
import { getBrands } from "@/lib/products";

const tints = [
  "from-indigo-100 to-indigo-200 text-indigo-700",
  "from-pink-100 to-pink-200 text-pink-700",
  "from-emerald-100 to-emerald-200 text-emerald-700",
  "from-amber-100 to-amber-200 text-amber-700",
  "from-sky-100 to-sky-200 text-sky-700",
  "from-violet-100 to-violet-200 text-violet-700",
  "from-rose-100 to-rose-200 text-rose-700",
  "from-teal-100 to-teal-200 text-teal-700",
];

export default function TopBrands() {
  const brands = getBrands().slice(0, 8);

  return (
    <section>
      <h2 className="mb-4 text-lg font-bold uppercase tracking-wide">Top brands</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {brands.map((b, i) => (
          <Link
            key={b.name}
            href={"/?brand=" + encodeURIComponent(b.name) + "#shop"}
            className={
              "flex aspect-square flex-col items-center justify-center rounded-xl bg-gradient-to-br p-3 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg " +
              tints[i % tints.length]
            }
          >
            <span className="text-2xl font-extrabold">{b.name.charAt(0)}</span>
            <span className="mt-1 text-sm font-bold leading-tight">{b.name}</span>
            <span className="text-[11px] opacity-70">{b.count} styles</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
