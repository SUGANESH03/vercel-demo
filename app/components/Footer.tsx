import Link from 'next/link';

type CompanyItem = {
  label: string;
  to: string;
};

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground px-8">
      <div className="container-narrow py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-heading text-3xl font-light">
              Kwel
            </Link>
            <p className="mt-4 text-sm font-light leading-relaxed text-primary-foreground/70">
              Crafting timeless furniture for modern living. Each piece tells a
              story of quality and design.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-label mb-6 text-primary-foreground/50">
              Shop
            </h4>
            <ul className="space-y-3">
              {['Sofas', 'Chairs', 'Beds', 'Dining Tables', 'Home Decor'].map(
                (cat: string) => (
                  <li key={cat}>
                    <Link
                      href={`/catalog?category=${cat}`}
                      className="text-sm font-light text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-label mb-6 text-primary-foreground/50">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '/contact' },
                { label: 'Careers', to: '#' },
                { label: 'Press', to: '#' },
              ].map((item: CompanyItem) => (
                <li key={item.label}>
                  <Link
                    href={item.to}
                    className="text-sm font-light text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-label mb-6 text-primary-foreground/50">
              Support
            </h4>
            <ul className="space-y-3">
              {[
                'Shipping & Returns',
                'Care Guide',
                'FAQ',
                'Trade Program',
              ].map((item: string) => (
                <li key={item}>
                  <span className="text-sm font-light text-primary-foreground/70 hover:text-primary-foreground transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">
            © 2026 Kwel Furniture. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((item: string) => (
              <span
                key={item}
                className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}