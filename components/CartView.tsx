"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

const FREE_SHIPPING_OVER = 50;
const SHIPPING_FEE = 5.99;
const PAYMENTS_ENABLED = false;

export default function CartView() {
  const { items, loaded, total, setQuantity, removeItem, clearCart } = useCart();

  if (!loaded) {
    return <p className="text-gray-500">Loading your cart...</p>;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Add something you like and it will show up here.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const shipping = total >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
  const grandTotal = total + shipping;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <Link href="/" className="text-sm text-indigo-600 hover:underline">
          Continue shopping
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="divide-y rounded-xl border bg-white">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4">
              <div
                className={
                  "flex h-20 w-20 shrink-0 items-center justify-center rounded-lg text-2xl font-bold text-white/70 " +
                  item.color
                }
              >
                {item.image ? <img src={item.image} alt={item.name} className="h-full w-full rounded-lg object-cover" /> : item.name.charAt(0)}
              </div>

              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>{item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="mt-1 text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity(item.id, item.quantity - 1)}
                  className="h-8 w-8 rounded-full border text-lg hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-6 text-center font-medium">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8 rounded-full border text-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <p className="w-20 text-right font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <aside className="h-fit space-y-3 rounded-xl border bg-white p-5">
          <h2 className="text-lg font-bold">Summary</h2>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Delivery</span>
            <span>{shipping === 0 ? "Free" : "$" + shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-3 text-lg font-bold">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
          <button
            type="button"
            className="w-full rounded-lg bg-gray-900 py-3 font-medium text-white hover:bg-gray-700"
          >
            Checkout
          </button>
          <p className="text-center text-xs text-gray-400">
            Payment is added in the next step.
          </p>
          <button
            type="button"
            onClick={clearCart}
            className="w-full text-sm text-gray-500 hover:text-red-500"
          >
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}



