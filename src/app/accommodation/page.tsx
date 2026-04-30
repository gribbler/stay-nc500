import type { Metadata } from "next";
import BookingWidget from "@/components/BookingWidget";
import { towns } from "@/data/towns";

export const metadata: Metadata = {
  title: "Accommodation along the NC500 | Stay NC500",
  description:
    "Find hotels, B&Bs, self-catering cottages, glamping, and campsites along the North Coast 500 route in Scotland.",
};

export default function AccommodationPage() {
  return (
    <main className="min-h-screen bg-highland">

      {/* Page header */}
      <section className="relative overflow-hidden grain border-b border-dim py-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 80% 50%, rgba(124,107,140,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="rule-gold" />
          <p className="text-heather-light text-xs tracking-[0.2em] uppercase mb-4">
            NC500 Accommodation
          </p>
          <h1
            className="text-5xl md:text-6xl text-cream mb-5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            Find Your Perfect Stay
          </h1>
          <p className="text-cream-dim text-lg max-w-2xl leading-relaxed">
            From luxury lochside hotels to cosy Highland B&Bs and wild camping spots — search
            availability and prices along the entire NC500 route.
          </p>
        </div>
      </section>

      {/* Booking widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BookingWidget />
      </section>

      {/* Tips by town */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-10">
          <span className="rule-heather" />
          <h2
            className="text-3xl text-cream"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Accommodation by Location
          </h2>
          <p className="text-mist mt-2 text-sm">
            Key things to know before you book at each stop on the route.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dim">
          {towns.map((town) => (
            <div
              key={town.slug}
              className="bg-surface hover:bg-elevated p-6 transition-colors"
            >
              <h3
                className="text-cream text-xl mb-0.5"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                {town.name}
              </h3>
              <p className="text-heather text-xs tracking-widest uppercase mb-3">{town.region}</p>
              <p className="text-mist text-sm leading-relaxed">{town.accommodation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking tips */}
      <section className="border-t border-dim py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="rule-gold" />
            <h2
              className="text-3xl text-cream"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              NC500 Booking Tips
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-dim">
            {[
              {
                title: "Book Early",
                body: "Peak season runs June–September. Popular spots like Applecross, Ullapool, and Durness fill up months in advance. Book as early as possible.",
              },
              {
                title: "Flexible Dates Help",
                body: "Shoulder season (May, October) offers lower prices, fewer crowds, and still excellent weather windows. Midweek stays are often cheaper.",
              },
              {
                title: "Campervans Welcome",
                body: "The NC500 is hugely popular with campervan travellers. Many campsites offer motorhome hookups, but wild camping is also legal in Scotland under the Land Reform Act.",
              },
              {
                title: "Allow Enough Nights",
                body: "Most people allow 7–10 days for the full circuit. Rushing it means missing hidden gems. Plan for at least 2 nights in Ullapool, Torridon, and the north coast.",
              },
            ].map((tip) => (
              <div key={tip.title} className="bg-surface p-6">
                <h3
                  className="text-gold-light text-lg mb-3"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  {tip.title}
                </h3>
                <p className="text-mist text-sm leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
