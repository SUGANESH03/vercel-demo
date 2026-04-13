import { shopifyFetch } from "@/lib/shopify/shopify";
import { GET_PRODUCTS, GET_COLLECTIONS } from "@/lib/shopify/queries";
import ProductCard from "@/app/components/products/ProductCard";
import CollectionCard from "@/app/components/collections/CollectionCard";
import Section from "@/app/components/Section";

/* ---------------------------- Types ---------------------------- */

interface ShopifyResponse<T> {
  data: T;
}

interface ProductsResponse {
  products: {
    edges: {
      node: any;
    }[];
  };
}

interface CollectionsResponse {
  collections: {
    edges: {
      node: any;
    }[];
  };
}

/* ---------------------------- Page ---------------------------- */

export default async function Home() {
  const [productsRes, collectionsRes] = await Promise.all([
    shopifyFetch<any>({ query: GET_PRODUCTS }),
    shopifyFetch<any>({ query: GET_COLLECTIONS }),
  ]);

  const products = productsRes?.data?.products?.edges ?? [];
  const collections = collectionsRes?.data?.collections?.edges ?? [];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      <Section title="Top Products">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(({ node }: any) => (
            <ProductCard key={node.id} product={node} />
          ))}
        </div>
      </Section>

      <Section title="Top Collections">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map(({ node }: any) => (
            <CollectionCard key={node.id} collection={node} />
          ))}
        </div>
      </Section>
    </main>
  );
}