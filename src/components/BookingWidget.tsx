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
  params.set("aid", AFFILIATE_ID);
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

    </div>
  );
}
