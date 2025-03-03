"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useGlobalState } from "@/context/GlobalContext";

export function CartIcon() {
  const { cart } = useGlobalState();
  const totalItems = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.quantity, 0)
    : 0;


  return (
    <Link href="/cart" className="relative hover:text-blue-400 transition">
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
