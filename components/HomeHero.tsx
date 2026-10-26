import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <div className="relative min-h-72 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 p-8 text-white lg:col-span-2 lg:p-12">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-28 h-56 w-56 rounded-full bg-white/10" />
        <div className="relative max-w-md">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink-200">
            End of season sale
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
            Up to 70% OFF on top brands
          </h1>
          <p className="mt-3 text-indigo-100">
            Fashion, footwear, electronics and home. All in one place.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/?discount=50#shop"
              className="rounded-lg bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Shop the sale
            </Link>
            <Link
              href="/?sort=newest#shop"
              className="rounded-lg border border-white/60 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              New arrivals
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <Link
          href="/?category=Footwear#shop"
          className="group relative flex min-h-36 flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-6 text-white"
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15 transition duration-500 group-hover:scale-125" />
          <p className="relative text-xs font-bold uppercase tracking-widest text-emerald-100">
            Footwear
          </p>
          <p className="relative text-2xl font-extrabold">Min 40% OFF</p>
          <p className="relative text-sm text-emerald-50">Sneakers, sandals and more &rarr;</p>
        </Link>

        <Link
          href="/?category=Electronics#shop"
          className="group relative flex min-h-36 flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 p-6 text-white"
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 transition duration-500 group-hover:scale-125" />
          <p className="relative text-xs font-bold uppercase tracking-widest text-slate-300">
            Electronics
          </p>
          <p className="relative text-2xl font-extrabold">Smart deals</p>
          <p className="relative text-sm text-slate-200">Audio, wearables and power &rarr;</p>
        </Link>
      </div>
    </section>
  );
}
