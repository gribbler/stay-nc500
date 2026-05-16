import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NC500 Itineraries — Road Trip Guides | Stay NC500",
  description:
    "Ready-made NC500 itineraries for every pace and style. From a fast 5-day blitz to a 10-day deep exploration of the Scottish Highlands — plan your perfect road trip.",
  keywords: ["NC500 itinerary", "North Coast 500 route planner", "Scotland road trip", "Highland driving holiday"],
};

interface DayStop {
  day: string;
  location: string;
  notes: string;
}

interface Itinerary {
  id: string;
  number: string;
  title: string;
  tagline: string;
  duration: string;
  distance: string;
  pace: string;
  paceColour: string;
  bestFor: string;
  intro: string;
  days: DayStop[];
  tips: string[];
  accentColour: string;
}

const itineraries: Itinerary[] = [
  {
    id: "classic-7",
    number: "01",
    title: "The Classic NC500",
    tagline: "Seven days, the full circuit",
    duration: "7 days",
    distance: "516 miles",
    pace: "Moderate",
    paceColour: "text-emerald-300",
    bestFor: "First-timers, couples, most travellers",
    intro:
      "The definitive way to drive Scotland's greatest road. Seven days gives you enough time to absorb every dramatic landscape shift — from the Black Isle to Caithness to Torridon — without feeling rushed. You'll drive roughly 70–90 miles a day, leaving plenty of room to stop wherever the view demands it.",
    days: [
      {
        day: "Day 1",
        location: "Inverness → Dornoch",
        notes:
          "Cross the Kessock Bridge and follow the Cromarty Firth east. Stop at Cromarty for a walk, then continue north to Dornoch — a quiet cathedral town on the Dornoch Firth. Overnight in Dornoch.",
      },
      {
        day: "Day 2",
        location: "Dornoch → Thurso",
        notes:
          "Drive north through Golspie and Brora, stopping at Dunrobin Castle. Continue through Helmsdale and up the wild Caithness coast to Thurso, Scotland's most northerly mainland town. Explore Dunnet Head — the true most northerly point.",
      },
      {
        day: "Day 3",
        location: "Thurso → Durness",
        notes:
          "Head west along the dramatic north coast. Stop at Castle Sinclair Girnigoe, then push through to John O'Groats for the obligatory photo. Continue to Tongue, crossing the Kyle of Tongue causeway, before reaching Durness and the spectacular Smoo Cave.",
      },
      {
        day: "Day 4",
        location: "Durness → Ullapool",
        notes:
          "The wildest stretch. Drive south through Scourie and Kylesku — stop on the Kylesku Bridge for views of Loch Glencoul. Continue to Lochinver for fresh langoustines, then wind down the spectacular single-track roads to Ullapool.",
      },
      {
        day: "Day 5",
        location: "Ullapool → Torridon",
        notes:
          "Head south through Corrieshalloch Gorge and on to Gairloch. Turn south towards Torridon, one of Scotland's most dramatic mountain landscapes. Walk among the ancient Torridonian sandstone peaks.",
      },
      {
        day: "Day 6",
        location: "Torridon → Applecross → Inverness",
        notes:
          "The most exhilarating driving day. Cross the Bealach na Bà — the highest mountain pass in the UK, with hairpin bends and views to the Isle of Skye. Descend to the Applecross Inn for lunch, then follow the coast road back towards Inverness via Strathcarron and Beauly.",
      },
      {
        day: "Day 7",
        location: "Inverness & surrounds",
        notes:
          "A slower final day to explore Inverness city — the castle, the Victorian Market, the River Ness. Or take a day trip to Culloden Moor and Clava Cairns. Depart refreshed.",
      },
    ],
    tips: [
      "Book accommodation at least 6–8 weeks ahead in peak season (July–August).",
      "Fill up with fuel at every opportunity — petrol stations can be 40+ miles apart.",
      "The Bealach na Bà is unsuitable for caravans and motorhomes; use the coastal Applecross road instead.",
      "Midges are worst June–August, especially around dawn and dusk. Carry repellent.",
    ],
    accentColour: "from-[#1a1530]",
  },
  {
    id: "fast-5",
    number: "02",
    title: "The Fast Five",
    tagline: "Five days, maximum miles",
    duration: "5 days",
    distance: "516 miles",
    pace: "Fast",
    paceColour: "text-orange-300",
    bestFor: "Weekend warriors, limited annual leave",
    intro:
      "For those who can't spare a week but still need the NC500 experience. You'll cover more ground per day (~100 miles) and sacrifice some detours, but the major highlights are all here. This works best outside peak summer, when traffic is lighter and you can move freely.",
    days: [
      {
        day: "Day 1",
        location: "Inverness → Thurso",
        notes:
          "Blast up the east coast via Dornoch and Wick. Stop briefly at Dunrobin Castle and take the 10-minute walk at Duncansby Stacks — the sea stacks just east of John O'Groats are arguably more impressive than the signpost. Overnight in Thurso.",
      },
      {
        day: "Day 2",
        location: "Thurso → Durness → Ullapool",
        notes:
          "Drive the entire north coast in a day. It's long but spectacular — Tongue, Bettyhill, Smoo Cave in Durness, then south to Kylesku and Ullapool. This is the wildest day.",
      },
      {
        day: "Day 3",
        location: "Ullapool → Gairloch → Torridon",
        notes:
          "Follow the coast south through Inverewe Garden (worth 30 minutes) and down to Torridon. Evening walk in the mountains if energy allows.",
      },
      {
        day: "Day 4",
        location: "Torridon → Applecross → South",
        notes:
          "Cross the Bealach na Bà first thing when the roads are quiet. Lunch at Applecross. Continue south towards Inverness via Strathcarron.",
      },
      {
        day: "Day 5",
        location: "Return to Inverness",
        notes:
          "Relaxed final drive along the south shore of Loch Ness. Stop at Urquhart Castle or Fort Augustus before returning to Inverness.",
      },
    ],
    tips: [
      "May or September are ideal for this pace — better weather odds and fewer caravans.",
      "Pre-book every night's accommodation before you leave; flexibility is limited on this schedule.",
      "Download offline maps — mobile signal is non-existent in many stretches.",
    ],
    accentColour: "from-[#201515]",
  },
  {
    id: "deep-10",
    number: "03",
    title: "The Deep Exploration",
    tagline: "Ten days, no rush",
    duration: "10 days",
    distance: "516+ miles",
    pace: "Leisurely",
    paceColour: "text-blue-300",
    bestFor: "Retirees, remote workers, photographers, hikers",
    intro:
      "The NC500 at its very best. Ten days lets you go off-piste — explore the Assynt peninsula properly, spend a night at Torridon, kayak in Gairloch, take a boat to Handa Island, and sit in a pub in Durness without watching the clock. Add extra days around Applecross and the Black Isle.",
    days: [
      { day: "Days 1–2", location: "Inverness & the Black Isle", notes: "Explore Inverness and the Black Isle peninsula — Fortrose Cathedral, the Chanonry Point dolphin-watching spot, and Cromarty village." },
      { day: "Days 3–4", location: "Dornoch → Caithness", notes: "Slow east coast drive via Dunrobin Castle, Wick, and the Caithness flagstone coast. Explore John O'Groats and Duncansby Head properly." },
      { day: "Days 5–6", location: "North Coast: Thurso → Durness", notes: "Drive the north coast leisurely. A full day around Durness — Smoo Cave, Cape Wrath (ferry and minibus permitting), and Balnakeil beach." },
      { day: "Days 7–8", location: "Assynt & Ullapool", notes: "Spend two nights in the Assynt area. Visit Ardvreck Castle, climb Suilven or Stac Pollaidh, take the boat trip to Handa Island from Tarbet. Ullapool for dinner and live folk music." },
      { day: "Days 9–10", location: "Wester Ross & Applecross", notes: "Gairloch, Inverewe Gardens, Torridon, and the Bealach na Bà. Two nights means a proper hike and leisurely exploration of the Applecross peninsula before heading home." },
    ],
    tips: [
      "The Cape Wrath ferry runs April–October and depends on tides — check in advance.",
      "Handa Island boat trips (RSPB) run May–August. Book direct with the operator.",
      "Ullapool has excellent live music in the Ceilidh Place and Seaforth Inn — check what's on.",
      "Stac Pollaidh is a 2-hour circular hike with outstanding views. Wear proper boots.",
    ],
    accentColour: "from-[#0e1520]",
  },
  {
    id: "west-coast-4",
    number: "04",
    title: "West Coast Focus",
    tagline: "Four days of pure drama",
    duration: "4 days",
    distance: "~280 miles",
    pace: "Moderate",
    paceColour: "text-emerald-300",
    bestFor: "Those who've done the east coast before, Skye visitors",
    intro:
      "If you've already ticked off Caithness, or you're combining the NC500 with a Skye trip, this west coast variant gives you the most dramatic scenery in the fewest miles. Inverness to Applecross and back via Torridon and Gairloch — stunning every single mile.",
    days: [
      { day: "Day 1", location: "Inverness → Ullapool", notes: "Drive west through Garve and the Dirrie More Pass. Arrive in Ullapool early enough for the evening light on Loch Broom. Seafood dinner is mandatory." },
      { day: "Day 2", location: "Ullapool → Lochinver → Assynt", notes: "North to the Assynt peninsula via the 'Wee Mad Road' from Drumrunie — one of Scotland's most spectacular drives. Ardvreck Castle, Lochinver, and the sandstone peaks of Cùl Mòr and Suilven." },
      { day: "Day 3", location: "Gairloch → Torridon", notes: "South via Inverewe Garden and the coast road to Gairloch. Afternoon in Torridon — walk, kayak, or simply stare at the mountains." },
      { day: "Day 4", location: "Applecross → Inverness", notes: "The Bealach na Bà at dawn for the best light. Breakfast or early lunch at the Applecross Inn. Return to Inverness via Strathcarron and Loch Carron." },
    ],
    tips: [
      "The 'Wee Mad Road' between Drumrunie and Lochinver is single-track with passing places — take your time.",
      "Combine with a Skye crossing via Kyleakin on Day 4 if your schedule allows.",
      "Wild camping is legal in Scotland under the Land Reform Act — the Assynt area is outstanding for it.",
    ],
    accentColour: "from-[#0e1a1a]",
  },
  {
    id: "wild-camper-7",
    number: "05",
    title: "The Wild Camper",
    tagline: "Seven days under the stars",
    duration: "7 days",
    distance: "516 miles",
    pace: "Flexible",
    paceColour: "text-purple-300",
    bestFor: "Vanlifers, tent campers, self-sufficient travellers",
    intro:
      "Scotland's Land Reform (Scotland) Act gives you the right to wild camp almost anywhere — and the NC500 corridor has some of the finest wild camping on Earth. This itinerary is a framework; the whole point is to stop when you find the perfect spot by the sea, the river, or the mountain.",
    days: [
      { day: "Night 1", location: "Dornoch Firth or Embo Beach", notes: "Easy first night. Flat ground, sea views, accessible from the A9." },
      { day: "Night 2", location: "Caithness coast", notes: "The cliffs near Duncansby Head or Whaligoe Steps area — dramatic and little-visited. Get there before dark to find your pitch." },
      { day: "Night 3", location: "North coast — near Tongue or Bettyhill", notes: "The Kyle of Tongue peninsula has outstanding spots looking across to Ben Loyal. Or continue to the remote beach at Torrisdale Bay." },
      { day: "Night 4", location: "Sandwood Bay area, Sutherland", notes: "Britain's most remote beach requires a 4-mile walk. Worth every step. Camp in the dunes legally — no facilities, carry everything out." },
      { day: "Night 5", location: "Achiltibuie or Loch Lurgainn", notes: "The Summer Isles vista at sunset from the Coigach peninsula. Or a hidden spot above Loch Lurgainn with Stac Pollaidh reflected in the water." },
      { day: "Night 6", location: "Torridon — beside Loch Torridon", notes: "Wild camping beside the loch with the Torridonian peaks towering above. The National Trust for Scotland encourages responsible wild camping here." },
      { day: "Night 7", location: "Applecross peninsula", notes: "A final night on the Applecross shore before the drive home. Watch for otters at low tide." },
    ],
    tips: [
      "Leave No Trace: carry a trowel, pack out all waste, and leave the ground as you found it.",
      "Wild camping at Sandwood Bay requires a 4-mile walk each way — pack light.",
      "Midges are unavoidable June–August. A midge net for sleeping is not optional.",
      "Fresh water is plentiful but always treat or filter burn water before drinking.",
      "Campsites in Ullapool, Gairloch, and Dornoch are useful for shower stops mid-trip.",
    ],
    accentColour: "from-[#150e20]",
  },
  {
    id: "family-7",
    number: "06",
    title: "Family Adventure",
    tagline: "Seven days, all ages welcome",
    duration: "7 days",
    distance: "516 miles",
    pace: "Relaxed",
    paceColour: "text-yellow-300",
    bestFor: "Families with children, multi-generational groups",
    intro:
      "The NC500 is outstanding for families — enormous beaches, castles, wildlife, distilleries for the adults, and enough space that children can actually run. This itinerary keeps daily driving under 80 miles, builds in proper play stops, and selects the most child-friendly overnight bases.",
    days: [
      { day: "Day 1", location: "Inverness", notes: "Start with Inverness Castle (under renovation but still photogenic) and the Victorian Market. Loch Ness cruise from the city or via Fort Augustus — Nessie-spotting is guaranteed to engage even reluctant teenagers." },
      { day: "Day 2", location: "Inverness → Dornoch", notes: "Beach day at Dornoch — the wide, safe sandy beach is perfect for families. Explore the small cathedral town. Ice cream at the Dornoch Fudge House." },
      { day: "Day 3", location: "Dornoch → Wick", notes: "Dunrobin Castle is the highlight — children love the falconry display and the fairy-tale exterior. Continue to Wick." },
      { day: "Day 4", location: "Wick → Thurso → Tongue", notes: "John O'Groats for the famous signpost photo. North to Dunnet Head (mainland Britain's most northerly point). Continue west to Tongue for the night." },
      { day: "Day 5", location: "Tongue → Durness", notes: "Smoo Cave is a guaranteed hit with kids — a vast coastal cave with a waterfall inside. Balnakeil beach for a long afternoon play. Craft village in Durness." },
      { day: "Day 6", location: "Durness → Ullapool", notes: "Ferry from Ullapool to the Summer Isles (seasonal) — look for dolphins on the crossing. Or take the more direct route via Kylesku and Lochinver for fresh fish and chips." },
      { day: "Day 7", location: "Ullapool → Inverness", notes: "Corrieshalloch Gorge (dramatic footbridge walk — short but memorable) and the Falls of Measach. Return to Inverness via the A835. Consider Loch Ness-side drive for a finale." },
    ],
    tips: [
      "The Dunrobin Castle falconry display runs twice daily in summer — check times before visiting.",
      "Smoo Cave guided tours include the waterfall chamber — book in advance in peak season.",
      "Gairloch Marine Life Centre runs excellent wildlife boat trips suitable for children.",
      "Most Highland roads are single-track — explain passing place etiquette to older children, it becomes a highlight rather than a stress.",
      "Pack waterproofs for everyone regardless of the forecast. The weather changes fast.",
    ],
    accentColour: "from-[#1a1810]",
  },
];

const paceInfo: Record<string, string> = {
  Fast: "100+ miles/day",
  Moderate: "70–90 miles/day",
  Leisurely: "50–70 miles/day",
  Relaxed: "50–80 miles/day",
  Flexible: "You decide",
};

export default function ItinerariesPage() {
  return (
    <main className="min-h-screen bg-highland">

      {/* Header */}
      <section className="relative overflow-hidden grain border-b border-dim py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1600&q=80&fit=crop')" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,14,21,0.90) 0%, rgba(11,14,21,0.75) 60%, rgba(26,21,48,0.70) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="rule-gold" />
          <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-4">Route Planning</p>
          <h1
            className="text-5xl md:text-6xl text-cream mb-5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            NC500 Itineraries
          </h1>
          <p className="text-cream-dim text-lg max-w-2xl leading-relaxed">
            Six ready-made road trip plans for every pace, style, and schedule. From a long-weekend
            blast to a ten-day deep exploration — find the route that fits you.
          </p>
        </div>
      </section>

      {/* Quick-pick cards */}
      <section className="bg-surface border-b border-dim py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-dim">
            {itineraries.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                className="group bg-elevated hover:bg-panel p-5 transition-colors block"
              >
                <p
                  className="text-heather text-2xl mb-2"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                >
                  {it.number}
                </p>
                <p
                  className="text-cream text-sm mb-1 group-hover:text-gold-light transition-colors leading-snug"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  {it.title}
                </p>
                <p className="text-mist text-xs">{it.duration}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Itineraries */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {itineraries.map((it) => (
          <article key={it.id} id={it.id} className="scroll-mt-20">

            {/* Title block */}
            <div className="mb-10">
              <div className="flex items-baseline gap-4 mb-2">
                <span
                  className="text-heather text-6xl"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
                >
                  {it.number}
                </span>
                <span className="rule-heather flex-shrink-0 self-center" />
              </div>
              <h2
                className="text-4xl md:text-5xl text-cream mb-2"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {it.title}
              </h2>
              <p className="text-heather-light text-sm italic mb-6">{it.tagline}</p>

              {/* Meta chips */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { label: "Duration", value: it.duration },
                  { label: "Distance", value: it.distance },
                  { label: "Pace", value: `${it.pace} — ${paceInfo[it.pace]}`, className: it.paceColour },
                  { label: "Best for", value: it.bestFor },
                ].map((m) => (
                  <div key={m.label} className="bg-surface border border-dim px-4 py-2">
                    <p className="text-mist text-xs uppercase tracking-wider mb-0.5">{m.label}</p>
                    <p className={`text-sm font-medium ${m.className ?? "text-cream"}`}>{m.value}</p>
                  </div>
                ))}
              </div>

              <p className="text-cream-dim text-base leading-relaxed max-w-3xl">{it.intro}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Day-by-day */}
              <div className="lg:col-span-2">
                <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-6">Day by Day</p>
                <div className="space-y-0 border border-dim">
                  {it.days.map((day, i) => (
                    <div
                      key={i}
                      className="flex gap-0 border-b border-dim last:border-b-0"
                    >
                      {/* Day label */}
                      <div
                        className="flex-shrink-0 w-24 md:w-32 p-5 border-r border-dim flex flex-col justify-center"
                        style={{
                          background: "linear-gradient(180deg, #1a1530 0%, #131720 100%)",
                        }}
                      >
                        <p className="text-gold text-xs font-semibold uppercase tracking-wider leading-tight">
                          {day.day}
                        </p>
                      </div>
                      {/* Content */}
                      <div className="flex-1 p-5 bg-surface">
                        <p
                          className="text-cream text-sm font-semibold mb-1"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {day.location}
                        </p>
                        <p className="text-cream-dim text-sm leading-relaxed">{day.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips + CTA */}
              <div className="space-y-6">
                <div className="bg-surface border border-dim p-6">
                  <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-5">
                    Practical Tips
                  </p>
                  <ul className="space-y-3">
                    {it.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-gold text-xs mt-0.5 flex-shrink-0">✦</span>
                        <span className="text-cream-dim text-sm leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="p-6 border border-dim text-center"
                  style={{
                    background: "linear-gradient(135deg, #1a1530 0%, #131720 100%)",
                  }}
                >
                  <p
                    className="text-cream text-base mb-2"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                  >
                    Ready to book?
                  </p>
                  <p className="text-mist text-xs mb-5 leading-relaxed">
                    Get pre-filled Booking.com links for every overnight stop — dates auto-calculated.
                  </p>
                  <Link
                    href={`/plan?itinerary=${it.id}`}
                    className="block bg-gold hover:bg-gold-light text-highland text-xs font-semibold px-4 py-3 transition-colors uppercase tracking-widest mb-2"
                  >
                    Plan &amp; Book This Trip
                  </Link>
                  <Link
                    href="/accommodation"
                    className="block border border-dim hover:border-heather text-mist hover:text-cream text-xs px-4 py-2.5 transition-colors uppercase tracking-widest"
                  >
                    Browse All Accommodation
                  </Link>
                </div>
              </div>
            </div>

          </article>
        ))}
      </div>

      {/* Bottom CTA */}
      <section
        className="relative overflow-hidden grain border-t border-dim py-24"
        style={{
          background: "linear-gradient(135deg, #1a1530 0%, #0b0e15 50%, #0e1520 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(201,144,58,0.07) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block rule-gold mx-auto mb-2" />
          <h2
            className="text-4xl text-cream mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Every mile worth it
          </h2>
          <p className="text-cream-dim mb-10 leading-relaxed">
            Find your accommodation, explore the towns along the route, and check what events are
            happening during your visit.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/accommodation"
              className="bg-gold hover:bg-gold-light text-highland font-semibold px-8 py-3.5 transition-colors text-sm uppercase tracking-widest"
            >
              Search Accommodation
            </Link>
            <Link
              href="/towns"
              className="border border-cream/20 hover:border-cream/50 text-cream-dim hover:text-cream px-8 py-3.5 transition-colors text-sm uppercase tracking-widest"
            >
              Explore Towns
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
