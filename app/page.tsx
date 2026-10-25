import Link from "next/link";
import { getProducts, getBrands, categories, priceRanges } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import ProductCard from "@/components/ProductCard";

const PAGE_SIZE = 24;

type SP = Promise<Record<string, string | string[] | undefined>>;

function one(v: string | string[] | undefined): string {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
}

function many(v: string | string[] | undefined): string[] {
  return Array.isArray(v) ? v : v ? [v] : [];
}

function priceLabel(key: string): string {
  if (key === "0-499") return "Under " + formatPrice(499);
  if (key === "500-999") return formatPrice(500) + " - " + formatPrice(999);
  if (key === "1000-1999") return formatPrice(1000) + " - " + formatPrice(1999);
  return formatPrice(2000) + " and above";
}

function RadioGroup({
  title,
  name,
  options,
  value,
}: {
  title: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-700">{title}</legend>
      {options.map((o) => (
        <label key={o.value} className="flex cursor-pointer items-center gap-2 py-1 text-gray-600">
          <input
            type="radio"
            name={name}
            value={o.value}
            defaultChecked={value === o.value}
            className="accent-indigo-600"
          />
          {o.label}
        </label>
      ))}
    </fieldset>
  );
}

export default async function HomePage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const q = one(sp.q);
  const category = one(sp.category);
  const brands = many(sp.brand);
  const price = one(sp.price);
  const discount = one(sp.discount);
  const rating = one(sp.rating);
  const sort = one(sp.sort) || "recommended";
  const page = Math.max(1, Number(one(sp.page)) || 1);

  const all = await getProducts({
    q,
    category,
    brands,
    price,
    discount: discount ? Number(discount) : undefined,
    rating: rating ? Number(rating) : undefined,
    sort,
  });

  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * PAGE_SIZE;
  const items = all.slice(start, start + PAGE_SIZE);
  const brandList = getBrands(category || undefined);
  const hasFilters = Boolean(q || category || brands.length || price || discount || rating);

  function href(p: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    brands.forEach((b) => params.append("brand", b));
    if (price) params.set("price", price);
    if (discount) params.set("discount", discount);
    if (rating) params.set("rating", rating);
    if (sort !== "recommended") params.set("sort", sort);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return (qs ? "/?" + qs : "/") + "#shop";
  }

  const pageNumbers: number[] = [];
  for (let i = Math.max(1, current - 2); i <= Math.min(totalPages, current + 2); i++) {
    pageNumbers.push(i);
  }

  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "newest", label: "What's new" },
    { value: "discount", label: "Better discount" },
    { value: "rating", label: "Customer rating" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
  ];

  return (
    <div className="space-y-8">
      {!hasFilters && current === 1 && (
        <>
          <section className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-8 py-12 text-white">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-100">
              End of season sale
            </p>
            <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Up to 70% OFF</h1>
            <p className="mt-3 max-w-md text-indigo-50">
              Fashion, footwear, electronics and home, all in one place.
            </p>
            <a
              href="#shop"
              className="mt-6 inline-block rounded-md bg-white px-6 py-3 font-bold text-indigo-700 hover:bg-indigo-50"
            >
              Shop now
            </a>
          </section>

          <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Link href="/?price=0-499#shop" className="rounded-lg bg-orange-100 p-4 text-center font-bold text-orange-700 hover:shadow">
              Under {formatPrice(499)}
            </Link>
            <Link href="/?discount=50#shop" className="rounded-lg bg-pink-100 p-4 text-center font-bold text-pink-700 hover:shadow">
              Min 50% OFF
            </Link>
            <Link href="/?rating=4&sort=rating#shop" className="rounded-lg bg-green-100 p-4 text-center font-bold text-green-700 hover:shadow">
              Top rated
            </Link>
            <Link href="/?sort=newest#shop" className="rounded-lg bg-blue-100 p-4 text-center font-bold text-blue-700 hover:shadow">
              New arrivals
            </Link>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-bold uppercase tracking-wide">Shop by category</h2>
            <div className="flex flex-wrap gap-4">
              {categories.map((c) => (
                <Link key={c} href={"/?category=" + c + "#shop"} className="flex w-24 flex-col items-center gap-2 text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-pink-100 text-2xl font-extrabold text-indigo-700 hover:shadow-md">
                    {c.charAt(0)}
                  </span>
                  <span className="text-sm font-medium">{c}</span>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      <section id="shop" className="scroll-mt-40">
        <form action="/" method="get" className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <details open className="h-fit rounded-lg border bg-white text-sm lg:[&>summary]:hidden">
            <summary className="cursor-pointer px-5 py-3 font-bold uppercase tracking-wide">Filters</summary>
            <div className="space-y-6 px-5 pb-5 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-wide">Filters</span>
                <Link href="/#shop" className="text-xs font-semibold text-indigo-600">
                  Clear all
                </Link>
              </div>

              <RadioGroup
                title="Categories"
                name="category"
                value={category}
                options={[{ value: "", label: "All" }, ...categories.map((c) => ({ value: c, label: c }))]}
              />

              <fieldset>
                <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-700">Brand</legend>
                <div className="max-h-48 overflow-y-auto pr-2">
                  {brandList.map((b) => (
                    <label key={b.name} className="flex cursor-pointer items-center gap-2 py-1 text-gray-600">
                      <input
                        type="checkbox"
                        name="brand"
                        value={b.name}
                        defaultChecked={brands.includes(b.name)}
                        className="accent-indigo-600"
                      />
                      {b.name} <span className="text-xs text-gray-400">({b.count})</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <RadioGroup
                title="Price"
                name="price"
                value={price}
                options={[{ value: "", label: "Any price" }, ...priceRanges.map((r) => ({ value: r.key, label: priceLabel(r.key) }))]}
              />

              <RadioGroup
                title="Discount"
                name="discount"
                value={discount}
                options={[
                  { value: "", label: "Any" },
                  { value: "30", label: "30% and above" },
                  { value: "50", label: "50% and above" },
                  { value: "70", label: "70% and above" },
                ]}
              />

              <RadioGroup
                title="Customer rating"
                name="rating"
                value={rating}
                options={[
                  { value: "", label: "Any" },
                  { value: "3", label: "3.0 and above" },
                  { value: "4", label: "4.0 and above" },
                ]}
              />

              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 py-2 font-bold text-white hover:bg-indigo-700"
              >
                Apply filters
              </button>
            </div>
          </details>

          <div>
            <div className="mb-4 flex flex-wrap gap-3">
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search products, brands..."
                className="min-w-0 flex-1 rounded-md border bg-white px-4 py-2 text-sm"
              />
              <select name="sort" defaultValue={sort} className="rounded-md border bg-white px-3 py-2 text-sm">
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    Sort by: {o.label}
                  </option>
                ))}
              </select>
              <button type="submit" className="rounded-md bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-700">
                Go
              </button>
            </div>

            <p className="mb-4 text-sm text-gray-500">
              {all.length === 0
                ? "No products found"
                : "Showing " + (start + 1) + " - " + (start + items.length) + " of " + all.length + " products"}
            </p>

            {items.length === 0 ? (
              <div className="rounded-lg border bg-white p-10 text-center text-gray-500">
                No products match your filters. Try clearing some of them.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <nav className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
                {current > 1 && (
                  <Link href={href(current - 1)} className="rounded border bg-white px-3 py-1.5 hover:border-indigo-600">
                    Previous
                  </Link>
                )}
                {pageNumbers.map((p) => (
                  <Link
                    key={p}
                    href={href(p)}
                    className={
                      "rounded border px-3 py-1.5 " +
                      (p === current ? "border-indigo-600 bg-indigo-600 text-white" : "bg-white hover:border-indigo-600")
                    }
                  >
                    {p}
                  </Link>
                ))}
                {current < totalPages && (
                  <Link href={href(current + 1)} className="rounded border bg-white px-3 py-1.5 hover:border-indigo-600">
                    Next
                  </Link>
                )}
              </nav>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
