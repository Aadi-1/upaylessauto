const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Contact Us", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 — Brand */}
          <div>
            {/* TODO: Replace with <Image> logo when asset is provided */}
            <div className="font-heading font-bold text-xl">
              <span className="text-brand-light">UPayLess</span>
              <span className="text-brand-orange"> Auto Repair</span>
            </div>
            <p className="text-sm text-brand-muted mt-4 max-w-xs leading-relaxed font-body">
              Full-service auto repair specializing in brakes, oil changes,
              suspension, timing belts, tune-ups, and diagnostics. Serving Simi
              Valley for over 15 years.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-brand-light uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-muted hover:text-brand-orange transition-colors font-body"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-brand-light uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:8053002996"
                  className="text-sm text-brand-muted hover:text-brand-orange transition-colors font-body"
                >
                  (805) 300-2996
                </a>
              </li>
              <li>
                <a
                  href="mailto:upaylessautorepair2018@gmail.com"
                  className="text-sm text-brand-muted hover:text-brand-orange transition-colors font-body"
                >
                  upaylessautorepair2018@gmail.com
                </a>
              </li>
              <li>
                <p className="text-sm text-brand-muted font-body">
                  900 W Los Angeles Ave #1795
                  <br />
                  Simi Valley, CA 93065
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-muted font-body">
            © 2025 UPayLess Auto Repair. All rights reserved.
          </p>
          <a
            href="https://www.clickbuilt.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-muted hover:text-brand-orange transition-colors font-body"
          >
            Website by ClickBuilt
          </a>
        </div>
      </div>
    </footer>
  );
}
