"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { bookableItineraries } from "@/data/itinerary-stops";

function toYMD(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function TripPlannerWidget() {
  const router = useRouter();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const defaultDate = toYMD(new Date(today.getTime() + 14 * 86_400_000));

  const [itineraryId, setItineraryId] = useState(bookableItineraries[0].id);
  const [startDate, setStartDate] = useState(defaultDate);
  const [adults, setAdults] = useState(2);

  const handlePlan = () => {
    const params = new URLSearchParams({
      itinerary: itineraryId,
      startDate,
      adults: String(adults),
    });
    router.push(`/plan?${params.toString()}`);
  };

  return (
    <div
      className="mt-10 p-5 md:p-6 border border-white/10 backdrop-blur-sm"
      style={{ background: "rgba(11,14,21,0.72)" }}
    >
      <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-4">
        Quick trip planner
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Itinerary */}
        <div className="lg:col-span-2">
          <label className="block text-mist text-xs uppercase tracking-wider mb-1.5">
            Itinerary
          </label>
          <select
            value={itineraryId}
            onChange={(e) => setItineraryId(e.target.value)}
            className="w-full bg-highland/80 border border-white/15 text-cream text-sm px-3 py-2.5 focus:outline-none focus:border-gold transition-colors"
          >
            {bookableItineraries.map((it) => (
              <option key={it.id} value={it.id} className="bg-highland">
                {it.title}
              </option>
            ))}
          </select>
        </div>

        {/* Start date */}
        <div>
          <label className="block text-mist text-xs uppercase tracking-wider mb-1.5">
            Start date
          </label>
          <input
            type="date"
            value={startDate}
            min={toYMD(today)}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-highland/80 border border-white/15 text-cream text-sm px-3 py-2.5 focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Adults */}
        <div>
          <label className="block text-mist text-xs uppercase tracking-wider mb-1.5">
            Adults
          </label>
          <div className="flex items-center border border-white/15 bg-highland/80 h-[42px]">
            <button
              onClick={() => setAdults((n) => Math.max(1, n - 1))}
              className="px-4 text-cream-dim hover:text-gold transition-colors text-lg leading-none h-full flex items-center"
              aria-label="Fewer adults"
            >
              −
            </button>
            <span className="flex-1 text-center text-cream text-sm font-medium">
              {adults}
            </span>
            <button
              onClick={() => setAdults((n) => Math.min(8, n + 1))}
              className="px-4 text-cream-dim hover:text-gold transition-colors text-lg leading-none h-full flex items-center"
              aria-label="More adults"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Plan button */}
      <div className="mt-4">
        <button
          onClick={handlePlan}
          className="w-full bg-gold hover:bg-gold-light text-highland font-semibold text-sm uppercase tracking-widest py-3 transition-colors"
        >
          Plan My Trip &rarr;
        </button>
      </div>
    </div>
  );
}
