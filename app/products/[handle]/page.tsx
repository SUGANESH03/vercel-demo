import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCT_BY_HANDLE } from "@/lib/queries";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: Props) {

  const { handle } = await params;

  const result = await shopifyFetch<any>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
  });

  const product = result?.data?.productByHandle;

  if (!product) {
    notFound();
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      {product.images.edges.length > 0 && (
        <img
          src={product.images.edges[0].node.url}
          alt={product.title}
          className="w-full max-w-md mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

      <p className="text-xl mb-4">
        {product.priceRange.minVariantPrice.amount}{" "}
        {product.priceRange.minVariantPrice.currencyCode}
      </p>

      <p className="text-gray-700">{product.description}</p>
    </main>
  );
}
