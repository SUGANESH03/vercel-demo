import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b mb-6">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold">
          Kwel Furniture
        </Link>

        {/* Menu items */}
        <div className="flex gap-6 text-sm font-medium">
          <Link
            href="/"
            className="hover:text-gray-600"
          >
            Home
          </Link>

          <Link
            href="/collections"
            className="hover:text-gray-600"
          >
            Collections
          </Link>
          <Link
            href="/products"
            className="hover:text-gray-600"
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
}