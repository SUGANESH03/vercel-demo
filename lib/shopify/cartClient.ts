
// lib/shopify/cartClient.ts
export function getCartId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cartId");
}

export function setCartId(cartId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cartId", cartId);
}
