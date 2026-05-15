import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-dim mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <p
              className="text-cream text-2xl mb-4"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              Stay <span className="text-gold italic">NC500</span>
            </p>
            <p className="text-mist text-sm leading-relaxed">
              Your guide to accommodation and travel along Scotland&apos;s legendary North Coast 500 route.
              516 miles of rugged coastline, ancient peaks, and remote beauty.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-heather-light text-xs font-semibold tracking-widest uppercase mb-5">
              Explore
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/accommodation", label: "Find Accommodation" },
                { href: "/towns", label: "Towns & Places" },
                { href: "/itineraries", label: "Itineraries" },
                { href: "/blog", label: "Blog" },
                { href: "/events", label: "Events" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-cream-dim hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="text-heather-light text-xs font-semibold tracking-widest uppercase mb-5">
              About the Route
            </p>
            <p className="text-mist text-sm leading-relaxed">
              The North Coast 500 is a 516-mile circular touring route around the Scottish Highlands,
              starting and ending in Inverness. Often called Scotland&apos;s answer to Route 66.
            </p>
          </div>
        </div>

        <div className="border-t border-dim mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-mist text-xs">
            &copy; {new Date().getFullYear()} Stay NC500. All rights reserved.
          </p>
          <p className="text-mist text-xs text-center">
            Accommodation via Booking.com affiliate programme &middot; Events via VisitScotland / Data Thistle
          </p>
        </div>
      </div>
    </footer>
  );
}
