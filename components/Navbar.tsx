import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import CartLink from "@/components/CartLink";
import WishlistLink from "@/components/WishlistLink";
import { categories, getProducts } from "@/lib/products";

export default async function Navbar() {
  const { userId } = await auth();

  const all = await getProducts();
  const subs: Record<string, string[]> = {};
  for (const p of all) {
    const list = subs[p.category] ?? (subs[p.category] = []);
    if (!list.includes(p.subcategory)) list.push(p.subcategory);
  }

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 py-1.5 text-center text-xs font-medium text-white">
        Free delivery over &#8377;499 &middot; Easy 30-day returns &middot; Cash on delivery
      </div>

      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-pink-500 text-lg font-extrabold text-white">
            M
          </span>
          <span className="text-xl font-extrabold tracking-tight text-gray-900">My Store</span>
        </Link>

        <form action="/" method="get" className="relative order-last w-full md:order-none md:flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            name="q"
            placeholder="Search for products, brands and more"
            className="w-full rounded-lg border border-transparent bg-gray-100 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </form>

        <ul className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
          <li>
            <WishlistLink />
          </li>
          <li>
            <Link href="/orders" className="hover:text-indigo-600">Orders</Link>
          </li>
          <li>
            <CartLink />
          </li>
          {userId ? (
            <li>
              <UserButton />
            </li>
          ) : (
            <>
              <li>
                <SignInButton mode="modal">
                  <button className="hover:text-indigo-600">Sign in</button>
                </SignInButton>
              </li>
              <li>
                <SignUpButton mode="modal">
                  <button className="rounded-full bg-indigo-600 px-4 py-1.5 text-white transition hover:bg-indigo-700">
                    Sign up
                  </button>
                </SignUpButton>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="border-t">
        <ul className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 text-xs font-bold uppercase tracking-wide md:overflow-visible">
          {categories.map((c) => (
            <li key={c} className="group relative">
              <Link
                href={"/?category=" + c + "#shop"}
                className="block whitespace-nowrap border-b-2 border-transparent px-3 py-3 transition hover:border-indigo-600 hover:text-indigo-600"
              >
                {c}
              </Link>

              <div className="absolute left-0 top-full z-40 hidden min-w-52 rounded-b-lg border bg-white p-4 shadow-xl md:group-hover:block md:group-focus-within:block">
                <ul className="space-y-2 text-sm font-medium normal-case tracking-normal text-gray-700">
                  {(subs[c] ?? []).map((s) => (
                    <li key={s}>
                      <Link
                        href={"/?category=" + c + "&sub=" + encodeURIComponent(s) + "#shop"}
                        className="block hover:text-indigo-600"
                      >
                        {s}
                      </Link>
                    </li>
                  ))}
                  <li className="border-t pt-2">
                    <Link
                      href={"/?category=" + c + "#shop"}
                      className="block font-bold text-indigo-600 hover:underline"
                    >
                      View all {c}
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          ))}

          <li>
            <Link
              href="/?discount=50#shop"
              className="block whitespace-nowrap px-3 py-3 text-red-600 transition hover:text-red-700"
            >
              Sale
            </Link>
          </li>
          <li>
            <Link
              href="/?sort=newest#shop"
              className="block whitespace-nowrap px-3 py-3 transition hover:text-indigo-600"
            >
              New
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
