import Link from "next/link";
import { getProducts, categories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

type SearchParams = Promise<{
  q?: string;
  category?: string;
  max?: string;
  sort?: string;
}>;

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q = "", category = "", max = "", sort = "featured" } = await searchParams;

  const products = await getProducts({
    q,
    category,
    max: max ? Number(max) : undefined,
    sort,
  });

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-14 text-white">
        <p className="text-sm font-medium uppercase tracking-widest text-indigo-200">
          New season
        </p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Style that inspires</h1>
        <p className="mt-3 max-w-md text-indigo-100">
          Discover the latest trends and exclusive deals, delivered to your door.
        </p>
        <a
          href="#shop"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-indigo-700 hover:bg-indigo-50"
        >
          Shop now
        </a>
      </section>

      <section className="grid gap-4 text-center text-sm sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-4 font-medium">Free shipping over $50</div>
        <div className="rounded-xl border bg-white p-4 font-medium">Secure checkout</div>
        <div className="rounded-xl border bg-white p-4 font-medium">Easy 30-day returns</div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Shop by category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <Link
              key={c}
              href={"/?category=" + c + "#shop"}
              className="rounded-full border bg-white px-5 py-2 text-sm font-medium hover:border-indigo-600 hover:text-indigo-600"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section id="shop" className="scroll-mt-28">
        <h2 className="mb-6 text-3xl font-bold">All Products</h2>

        <form action="/" className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit space-y-6 rounded-xl border bg-white p-5">
            <h3 className="font-semibold">Filters</h3>

            <fieldset>
              <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Category
              </legend>
              <label className="flex items-center gap-2 py-1 text-sm">
                <input type="radio" name="category" value="" defaultChecked={!category} />
                All
              </label>
              {categories.map((c) => (
                <label key={c} className="flex items-center gap-2 py-1 text-sm">
                  <input type="radio" name="category" value={c} defaultChecked={category === c} />
                  {c}
                </label>
              ))}
            </fieldset>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Max price
              </label>
              <select
                name="max"
                defaultValue={max}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              >
                <option value="">Any price</option>
                <option value="30">Up to $30</option>
                <option value="50">Up to $50</option>
                <option value="100">Up to $100</option>
                <option value="150">Up to $150</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Sort by
              </label>
              <select
                name="sort"
                defaultValue={sort}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Apply filters
            </button>
            <Link href="/#shop" className="block text-center text-sm text-gray-500 hover:text-indigo-600">
              Clear all
            </Link>
          </aside>

          <div>
            <div className="mb-4 flex gap-3">
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search any product..."
                className="w-full rounded-lg border bg-white px-4 py-2 text-sm"
              />
              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                Search
              </button>
            </div>

            <p className="mb-4 text-sm text-gray-500">{products.length} products</p>

            {products.length === 0 ? (
              <div className="rounded-xl border bg-white p-10 text-center text-gray-500">
                No products match your filters.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
