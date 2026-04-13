import { shopifyFetch } from "@/lib/shopify/shopify";
import { GET_COLLECTIONS } from "@/lib/shopify/queries";
import CollectionCard from "@/app/components/collections/CollectionCard";

export default async function CollectionsPage() {
  const result = await shopifyFetch<any>({
    query: GET_COLLECTIONS,
  });

  const collections =
    result?.data?.collections?.edges ?? [];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-8">
        All Collections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map(({ node }: any) => (
          <CollectionCard
            key={node.id}
            collection={node}
          />
        ))}
      </div>
    </main>
  );
}