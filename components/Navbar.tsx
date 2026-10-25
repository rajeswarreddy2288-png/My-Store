import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import CartLink from "@/components/CartLink";
import WishlistLink from "@/components/WishlistLink";
import { categories } from "@/lib/products";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm">
      <div className="bg-indigo-700 py-1.5 text-center text-xs text-white">
        Free delivery on orders over &#8377;499 &middot; Easy 30-day returns
      </div>

      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3">
        <Link href="/" className="text-2xl font-bold tracking-tight text-indigo-700">
          My Store
        </Link>

        <form action="/" method="get" className="order-last w-full md:order-none md:w-auto md:flex-1">
          <input
            name="q"
            placeholder="Search for products, brands and more"
            className="w-full rounded-md bg-gray-100 px-4 py-2 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-indigo-400"
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
                  <button className="rounded-full bg-indigo-600 px-4 py-1.5 text-white hover:bg-indigo-700">
                    Sign up
                  </button>
                </SignUpButton>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="border-t">
        <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-2 text-xs font-bold uppercase tracking-wide">
          {categories.map((c) => (
            <Link
              key={c}
              href={"/?category=" + c + "#shop"}
              className="whitespace-nowrap py-1 hover:text-indigo-600"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
