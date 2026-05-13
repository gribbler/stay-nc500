import Link from "next/link";
import { towns } from "@/data/towns";

const featuredTownSlugs = ["inverness", "ullapool", "applecross", "durness", "thurso", "dornoch"];

export default function HomePage() {
  const featured = towns.filter((t) => featuredTownSlugs.includes(t.slug));

  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden grain">
        {/* Atmospheric layered background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')",
          }}
        />
        {/* Deep cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(11,14,21,0.92) 0%, rgba(11,14,21,0.75) 50%, rgba(46,38,56,0.6) 100%)",
          }}
        />
        {/* Purple vignette bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 15% 60%, rgba(124,107,140,0.15) 0%, transparent 55%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <span className="rule-gold" />
              <p className="text-heather-light text-xs font-semibold tracking-[0.25em] uppercase">
                Scotland&apos;s North Coast 500
              </p>
            </div>

            <h1
              className="text-5xl md:text-7xl text-cream leading-[1.05] mb-8"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
            >
              Where the Road{" "}
              <em className="text-gold not-italic">meets the</em>{" "}
              Wild
            </h1>

            <p className="text-lg md:text-xl text-cream-dim leading-relaxed mb-12 max-w-xl">
              516 miles of dramatic coastline, ancient mountains, and remote Highland villages.
              Find your perfect stay and plan the journey of a lifetime.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/accommodation"
                className="bg-gold hover:bg-gold-light text-highland font-semibold px-8 py-3.5 tracking-wide transition-colors text-sm uppercase"
                style={{ letterSpacing: "0.08em" }}
              >
                Find Accommodation
              </Link>
              <Link
                href="/towns"
                className="border border-cream/20 hover:border-cream/50 text-cream-dim hover:text-cream font-medium px-8 py-3.5 transition-colors text-sm uppercase"
                style={{ letterSpacing: "0.08em" }}
              >
                Explore the Route
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mist">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-mist to-transparent" />
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <section className="bg-surface border-y border-dim">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "516", label: "Miles of Route" },
              { value: "15+", label: "Towns & Villages" },
              { value: "1,000s", label: "Accommodation Options" },
              { value: "Year-round", label: "Events & Activities" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-gold text-3xl md:text-4xl mb-1"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                >
                  {stat.value}
                </div>
                <div className="text-mist text-xs tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature cards ────────────────────────────────────────────────── */}
      <section className="bg-highland py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-16 max-w-2xl">
            <span className="rule-heather" />
            <h2
              className="text-4xl md:text-5xl text-cream mb-4"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              Plan Your NC500 Journey
            </h2>
            <p className="text-cream-dim text-lg leading-relaxed">
              Everything you need for a perfect Highland road trip — from your first night&apos;s stay
              to the last dramatic viewpoint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-dim">
            {[
              {
                href: "/accommodation",
                number: "01",
                title: "Accommodation",
                description:
                  "Hotels, B&Bs, self-catering cottages, glamping, and wild campsites. Live availability and prices via Booking.com — filtered to every stop on the NC500.",
              },
              {
                href: "/towns",
                number: "02",
                title: "Towns & Places",
                description:
                  "Detailed guides to every major stop on the route — from Inverness to Durness. Highlights, what to see, how to get there, and insider tips.",
              },
              {
                href: "/itineraries",
                number: "03",
                title: "Itineraries",
                description:
                  "Six ready-made road trip plans — from a fast 5-day circuit to a leisurely 10-day exploration. Find the route that fits your schedule and style.",
              },
              {
                href: "/events",
                number: "04",
                title: "Events",
                description:
                  "Highland Games, folk festivals, wildlife weekends, and craft fairs. Auto-updated daily from the official VisitScotland events database.",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-surface hover:bg-elevated p-10 transition-colors block"
              >
                <p
                  className="text-heather text-5xl mb-6 transition-colors group-hover:text-heather-light"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                >
                  {card.number}
                </p>
                <h3
                  className="text-cream text-2xl mb-4 group-hover:text-gold-light transition-colors"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  {card.title}
                </h3>
                <p className="text-mist text-sm leading-relaxed mb-6">{card.description}</p>
                <span className="text-gold text-xs tracking-[0.15em] uppercase group-hover:tracking-[0.2em] transition-all">
                  Explore &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured towns ───────────────────────────────────────────────── */}
      <section className="bg-surface py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="rule-gold" />
              <h2
                className="text-4xl md:text-5xl text-cream"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                Highlights of the Route
              </h2>
            </div>
            <Link
              href="/towns"
              className="hidden sm:block text-cream-dim hover:text-gold text-xs tracking-[0.15em] uppercase transition-colors border-b border-cream-dim/30 hover:border-gold pb-0.5"
            >
              All towns &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-dim">
            {featured.map((town) => (
              <Link
                key={town.slug}
                href={`/towns/${town.slug}`}
                className="group bg-elevated hover:bg-panel overflow-hidden transition-colors block"
              >
                {/* Atmospheric colour header */}
                <div
                  className="h-40 relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a1530 0%, #131720 60%, #0b1220 100%)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity"
                    style={{
                      background:
                        "radial-gradient(ellipse at 30% 60%, rgba(124,107,140,0.5) 0%, transparent 70%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-1">
                      {town.region}
                    </p>
                    <h3
                      className="text-cream text-2xl group-hover:text-gold-light transition-colors"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                    >
                      {town.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-mist text-sm leading-relaxed line-clamp-3 mb-4">
                    {town.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {town.highlights.slice(0, 2).map((h) => (
                      <span
                        key={h}
                        className="bg-heather-dim text-heather-light text-xs px-2.5 py-1"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/towns" className="text-gold text-sm tracking-wide hover:text-gold-light transition-colors">
              View all towns &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden grain py-28"
        style={{
          background:
            "linear-gradient(135deg, #1a1530 0%, #0b0e15 50%, #0e1520 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(201,144,58,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block rule-gold mx-auto mb-2" />
          <h2
            className="text-4xl md:text-5xl text-cream mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Ready to Drive Scotland&apos;s{" "}
            <em className="text-gold not-italic">Greatest Road?</em>
          </h2>
          <p className="text-cream-dim text-lg mb-10 leading-relaxed">
            Find your accommodation now and start planning your NC500 adventure.
          </p>
          <Link
            href="/accommodation"
            className="inline-block bg-gold hover:bg-gold-light text-highland font-semibold px-10 py-4 transition-colors text-sm uppercase tracking-widest"
          >
            Search Accommodation
          </Link>
        </div>
      </section>

    </main>
  );
}
