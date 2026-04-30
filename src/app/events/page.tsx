import type { Metadata } from "next";
import Link from "next/link";
import { getEvents, formatEventDate } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events along the NC500 | Stay NC500",
  description:
    "Discover festivals, Highland Games, wildlife events, and more happening along the North Coast 500 route in Scotland.",
};

export const revalidate = 3600;

const categoryStyles: Record<string, { dot: string; label: string; active: string }> = {
  "Highland Games":      { dot: "bg-red-400",     label: "text-red-300 border-red-800",     active: "bg-red-900 text-red-200 border-red-600" },
  "Arts & Culture":      { dot: "bg-purple-400",   label: "text-purple-300 border-purple-800", active: "bg-purple-900 text-purple-200 border-purple-600" },
  "Science & Education": { dot: "bg-blue-400",     label: "text-blue-300 border-blue-800",   active: "bg-blue-900 text-blue-200 border-blue-600" },
  Motoring:              { dot: "bg-orange-400",   label: "text-orange-300 border-orange-800", active: "bg-orange-900 text-orange-200 border-orange-600" },
  Music:                 { dot: "bg-green-400",    label: "text-green-300 border-green-800",  active: "bg-green-900 text-green-200 border-green-600" },
  "Nature & Wildlife":   { dot: "bg-emerald-400",  label: "text-emerald-300 border-emerald-800", active: "bg-emerald-900 text-emerald-200 border-emerald-600" },
  Event:                 { dot: "bg-mist",         label: "text-mist border-dim",            active: "bg-elevated text-cream border-heather" },
};

function getCategoryStyle(cat: string) {
  return categoryStyles[cat] ?? categoryStyles["Event"];
}

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function EventsPage({ searchParams }: Props) {
  const { category: activeCategory } = await searchParams;
  const { events, source } = await getEvents();
  const categories = [...new Set(events.map((e) => e.category))].sort();
  const filtered = activeCategory
    ? events.filter((e) => e.category === activeCategory)
    : events;

  return (
    <main className="min-h-screen bg-highland">

      {/* Header */}
      <section className="relative overflow-hidden grain border-b border-dim py-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(124,107,140,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="rule-gold" />
          <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-4">What&apos;s On</p>
          <h1
            className="text-5xl md:text-6xl text-cream mb-5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            Events along the NC500
          </h1>
          <p className="text-cream-dim text-lg max-w-2xl leading-relaxed">
            Highland Games, folk festivals, wildlife weekends, and craft fairs — discover what&apos;s
            happening along the route during your visit.
          </p>
        </div>
      </section>

      {/* Status banner */}
      {source === "sample" && (
        <div className="bg-gold-dim border-b border-gold/20 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold-light text-xs">
              <span className="font-semibold">Sample events shown.</span>{" "}
              Add your{" "}
              <a
                href="https://www.datathistle.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-gold"
              >
                Data Thistle API key
              </a>{" "}
              as <code className="bg-gold-dim/50 px-1">DATATHISTLE_API_KEY</code> to display live VisitScotland events.
              This page auto-refreshes every hour.
            </p>
          </div>
        </div>
      )}
      {source === "api" && (
        <div className="bg-emerald-950 border-b border-emerald-800/40 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-emerald-300 text-xs">
              <span className="font-semibold">Live events</span> from VisitScotland via Data Thistle.
              Auto-updated every hour.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {events.length === 0 ? (
          <div className="text-center py-24 text-mist">
            <p
              className="text-5xl text-heather mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ◈
            </p>
            <p
              className="text-cream text-xl mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              No upcoming events found
            </p>
            <p className="text-sm">Check back soon — events are updated regularly.</p>
          </div>
        ) : (
          <>
            {/* Category filters */}
            <div className="mb-10 flex flex-wrap gap-3 items-center">
              <span className="text-mist text-xs tracking-widest uppercase mr-1">Filter</span>

              <Link
                href="/events"
                className={`text-xs px-3 py-1 border transition-colors ${
                  !activeCategory
                    ? "bg-elevated text-cream border-heather"
                    : "text-mist border-dim hover:border-heather hover:text-cream"
                }`}
              >
                All
              </Link>

              {categories.map((cat) => {
                const style = getCategoryStyle(cat);
                const isActive = activeCategory === cat;
                return (
                  <Link
                    key={cat}
                    href={isActive ? "/events" : `/events?category=${encodeURIComponent(cat)}`}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1 border transition-colors ${
                      isActive ? style.active : `${style.label} hover:opacity-100 opacity-70`
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${style.dot}`} />
                    {cat}
                  </Link>
                );
              })}

              {activeCategory && (
                <span className="text-mist text-xs ml-2">
                  {filtered.length} event{filtered.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Events grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dim">
              {filtered.map((event) => {
                const style = getCategoryStyle(event.category);
                return (
                  <div
                    key={event.id}
                    className="bg-surface hover:bg-elevated transition-colors flex flex-col"
                  >
                    {/* Category bar */}
                    <div className={`h-px w-full ${style.dot} opacity-60`} />

                    <div className="p-7 flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${style.dot}`} />
                        <span className={`text-xs ${style.label} border px-2 py-0.5`}>
                          {event.category}
                        </span>
                      </div>

                      <h2
                        className="text-cream text-xl mb-4 leading-snug"
                        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                      >
                        {event.title}
                      </h2>

                      <div className="flex items-center gap-2 text-gold text-xs mb-2 uppercase tracking-wider">
                        <span className="w-3 h-px bg-gold" />
                        {formatEventDate(event.startDate, event.endDate)}
                      </div>

                      <p className="text-mist text-xs mb-5 tracking-wide">
                        {event.location}
                      </p>

                      <p className="text-cream-dim text-sm leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    </div>

                    <div className="px-7 pb-6 flex items-center gap-4 border-t border-dim pt-4">
                      {event.url && (
                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold hover:text-gold-light text-xs tracking-[0.12em] uppercase transition-colors"
                        >
                          Event details &rarr;
                        </a>
                      )}
                      {event.town && (
                        <Link
                          href={`/towns/${event.town
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, "")}`}
                          className="text-mist hover:text-cream-dim text-xs uppercase tracking-wide ml-auto transition-colors"
                        >
                          {event.town} &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Submit CTA */}
        <div
          className="mt-16 relative overflow-hidden grain border border-dim p-12 text-center"
          style={{
            background:
              "linear-gradient(135deg, #1a1530 0%, #0e1118 60%, #0b1220 100%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(201,144,58,0.07) 0%, transparent 60%)",
            }}
          />
          <div className="relative">
            <span className="inline-block rule-gold mb-2" />
            <h2
              className="text-cream text-3xl mb-3"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              Running an event along the NC500?
            </h2>
            <p className="text-cream-dim text-sm mb-8 max-w-xl mx-auto leading-relaxed">
              Submit to VisitScotland and it will appear in the official events database — and automatically
              show up here within 24 hours.
            </p>
            <a
              href="https://www.visitscotland.com/things-to-do/events/submit-event"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold hover:bg-gold-light text-highland text-xs font-semibold px-8 py-3.5 transition-colors uppercase tracking-widest"
            >
              Submit to VisitScotland
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
