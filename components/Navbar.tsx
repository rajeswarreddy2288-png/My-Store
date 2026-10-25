import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import CartLink from "@/components/CartLink";
import WishlistLink from "@/components/WishlistLink";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm">
      <div className="bg-indigo-700 py-1.5 text-center text-xs text-white">
        Free shipping on orders over $50
      </div>
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3">
        <Link href="/" className="text-2xl font-bold tracking-tight text-indigo-700">
          My Store
        </Link>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
          <li>
            <Link href="/" className="hover:text-indigo-600">Shop</Link>
          </li>
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
    </header>
  );
}
