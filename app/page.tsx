import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCTS } from "@/lib/queries";
import { GET_COLLECTIONS } from "@/lib/queries";
import Link from "next/link";

export default async function Home() {
  const product_result = await shopifyFetch<any>({ query: GET_PRODUCTS });
  const collection_result = await shopifyFetch<any>({ query: GET_COLLECTIONS });

  const products = product_result?.data?.products?.edges ?? [];
  const collections= collection_result?.data?.collections?.edges ?? [];
  return (
    <section className="py-8 max-w-6xl mx-auto">
    <h2>Our Top Products</h2>
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
    <h2>Our Top Collections</h2>
    <main className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
      
       {collections.map(({ node }: any) => (
        <Link
          key={node.id}
          href={`/collections/${node.handle}`}
          className="border p-4 block"
        >
          {node.image && (
            <img
              src={node.image.url}
              alt={node.image.altText || node.title}
              className="w-full h-auto mb-4"
            />
          )}

          <h2 className="text-lg font-semibold">
            {node.title}
          </h2>
        </Link>
      ))}
    </main>
    </section>
  );
}