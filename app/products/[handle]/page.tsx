
import { shopifyFetch } from "@/lib/shopify/shopify";
import { GET_PRODUCT_BY_HANDLE } from "@/lib/shopify/queries";
import { notFound } from "next/navigation";
import AddToCartButton from "@/app/components/cart/AddToCartButton";
import styles from "./product-page.module.css";
import QuantityBtn from "@/app/components/QuantityBtn";
import SpecialInstruction from "@/app/components/SpecialInstructions";
import ProductMainVar from "@/app/components/ProductMainVar";
import ProductClient from "@/app/components/ProductClient";
import VariantsBtn from "@/app/components/VariantsBtn";

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

  const images = product.images?.edges ?? [];
  const variantId = product.variants?.edges?.[0]?.node?.id;
  const variants=product.variants?.edges?.map((edge: any) => edge.node) ?? [];

  if (!variantId) {
    throw new Error("Product has no variants");
  }


  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
      <ProductMainVar
  images={images}
  variants={product.variants.edges}
/>

        <div className={styles.content}>
          <h1 className={styles.title}>{product.title}</h1>

          <p className={styles.description}>
            {product.description}
          </p>
          <VariantsBtn variants={variants}  />
          <p className={styles.price}>
            {product.priceRange.minVariantPrice.amount}{" "}
            {product.priceRange.minVariantPrice.currencyCode}
          </p>
           <ProductClient variantId={variantId}/>
          
          </div>
        
      </div>
    </main>
  );
}