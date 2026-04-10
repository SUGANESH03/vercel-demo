import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCTS } from "@/lib/queries";
import Link from "next/link";

export default async function Home() {
  const result = await shopifyFetch<any>({ query: GET_PRODUCTS });

  const products = result?.data?.products?.edges ?? [];

  return (
    <main className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {products.map(({ node }: any) => (
        <div key={node.id} className="border p-4">
          
<Link
          key={node.id}
          href={`/products/${node.handle}`}
          className="border p-4 block hover:shadow-md transition"
        >

            {node.images.edges.length > 0 && (
            <img
              src={node.images.edges[0].node.url}
              alt={node.title}
              className="w-full h-auto mt-4"
            />
          )}

          <h2>{node.title}</h2>
          <p>
            {node.priceRange.minVariantPrice.amount}
          </p>
        </Link>
        </div>
      ))}
    </main>
  );
}