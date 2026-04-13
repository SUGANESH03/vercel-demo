import { shopifyFetch } from "@/lib/shopify/shopify";
import { GET_PRODUCT_BY_HANDLE } from "@/lib/shopify/queries";
import { notFound } from "next/navigation";
import AddToCartButton from "@/app/components/cart/AddToCartButton";

type Props = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;

  const result = await shopifyFetch<any>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
  });

  const product = result?.data?.productByHandle;

  if (!product) notFound();

  const image = product.images?.edges?.[0]?.node;

  const variantId =
    product.variants?.edges?.[0]?.node?.id;

  if (!variantId) {
    throw new Error("Product has no variants");
  }

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-6">
      {image && (
        <img
          src={image.url}
          alt={image.altText ?? product.title}
          className="max-w-md"
        />
      )}

      <h1 className="text-3xl font-bold">
        {product.title}
      </h1>

      <p className="text-xl">
        {product.priceRange.minVariantPrice.amount}{" "}
        {product.priceRange.minVariantPrice.currencyCode}
      </p>

      <AddToCartButton variantId={variantId} />
    </main>
  );
}
``