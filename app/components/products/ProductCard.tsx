import Link from "next/link";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  // ✅ ABSOLUTE SAFETY GUARD
  if (!product) {
    console.error("ProductCard received undefined product");
    return null;
  }

  const image = product?.images?.edges?.[0]?.node;
  const price =
    product?.priceRange?.minVariantPrice?.amount;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="border rounded-lg hover:shadow-md transition overflow-hidden block"
    >
      {image && (
        <img
          src={image.url}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4 space-y-1">
        <h3 className="font-medium text-lg">
          {product.title}
        </h3>

        {price && (
          <p className="text-gray-600">
            ₹{Number(price).toLocaleString()}
          </p>
        )}
      </div>
    </Link>
  );
}