"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCartId,
  setCartId,
} from "@/lib/shopify/cartClient";

interface AddToCartButtonProps {
  variantId: string;
  quantity: number;
  note: string;
}

export default function AddToCartButton({
  variantId,
  quantity,
  note,
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAddToCart() {
    setLoading(true);

    try {
      const cartId = getCartId();

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  cartId,
  variantId,
  quantity,
  note,
}),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      // ✅ Persist cart ID for later use
      setCartId(data.cartId);

      // ✅ STEP 3 — Redirect WITH cartId
      router.push(`/cart?cartId=${encodeURIComponent(data.cartId)}`);
    } catch (error) {
      console.error("Add to cart failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="bg-black text-white px-6 py-3 rounded-md disabled:opacity-50"
    >
      {loading ? "Adding…" : "Add to Cart"}
    </button>
  );
}