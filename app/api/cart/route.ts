
// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createCart, addToCart } from "@/lib/shopify/cart";

export async function POST(req: NextRequest) {
  try {
    const { cartId, variantId } = await req.json();

    if (!variantId) {
      return NextResponse.json(
        { error: "Missing variantId" },
        { status: 400 }
      );
    }

    let finalCartId = cartId;

    if (!finalCartId) {
      finalCartId = await createCart();
    }
    
await addToCart(finalCartId, variantId);

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
