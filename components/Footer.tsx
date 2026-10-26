import Link from "next/link";
import { categories } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-indigo-700">My Store</p>
          <p className="mt-2 text-gray-500">
            Fashion, footwear, electronics and home, all in one place.
          </p>
        </div>

        <div>
          <p className="mb-3 font-bold uppercase tracking-wide">Shop</p>
          <ul className="space-y-2 text-gray-600">
            {categories.map((c) => (
              <li key={c}>
                <Link href={"/?category=" + c + "#shop"} className="hover:text-indigo-600">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-bold uppercase tracking-wide">Help</p>
          <ul className="space-y-2 text-gray-600">
            <li><Link href="/info/shipping" className="hover:text-indigo-600">Shipping</Link></li>
            <li><Link href="/info/returns" className="hover:text-indigo-600">Returns and exchanges</Link></li>
            <li><Link href="/info/contact" className="hover:text-indigo-600">Contact us</Link></li>
            <li><Link href="/orders" className="hover:text-indigo-600">Track orders</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-bold uppercase tracking-wide">Company</p>
          <ul className="space-y-2 text-gray-600">
            <li><Link href="/info/about" className="hover:text-indigo-600">About us</Link></li>
            <li><Link href="/info/privacy" className="hover:text-indigo-600">Privacy policy</Link></li>
            <li><Link href="/info/terms" className="hover:text-indigo-600">Terms of use</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} My Store. All rights reserved.
      </div>
    </footer>
  );
}
