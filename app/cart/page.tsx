import { shopifyFetch } from "@/lib/shopify/shopify";

const GET_CART = `
query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    totalQuantity
    checkoutUrl
    lines(first: 20) {
      edges {
        node {
          id
          quantity
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
`;

type Props = {
  searchParams: Promise<{
    cartId?: string;
  }>;
};

export default async function CartPage({ searchParams }: Props) {
  // ✅ MUST unwrap
  const { cartId: rawCartId } = await searchParams;

  if (!rawCartId) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
      </main>
    );
  }

  // ✅ Decode Shopify cart GID
  const cartId = decodeURIComponent(rawCartId);

  const result = await shopifyFetch<any>({
    query: GET_CART,
    variables: { cartId },
  });

  const cart = result.data.cart;

  if (!cart) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        Your Cart ({cart.totalQuantity})
      </h1>

      <ul className="space-y-4">
        {cart.lines.edges.map(({ node }: any) => (
          <li
            key={node.id}
            className="flex justify-between border-b pb-2"
          >
            <span>{node.merchandise.product.title}</span>
            <span>Qty: {node.quantity}</span>
          </li>
        ))}
      </ul>

      <a
        href={cart.checkoutUrl}
        className="inline-block bg-black text-white px-6 py-3 rounded-md"
      >
        Checkout
      </a>
    </main>
  );
}