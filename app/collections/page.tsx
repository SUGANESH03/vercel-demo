import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";
import { GET_COLLECTIONS } from "@/lib/queries";

export default async function CollectionsPage() {
  const result = await shopifyFetch<any>({
    query: GET_COLLECTIONS,
  });

  const collections = result?.data?.collections?.edges ?? [];

  return (
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
  );
}
