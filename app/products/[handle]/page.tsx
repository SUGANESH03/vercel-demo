import { shopifyFetch } from "@/lib/shopify/shopify";
import { GET_PRODUCT_BY_HANDLE } from "@/lib/shopify/queries";
import { notFound } from "next/navigation";
import AddToCartButton from "@/app/components/cart/AddToCartButton";
import styles from "./product-page.module.css";
import QuantityBtn from "@/app/components/QuantityBtn";

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

  if (!variantId) {
    throw new Error("Product has no variants");
  }


  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.imageGallery}>
  {images.map((img: any, index: number) => (
    <img
      key={img.node.id ?? index}
      src={img.node.url}
      alt={img.node.altText ?? `${product.title} image ${index + 1}`}
      className={styles.productImage}
    />
  ))}
</div>

        <div className={styles.content}>
          <h1 className={styles.title}>{product.title}</h1>

          <p className={styles.description}>
            {product.description}
          </p>

          <p className={styles.price}>
            {product.priceRange.minVariantPrice.amount}{" "}
            {product.priceRange.minVariantPrice.currencyCode}
          </p>
          <div className={styles.quantityAndCart}>
          <QuantityBtn />
          <AddToCartButton variantId={variantId} />
          </div>
          
          </div>
        
      </div>
    </main>
  );
}