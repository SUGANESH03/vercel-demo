import { shopifyFetch } from "@/lib/shopify";
import { GET_COLLECTION_BY_HANDLE } from "@/lib/queries";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;

  const result = await shopifyFetch<any>({
    query: GET_COLLECTION_BY_HANDLE,
    variables: { handle },
  });

  const collection = result?.data?.collectionByHandle;

  if (!collection) {
    notFound();
  }

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {collection.title}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {collection.products.edges.map(({ node }: any) => (
          <Link
            key={node.id}
            href={`/products/${node.handle}`}
            className="border p-4 block hover:shadow-lg"
          >
            {node.images.edges.length > 0 && (
              <img
                src={node.images.edges[0].node.url}
                alt={node.title}
                className="w-full h-auto mb-3"
              />
            )}

            <h3 className="text-lg font-semibold">
              {node.title}
            </h3>

            <p>
              {node.priceRange.minVariantPrice.amount}{" "}
              {
                node.priceRange.minVariantPrice
                  .currencyCode
              }
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
