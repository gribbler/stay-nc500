"use client";

import { useState } from "react";

const destinations = [
  { name: "Inverness", bookingQuery: "Inverness, Scotland" },
  { name: "Ullapool", bookingQuery: "Ullapool, Scotland" },
  { name: "Durness", bookingQuery: "Durness, Scotland" },
  { name: "Thurso", bookingQuery: "Thurso, Scotland" },
  { name: "Wick", bookingQuery: "Wick, Scotland" },
  { name: "Dornoch", bookingQuery: "Dornoch, Scotland" },
  { name: "Gairloch", bookingQuery: "Gairloch, Scotland" },
  { name: "Torridon", bookingQuery: "Torridon, Scotland" },
  { name: "Applecross", bookingQuery: "Applecross, Scotland" },
  { name: "Lochinver", bookingQuery: "Lochinver, Scotland" },
];

const AFFILIATE_ID = "2848401";

function buildBookingUrl(destination: string, checkIn?: string, checkOut?: string): string {
  const params = new URLSearchParams({
    ss: destination,
    lang: "en-gb",
    sb: "1",
    src_elem: "sb",
    src: "searchresults",
  });
  if (checkIn) params.set("checkin", checkIn);
  if (checkOut) params.set("checkout", checkOut);
  if (AFFILIATE_ID !== "YOUR_AFFILIATE_ID") params.set("aid", AFFILIATE_ID);
  return `https://www.booking.com/searchresults.html?${params.toString()}`;
}

export default function BookingWidget() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleSearch = () => {
    if (!destination.trim()) return;
    window.open(buildBookingUrl(destination + ", Scotland", checkIn, checkOut), "_blank", "noopener,noreferrer");
  };

  const handleQuickSearch = (query: string) => {
    window.open(buildBookingUrl(query, checkIn, checkOut), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="border border-dim overflow-hidden">

      {/* Search header */}
      <div className="bg-surface p-8">
        <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-2">Accommodation Search</p>
        <h2
          className="text-cream text-3xl mb-8"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          Find Your Stay
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2">
            <label className="block text-mist text-xs tracking-widest uppercase mb-2">
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="e.g. Ullapool, Durness…"
              className="w-full bg-elevated border border-dim text-cream placeholder-mist px-4 py-3 text-sm focus:outline-none focus:border-heather transition-colors"
            />
          </div>
          <div>
            <label className="block text-mist text-xs tracking-widest uppercase mb-2">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-elevated border border-dim text-cream px-4 py-3 text-sm focus:outline-none focus:border-heather transition-colors [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-mist text-xs tracking-widest uppercase mb-2">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-elevated border border-dim text-cream px-4 py-3 text-sm focus:outline-none focus:border-heather transition-colors [color-scheme:dark]"
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="mt-5 bg-gold hover:bg-gold-light text-highland font-semibold px-8 py-3 transition-colors text-sm uppercase tracking-widest"
        >
          Search on Booking.com
        </button>
      </div>

      {/* Quick-search destinations */}
      <div className="bg-elevated border-t border-dim p-8">
        <p className="text-mist text-xs tracking-widest uppercase mb-4">Quick search</p>
        <div className="flex flex-wrap gap-2">
          {destinations.map((dest) => (
            <button
              key={dest.name}
              onClick={() => handleQuickSearch(dest.bookingQuery)}
              className="border border-dim hover:border-heather text-cream-dim hover:text-cream text-xs px-4 py-2 transition-colors uppercase tracking-wide"
            >
              {dest.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="bg-surface border-t border-dim p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-2">Interactive Map</p>
            <h3
              className="text-cream text-xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              NC500 Route Map
            </h3>
          </div>
          <a
            href="https://www.openstreetmap.org/#map=8/58.012/-4.45"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mist hover:text-gold text-xs tracking-widest uppercase transition-colors"
          >
            Open full map ↗
          </a>
        </div>

        <div className="border border-dim overflow-hidden aspect-video">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-6.2%2C57.3%2C-2.8%2C58.8&layer=mapnik"
            className="w-full h-full"
            style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.6) brightness(0.85)" }}
            loading="lazy"
            title="NC500 Route Map"
          />
        </div>

        <p className="text-mist text-xs mt-4">
          Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-cream">OpenStreetMap</a> contributors.
          Results open on Booking.com. Stay NC500 may earn a commission on bookings made via our affiliate links.
        </p>
      </div>
    </div>
  );
}
