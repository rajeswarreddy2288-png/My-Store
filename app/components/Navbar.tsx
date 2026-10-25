import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          🛍️ My Store
        </Link>

        <ul className="flex items-center gap-6 text-sm font-medium">
          <li>
            <Link href="/" className="hover:text-blue-600">Products</Link>
          </li>
          <li>
            <Link href="/orders" className="hover:text-blue-600">Orders</Link>
          </li>
          <li>
            <Link href="/cart" className="hover:text-blue-600">Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}