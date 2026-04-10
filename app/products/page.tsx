import { shopifyFetch } from "@/lib/shopify";
import { GET_PRODUCTS } from "@/lib/queries";
import ProductCard from "@/app/components/ProductCard";

export default async function ProductsPage() {
  const result = await shopifyFetch<any>({
    query: GET_PRODUCTS,
  });

  const products =
    result?.data?.products?.edges ?? [];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-8">
        All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(({ node }: any) => (
          <ProductCard
            key={node.id}
            product={node}
          />
        ))}
      </div>
    </main>
  );
}