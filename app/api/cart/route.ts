import { NextRequest, NextResponse } from "next/server";
import { createCart, addToCart } from "@/lib/shopify/cart";

export async function POST(req: NextRequest) {
  try {
    const { cartId, variantId, quantity, note } = await req.json();

    if (!variantId) {
      return NextResponse.json(
        { error: "Missing variantId" },
        { status: 400 }
      );
    }

    let finalCartId = cartId;

    // ✅ Create cart if not exists
    if (!finalCartId) {
      finalCartId = await createCart();
    }

    // ✅ Default quantity fallback
    const qty = quantity && quantity > 0 ? quantity : 1;

    // ✅ Add to cart with quantity + note
    await addToCart(finalCartId, variantId, qty, note);

    return NextResponse.json({
      cartId: finalCartId,
      success: true,
    });
  } catch (error) {
    console.error("Cart API error:", error);

    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}