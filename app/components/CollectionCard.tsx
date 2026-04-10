import Link from "next/link";

interface CollectionCardProps {
  collection: any;
}

export default function CollectionCard({
  collection,
}: CollectionCardProps) {
  // ✅ Absolute safety guard
  if (!collection) {
    console.error("CollectionCard received undefined collection");
    return null;
  }

  const image = collection.image;

  return (
    <Link
      href={`/collections/${collection.handle}`}
      className="border rounded-lg overflow-hidden hover:shadow-lg transition block"
    >
      {image && (
        <img
          src={image.url}
          alt={image.altText || collection.title}
          className="w-full h-56 object-cover"
        />
      )}

      <div className="p-4">
        <h3 className="font-medium text-lg">
          {collection.title}
        </h3>
      </div>
    </Link>
  );
}
