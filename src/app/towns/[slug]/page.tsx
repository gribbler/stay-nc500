import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { towns, getTownBySlug } from "@/data/towns";
import { getEvents, formatEventDate } from "@/lib/events";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return towns.map((town) => ({ slug: town.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) return {};
  const description = town.description.slice(0, 160);
  return {
    title: `${town.name} — NC500 Travel Guide`,
    description,
    alternates: { canonical: `https://www.staync500.com/towns/${slug}` },
    openGraph: {
      title: `${town.name} — NC500 Travel Guide`,
      description,
      type: "article",
      url: `https://www.staync500.com/towns/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${town.name} — NC500 Travel Guide`,
      description,
    },
  };
}

export default async function TownPage({ params }: Props) {
  const { slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) notFound();

  const townIndex = towns.findIndex((t) => t.slug === slug);
  const prevTown = townIndex > 0 ? towns[townIndex - 1] : null;
  const nextTown = townIndex < towns.length - 1 ? towns[townIndex + 1] : null;

  const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
    town.name + ", Scotland"
  )}&lang=en-gb`;

  const { events } = await getEvents();
  const townEvents = events.filter(
    (e) => e.town?.toLowerCase() === town.name.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-highland">

      {/* Hero */}
      <section className="relative overflow-hidden grain border-b border-dim py-24">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1a1530 0%, #0b0e15 60%, #0e1520 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 15% 55%, rgba(124,107,140,0.2) 0%, transparent 55%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/towns"
            className="text-mist hover:text-gold text-xs tracking-widest uppercase mb-8 inline-block transition-colors"
          >
            &larr; All towns
          </Link>

          <span className="rule-gold" />
          <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-4">
            {town.region}
          </p>
          <h1
            className="text-5xl md:text-7xl text-cream mb-6 leading-[1.05]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            {town.name}
          </h1>
          <p className="text-cream-dim text-lg leading-relaxed max-w-3xl">{town.description}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Highlights */}
            <section className="bg-surface border border-dim p-8">
              <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-5">Highlights</p>
              <ul className="space-y-3">
                {town.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-4">
                    <span className="text-gold mt-0.5 flex-shrink-0 text-xs">✦</span>
                    <span className="text-cream-dim text-sm leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Getting there */}
            <section className="bg-surface border border-dim p-8">
              <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-4">Getting There</p>
              <p className="text-cream-dim text-sm leading-relaxed">{town.gettingThere}</p>
            </section>

            {/* Upcoming Events */}
            {townEvents.length > 0 && (
              <section className="bg-surface border border-dim p-8">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-heather-light text-xs tracking-[0.2em] uppercase">Upcoming Events</p>
                  <Link
                    href={`/events?category=`}
                    className="text-mist hover:text-gold text-xs tracking-widest uppercase transition-colors"
                  >
                    All events &rarr;
                  </Link>
                </div>
                <ul className="space-y-4">
                  {townEvents.slice(0, 5).map((event) => (
                    <li key={event.id} className="border-t border-dim pt-4 first:border-t-0 first:pt-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-cream text-sm font-medium leading-snug mb-1">
                            {event.title}
                          </p>
                          <p className="text-gold text-xs uppercase tracking-wider">
                            {formatEventDate(event.startDate, event.endDate)}
                          </p>
                          {event.location && event.location !== town.name && (
                            <p className="text-mist text-xs mt-0.5">{event.location}</p>
                          )}
                        </div>
                        {event.url && (
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold hover:text-gold-light text-xs uppercase tracking-wide flex-shrink-0 transition-colors"
                          >
                            Details &rarr;
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                {townEvents.length > 5 && (
                  <Link
                    href="/events"
                    className="mt-5 inline-block text-mist hover:text-gold text-xs tracking-widest uppercase transition-colors"
                  >
                    +{townEvents.length - 5} more events &rarr;
                  </Link>
                )}
              </section>
            )}

            {/* Accommodation */}
            <section className="bg-surface border border-dim p-8">
              <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-4">Accommodation</p>
              <p className="text-cream-dim text-sm leading-relaxed mb-6">{town.accommodation}</p>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-gold text-gold hover:bg-gold hover:text-highland text-xs font-semibold px-6 py-2.5 transition-colors uppercase tracking-widest"
              >
                Search {town.name} on Booking.com
              </a>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Map */}
            <div className="bg-surface border border-dim overflow-hidden">
              <div
                className="aspect-square flex flex-col items-center justify-center gap-3 text-center p-6"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1530 0%, #131720 100%)",
                }}
              >
                <div
                  className="text-heather text-4xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  ◈
                </div>
                <p
                  className="text-cream text-lg"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  {town.name}
                </p>
                <p className="text-mist text-xs">
                  {town.coordinates.lat.toFixed(4)}°N,{" "}
                  {Math.abs(town.coordinates.lng).toFixed(4)}°W
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${town.coordinates.lat},${town.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light text-xs underline underline-offset-2 transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Quick facts */}
            <div className="bg-surface border border-dim p-6">
              <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-5">
                Quick Facts
              </p>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-mist text-xs uppercase tracking-wider mb-1">Region</dt>
                  <dd className="text-cream">{town.region}</dd>
                </div>
                <div>
                  <dt className="text-mist text-xs uppercase tracking-wider mb-1">Coordinates</dt>
                  <dd className="text-cream font-mono text-xs">
                    {town.coordinates.lat.toFixed(3)}°N,{" "}
                    {Math.abs(town.coordinates.lng).toFixed(3)}°W
                  </dd>
                </div>
                <div>
                  <dt className="text-mist text-xs uppercase tracking-wider mb-1">Top highlight</dt>
                  <dd className="text-cream">{town.highlights[0]}</dd>
                </div>
              </dl>
            </div>

            {/* Book CTA */}
            <div
              className="p-6 text-center border border-dim"
              style={{
                background:
                  "linear-gradient(135deg, #1a1530 0%, #131720 100%)",
              }}
            >
              <p
                className="text-cream text-lg mb-2"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                Staying in {town.name}?
              </p>
              <p className="text-mist text-xs mb-5">Find and book the best accommodation.</p>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gold hover:bg-gold-light text-highland text-xs font-semibold px-4 py-3 transition-colors uppercase tracking-widest"
              >
                Search on Booking.com
              </a>
            </div>
          </div>
        </div>

        {/* Prev / next navigation */}
        <div className="mt-12 grid grid-cols-2 gap-px bg-dim">
          <div>
            {prevTown ? (
              <Link
                href={`/towns/${prevTown.slug}`}
                className="group flex items-center gap-4 bg-surface hover:bg-elevated p-6 transition-colors h-full"
              >
                <span className="text-mist group-hover:text-gold text-lg transition-colors">&larr;</span>
                <div>
                  <p className="text-mist text-xs uppercase tracking-widest mb-1">Previous stop</p>
                  <p
                    className="text-cream group-hover:text-gold-light transition-colors"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                  >
                    {prevTown.name}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="bg-surface p-6 h-full" />
            )}
          </div>
          <div>
            {nextTown ? (
              <Link
                href={`/towns/${nextTown.slug}`}
                className="group flex items-center justify-end gap-4 bg-surface hover:bg-elevated p-6 transition-colors h-full text-right"
              >
                <div>
                  <p className="text-mist text-xs uppercase tracking-widest mb-1">Next stop</p>
                  <p
                    className="text-cream group-hover:text-gold-light transition-colors"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                  >
                    {nextTown.name}
                  </p>
                </div>
                <span className="text-mist group-hover:text-gold text-lg transition-colors">&rarr;</span>
              </Link>
            ) : (
              <div className="bg-surface p-6 h-full" />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
