import Link from "next/link";
import { getProducts, type Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

function Row({ title, href, items }: { title: string; href: string; items: Product[] }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold uppercase tracking-wide">{title}</h2>
        <Link href={href} className="text-sm font-semibold text-indigo-600 hover:underline">
          See all
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((p) => (
          <div key={p.id} className="w-44 shrink-0 sm:w-52">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function DealRows() {
  const deals = (await getProducts({ sort: "discount" })).slice(0, 10);
  const top = (await getProducts({ sort: "rating", rating: 4 })).slice(0, 10);

  return (
    <div className="space-y-10">
      <Row title="Best deals" href="/?sort=discount#shop" items={deals} />
      <Row title="Top rated" href="/?rating=4&sort=rating#shop" items={top} />
    </div>
  );
}
