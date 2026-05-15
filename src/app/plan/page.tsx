"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { bookableItineraries } from "@/data/itinerary-stops";

const AFFILIATE_ID = "2848401";

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

function toYMD(date: Date): string {
  return date.toISOString().split("T")[0];
}

function bookingUrl(town: string, checkin: Date, nights: number, adults: number): string {
  const checkout = addDays(checkin, nights);
  const params = new URLSearchParams({
    ss: town,
    lang: "en-gb",
    checkin: toYMD(checkin),
    checkout: toYMD(checkout),
    group_adults: String(adults),
    no_rooms: "1",
    aid: AFFILIATE_ID,
  });
  return `https://www.booking.com/searchresults.html?${params.toString()}`;
}

export default function PlanPage() {
  const searchParams = useSearchParams();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const defaultDate = toYMD(addDays(today, 14));

  const initialItinerary = (() => {
    const param = searchParams.get("itinerary");
    return bookableItineraries.find((i) => i.id === param)?.id ?? bookableItineraries[0].id;
  })();

  const [itineraryId, setItineraryId] = useState(initialItinerary);
  const [startDate, setStartDate] = useState(defaultDate);
  const [adults, setAdults] = useState(2);

  useEffect(() => {
    const param = searchParams.get("itinerary");
    if (param && bookableItineraries.find((i) => i.id === param)) {
      setItineraryId(param);
    }
  }, [searchParams]);

  const itinerary = bookableItineraries.find((i) => i.id === itineraryId)!;

  const stops = useMemo(() => {
    const start = new Date(startDate + "T00:00:00");
    let cursor = start;
    return itinerary.stops.map((stop) => {
      const checkin = new Date(cursor);
      const checkout = addDays(checkin, stop.nights);
      cursor = checkout;
      return {
        ...stop,
        checkin,
        checkout,
        url: bookingUrl(stop.town, checkin, stop.nights, adults),
      };
    });
  }, [itinerary, startDate, adults]);

  const tripEnd = stops.length > 0 ? stops[stops.length - 1].checkout : null;

  return (
    <main className="min-h-screen bg-highland">

      {/* Hero */}
      <section className="relative overflow-hidden grain border-b border-dim py-20">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1a1530 0%, #0b0e15 60%, #0e1520 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 15% 55%, rgba(124,107,140,0.2) 0%, transparent 55%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/itineraries"
            className="text-mist hover:text-gold text-xs tracking-widest uppercase mb-8 inline-block transition-colors"
          >
            &larr; All itineraries
          </Link>
          <span className="rule-gold" />
          <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-4">Trip Planner</p>
          <h1
            className="text-5xl md:text-6xl text-cream mb-4 leading-[1.05]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            Plan &amp; Book Your{" "}
            <em className="text-gold not-italic">NC500</em>
          </h1>
          <p className="text-cream-dim text-lg leading-relaxed max-w-2xl">
            Pick your route, set your dates, and we'll generate ready-to-book
            Booking.com links for every overnight stop — all with live prices and availability.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Selector panel */}
        <div className="bg-surface border border-dim p-6 md:p-8 mb-10">
          <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-6">Configure your trip</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Itinerary */}
            <div className="md:col-span-1">
              <label className="block text-mist text-xs uppercase tracking-wider mb-2">
                Itinerary
              </label>
              <select
                value={itineraryId}
                onChange={(e) => setItineraryId(e.target.value)}
                className="w-full bg-elevated border border-dim text-cream text-sm px-3 py-2.5 focus:outline-none focus:border-gold transition-colors"
              >
                {bookableItineraries.map((it) => (
                  <option key={it.id} value={it.id}>
                    {it.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Start date */}
            <div>
              <label className="block text-mist text-xs uppercase tracking-wider mb-2">
                Start date
              </label>
              <input
                type="date"
                value={startDate}
                min={toYMD(today)}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-elevated border border-dim text-cream text-sm px-3 py-2.5 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Adults */}
            <div>
              <label className="block text-mist text-xs uppercase tracking-wider mb-2">
                Adults
              </label>
              <div className="flex items-center border border-dim bg-elevated">
                <button
                  onClick={() => setAdults((n) => Math.max(1, n - 1))}
                  className="px-4 py-2.5 text-cream-dim hover:text-gold transition-colors text-lg leading-none"
                  aria-label="Fewer adults"
                >
                  −
                </button>
                <span className="flex-1 text-center text-cream text-sm font-medium">{adults}</span>
                <button
                  onClick={() => setAdults((n) => Math.min(8, n + 1))}
                  className="px-4 py-2.5 text-cream-dim hover:text-gold transition-colors text-lg leading-none"
                  aria-label="More adults"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Trip summary */}
          {tripEnd && (
            <div className="mt-6 pt-6 border-t border-dim flex flex-wrap gap-6">
              <div>
                <p className="text-mist text-xs uppercase tracking-wider mb-1">Route</p>
                <p className="text-cream text-sm font-medium">{itinerary.title}</p>
              </div>
              <div>
                <p className="text-mist text-xs uppercase tracking-wider mb-1">Depart</p>
                <p className="text-cream text-sm font-medium">{formatDate(new Date(startDate + "T00:00:00"))}</p>
              </div>
              <div>
                <p className="text-mist text-xs uppercase tracking-wider mb-1">Return</p>
                <p className="text-cream text-sm font-medium">{formatDate(tripEnd)}</p>
              </div>
              <div>
                <p className="text-mist text-xs uppercase tracking-wider mb-1">Nights</p>
                <p className="text-cream text-sm font-medium">{itinerary.totalNights}</p>
              </div>
              <div>
                <p className="text-mist text-xs uppercase tracking-wider mb-1">Guests</p>
                <p className="text-cream text-sm font-medium">{adults} adult{adults !== 1 ? "s" : ""}</p>
              </div>
            </div>
          )}
        </div>

        {/* Stop cards */}
        <div className="mb-6">
          <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-1">Your overnight stops</p>
          <p className="text-mist text-xs">Click any card to search availability on Booking.com — all dates are pre-filled.</p>
        </div>

        <div className="space-y-px">
          {stops.map((stop, i) => (
            <a
              key={i}
              href={stop.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-stretch bg-surface hover:bg-elevated border border-dim hover:border-gold/40 transition-colors block"
            >
              {/* Night label */}
              <div
                className="flex-shrink-0 w-28 md:w-36 flex flex-col items-center justify-center p-4 border-r border-dim"
                style={{ background: "linear-gradient(180deg, #1a1530 0%, #131720 100%)" }}
              >
                <p className="text-gold text-xs font-semibold uppercase tracking-wider text-center leading-tight">
                  {stop.label}
                </p>
                {stop.nights > 1 && (
                  <p className="text-mist text-xs mt-1">{stop.nights} nights</p>
                )}
              </div>

              {/* Main content */}
              <div className="flex-1 p-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p
                    className="text-cream text-lg leading-snug group-hover:text-gold-light transition-colors"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                  >
                    {stop.displayName}
                  </p>
                  <p className="text-mist text-xs mt-1">
                    {formatDate(stop.checkin)} → {formatDate(stop.checkout)}
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-3">
                  <span className="hidden md:block text-mist text-xs uppercase tracking-widest group-hover:text-gold transition-colors">
                    Search availability
                  </span>
                  <span className="text-gold group-hover:text-gold-light transition-colors text-lg">&rarr;</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Note */}
        <p className="text-mist text-xs mt-6 leading-relaxed">
          All searches open on{" "}
          <a href="https://www.booking.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gold transition-colors">
            Booking.com
          </a>{" "}
          with your dates and guest count pre-filled. Prices shown are live.
          We may earn a small commission on bookings at no extra cost to you.
        </p>

        {/* Camping callout */}
        <div
          className="mt-12 p-6 border border-dim flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ background: "linear-gradient(135deg, #0e1a12 0%, #0b1210 100%)" }}
        >
          <div>
            <p className="text-cream text-sm font-semibold mb-1">Travelling by campervan or tent?</p>
            <p className="text-mist text-xs leading-relaxed">Browse curated campsites and wild camping spots along the NC500 route.</p>
          </div>
          <Link
            href="/camping"
            className="flex-shrink-0 border border-gold text-gold hover:bg-gold hover:text-highland text-xs font-semibold px-5 py-2.5 transition-colors uppercase tracking-widest"
          >
            View Campsites
          </Link>
        </div>

        {/* Full itineraries link */}
        <div className="mt-6 text-center">
          <Link
            href="/itineraries"
            className="text-mist hover:text-gold text-xs tracking-widest uppercase transition-colors"
          >
            &larr; Read the full itinerary details
          </Link>
        </div>
      </div>
    </main>
  );
}
