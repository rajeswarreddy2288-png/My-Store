import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { WishlistProvider } from "@/components/WishlistProvider";

export const metadata: Metadata = {
  title: "My Store",
  description: "A scalable Next.js e-commerce application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
                {children}
              </main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
