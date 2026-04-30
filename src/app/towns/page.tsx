import type { Metadata } from "next";
import Link from "next/link";
import { towns } from "@/data/towns";

export const metadata: Metadata = {
  title: "Towns & Places along the NC500 | Stay NC500",
  description:
    "Explore every major town and village along the North Coast 500 route — from Inverness to Durness, Thurso, and back.",
};

const regions = [
  "Inverness-shire",
  "Ross-shire",
  "Wester Ross",
  "Assynt, Sutherland",
  "Sutherland",
  "Caithness",
];

export default function TownsPage() {
  const byRegion = regions.map((region) => ({
    region,
    towns: towns.filter((t) => t.region === region),
  }));

  return (
    <main className="min-h-screen bg-highland">

      {/* Header */}
      <section className="relative overflow-hidden grain border-b border-dim py-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 60%, rgba(124,107,140,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="rule-gold" />
          <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-4">The Route</p>
          <h1
            className="text-5xl md:text-6xl text-cream mb-5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            Towns & Places
          </h1>
          <p className="text-cream-dim text-lg max-w-2xl leading-relaxed">
            The NC500 passes through some of Britain&apos;s most remote and spectacular landscapes.
            Travelling clockwise from Inverness, here&apos;s every major stop on the route.
          </p>
        </div>
      </section>

      {/* Breadcrumb route strip */}
      <section className="bg-surface border-b border-dim py-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 items-center whitespace-nowrap min-w-0">
            <span className="text-mist text-xs tracking-widest uppercase mr-3 flex-shrink-0">
              Route
            </span>
            {towns.map((town, i) => (
              <span key={town.slug} className="flex items-center gap-1 flex-shrink-0">
                <Link
                  href={`/towns/${town.slug}`}
                  className="text-xs text-cream-dim hover:text-gold transition-colors"
                >
                  {town.name}
                </Link>
                {i < towns.length - 1 && (
                  <span className="text-dim mx-0.5">›</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Towns by region */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {byRegion.map(({ region, towns: regionTowns }) =>
          regionTowns.length === 0 ? null : (
            <div key={region} className="mb-16">
              <div className="flex items-center gap-5 mb-8">
                <span className="h-px w-8 bg-heather flex-shrink-0" />
                <h2
                  className="text-heather-light text-xs tracking-[0.2em] uppercase"
                >
                  {region}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-dim">
                {regionTowns.map((town) => (
                  <Link
                    key={town.slug}
                    href={`/towns/${town.slug}`}
                    className="group bg-surface hover:bg-elevated overflow-hidden transition-colors block"
                  >
                    {/* Coloured header */}
                    <div
                      className="h-36 relative overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, #1a1530 0%, #131720 70%, #0b1220 100%)",
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity"
                        style={{
                          background:
                            "radial-gradient(ellipse at 30% 70%, rgba(124,107,140,0.6) 0%, transparent 65%)",
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3
                          className="text-cream text-2xl group-hover:text-gold-light transition-colors"
                          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                        >
                          {town.name}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-mist text-sm leading-relaxed line-clamp-3 mb-5">
                        {town.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {town.highlights.slice(0, 2).map((h) => (
                          <span
                            key={h}
                            className="bg-heather-dim text-heather-light text-xs px-2.5 py-1"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                      <span className="text-gold text-xs tracking-[0.15em] uppercase group-hover:tracking-[0.2em] transition-all">
                        View guide &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        )}
      </section>
    </main>
  );
}
