"use client";

import Link from "next/link";
import { useState } from "react";
import { campsites, typeLabels, typeIcons, type CampsiteType } from "@/data/campsites";

const allTypes: CampsiteType[] = ["tent", "motorhome", "glamping", "pod", "bothie"];

const wildSpots = [
  {
    name: "Sandwood Bay, Sutherland",
    description:
      "A 4-mile walk from the nearest road keeps this spectacular beach almost entirely crowd-free. Camp on the dunes above the bay with views to Am Buachaille sea stack. No facilities — carry everything in.",
    coordinates: "58.5382°N, 5.0455°W",
  },
  {
    name: "Kyle of Tongue Causeway",
    description:
      "The grassland on the north side of the Kyle of Tongue causeway is a classic wild camp spot with views of Ben Hope and Ben Loyal. Pull off the road and you have one of Scotland's great mountain panoramas to yourself.",
    coordinates: "58.4854°N, 4.4183°W",
  },
  {
    name: "Balnakeil Bay, Durness",
    description:
      "White sand and turquoise water a short walk from Durness village. Tent above the tideline for an ocean-facing pitch. The village has a café and shop if you need supplies.",
    coordinates: "58.5745°N, 4.7681°W",
  },
  {
    name: "Achmelvich Beach, Assynt",
    description:
      "One of Scotland's most beautiful beaches, with crystal water more Caribbean than Highland. The basic SYHA campsite is nearby if you want facilities, but the beach itself is legal wild camping territory.",
    coordinates: "58.1716°N, 5.3112°W",
  },
  {
    name: "Loch Maree, Wester Ross",
    description:
      "The south shore of Loch Maree has forested promontories perfect for a lochside wild camp. Park at one of the small laybys on the A832 and walk a short distance into the trees.",
    coordinates: "57.6700°N, 5.4100°W",
  },
  {
    name: "Torridon Glens",
    description:
      "The glens running south from Torridon village offer wild camping among some of the oldest mountains on earth. Pick a spot well back from the road and above the 30m high-tide mark if near the loch.",
    coordinates: "57.5447°N, 5.5021°W",
  },
];

export default function CampingPage() {
  const [activeTypes, setActiveTypes] = useState<CampsiteType[]>([]);

  const toggleType = (type: CampsiteType) => {
    setActiveTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filtered =
    activeTypes.length === 0
      ? campsites
      : campsites.filter((c) => activeTypes.some((t) => c.types.includes(t)));

  return (
    <main className="min-h-screen bg-highland">

      {/* Hero */}
      <section className="relative overflow-hidden grain border-b border-dim py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=80&fit=crop')" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,14,21,0.85) 0%, rgba(11,14,21,0.65) 60%, rgba(14,26,18,0.70) 100%)" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="rule-gold" />
          <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-4">Camping & Glamping</p>
          <h1
            className="text-5xl md:text-7xl text-cream mb-6 leading-[1.05]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            Sleep Under the<br />
            <em className="text-gold not-italic">Highland Sky</em>
          </h1>
          <p className="text-cream-dim text-lg leading-relaxed max-w-2xl">
            From clifftop campsites above the Atlantic to luxury glamping pods in the glens —
            the NC500 has Scotland's finest outdoor accommodation. And with wild camping legal
            across Scotland, the whole route is your bedroom.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          <span className="text-mist text-xs uppercase tracking-widest self-center mr-2">Filter:</span>
          {allTypes.map((type) => {
            const active = activeTypes.includes(type);
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 border transition-colors ${
                  active
                    ? "border-gold bg-gold text-highland font-semibold"
                    : "border-dim text-cream-dim hover:border-heather hover:text-cream"
                }`}
              >
                <span>{typeIcons[type]}</span>
                {typeLabels[type]}
              </button>
            );
          })}
          {activeTypes.length > 0 && (
            <button
              onClick={() => setActiveTypes([])}
              className="text-xs text-mist hover:text-gold transition-colors ml-2 underline underline-offset-2"
            >
              Clear
            </button>
          )}
        </div>

        {/* Campsite grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-dim mb-20">
          {filtered.map((site) => (
            <div key={site.id} className="bg-surface flex flex-col">
              {/* Colour header */}
              <div
                className="h-32 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1a1530 0%, #131720 60%, #0b1220 100%)" }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(124,107,140,0.4) 0%, transparent 70%)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-1">{site.region}</p>
                  <p
                    className="text-cream text-lg leading-tight"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                  >
                    {site.name}
                  </p>
                </div>
                {/* Type icons top-right */}
                <div className="absolute top-3 right-3 flex gap-1">
                  {site.types.map((t) => (
                    <span key={t} className="text-base" title={typeLabels[t]}>{typeIcons[t]}</span>
                  ))}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-cream-dim text-sm leading-relaxed mb-4 flex-1">{site.description}</p>

                {/* Facilities */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {site.facilities.slice(0, 4).map((f) => (
                    <span key={f} className="bg-elevated text-mist text-xs px-2 py-0.5">{f}</span>
                  ))}
                  {site.facilities.length > 4 && (
                    <span className="bg-elevated text-mist text-xs px-2 py-0.5">+{site.facilities.length - 4} more</span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-dim">
                  <div>
                    <p className="text-mist text-xs uppercase tracking-wider mb-0.5">From</p>
                    <p className="text-gold font-semibold text-sm">{site.priceFrom}</p>
                  </div>
                  <a
                    href={site.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold hover:bg-gold-light text-highland text-xs font-semibold px-4 py-2 transition-colors uppercase tracking-widest"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-mist text-sm">No campsites match your filters.</p>
            <button onClick={() => setActiveTypes([])} className="text-gold text-xs mt-2 underline underline-offset-2">
              Clear filters
            </button>
          </div>
        )}

        {/* Wild camping section */}
        <section>
          <div className="mb-10">
            <span className="rule-gold" />
            <h2
              className="text-4xl md:text-5xl text-cream mb-4"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              Wild Camping in Scotland
            </h2>
            <p className="text-cream-dim text-lg leading-relaxed max-w-2xl">
              Scotland's Land Reform Act (2003) gives everyone the right to camp responsibly on
              most land. The NC500 passes through some of Europe's finest wild camping country —
              here are six of the best spots along the route.
            </p>
          </div>

          {/* Rules box */}
          <div
            className="border border-gold/30 p-6 mb-10 max-w-3xl"
            style={{ background: "linear-gradient(135deg, rgba(201,144,58,0.06) 0%, transparent 100%)" }}
          >
            <p
              className="text-gold text-sm font-semibold uppercase tracking-widest mb-4"
            >
              Leave No Trace — the Scottish Outdoor Access Code
            </p>
            <ul className="space-y-2">
              {[
                "Camp for no more than 2–3 nights in any one spot.",
                "Use a stove rather than an open fire where possible. If you light a fire, use a fire pan or keep it small and on bare ground.",
                "Bury human waste at least 70m from water, paths, and camp; pack out toilet paper.",
                "Take all litter with you — leave the spot as you found it.",
                "Respect other land users, livestock, and crops.",
              ].map((rule) => (
                <li key={rule} className="flex items-start gap-3 text-cream-dim text-sm">
                  <span className="text-gold mt-0.5 flex-shrink-0 text-xs">✦</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Wild spots grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dim">
            {wildSpots.map((spot) => (
              <div key={spot.name} className="bg-surface p-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-gold mt-0.5 flex-shrink-0">⛺</span>
                  <h3
                    className="text-cream text-lg leading-snug"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                  >
                    {spot.name}
                  </h3>
                </div>
                <p className="text-cream-dim text-sm leading-relaxed mb-4">{spot.description}</p>
                <p className="text-mist text-xs font-mono">{spot.coordinates}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div
          className="mt-16 p-10 text-center border border-dim"
          style={{ background: "linear-gradient(135deg, #1a1530 0%, #131720 100%)" }}
        >
          <p
            className="text-cream text-2xl mb-2"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Prefer a roof over your head?
          </p>
          <p className="text-mist text-sm mb-6">Browse hotels, B&Bs, and self-catering cottages along the full NC500 route.</p>
          <Link
            href="/accommodation"
            className="inline-block bg-gold hover:bg-gold-light text-highland text-xs font-semibold px-8 py-3 transition-colors uppercase tracking-widest"
          >
            Search Accommodation
          </Link>
        </div>
      </div>
    </main>
  );
}
