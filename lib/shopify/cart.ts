// lib/shopify/cart.ts
import { shopifyFetch } from "@/lib/shopify/shopify";

const CART_CREATE = `
mutation CartCreate {
  cartCreate {
    cart {
      id
    }
  }
}
`;

const CART_LINES_ADD = `
mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      totalQuantity
      lines(first: 10) {
        edges {
          node {
            quantity
            attributes {
              key
              value
            }
            merchandise {
              ... on ProductVariant {
                product {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export async function createCart(): Promise<string> {
  const result = await shopifyFetch<any>({
    query: CART_CREATE,
  });

  return result.data.cartCreate.cart.id;
}

// 🔥 UPDATED FUNCTION
export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number,
  note: string
) {
  return shopifyFetch<any>({
    query: CART_LINES_ADD,
    variables: {
      cartId,
      lines: [
        {
          merchandiseId: variantId,
          quantity,
          attributes: note
            ? [
                {
                  key: "Special Instructions",
                  value: note,
                },
              ]
            : [],
        },
      ],
    },
  });
}