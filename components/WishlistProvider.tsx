"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type WishItem = {
  id: string;
  name: string;
  price: number;
  color: string;
  image?: string;
};

type WishlistContextType = {
  items: WishItem[];
  loaded: boolean;
  count: number;
  has: (id: string) => boolean;
  toggle: (item: WishItem) => void;
};

const WishlistContext = createContext<WishlistContextType | null>(null);
const STORAGE_KEY = "my-store-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // ignore broken saved data
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        // ignore storage errors
      }
    }
  }, [items, loaded]);

  function has(id: string) {
    return items.some((i) => i.id === id);
  }

  function toggle(item: WishItem) {
    setItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  }

  return (
    <WishlistContext.Provider
      value={{ items, loaded, count: items.length, has, toggle }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
