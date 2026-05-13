export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  town?: string;
  category: string;
  url?: string;
  imageUrl?: string;
}

// ---------------------------------------------------------------------------
// Data Thistle / VisitScotland API
// ---------------------------------------------------------------------------
// Data Thistle powers VisitScotland's event data. Register for a free API key at:
//   https://www.datathistle.com
//
// Once you have your key, set the environment variable:
//   DATATHISTLE_API_KEY=your_key_here
//
// The API endpoint we use filters by the Highland region with keyword "NC500"
// or "North Coast 500" to get relevant events.
// ---------------------------------------------------------------------------

const DATATHISTLE_API_KEY = process.env.DATATHISTLE_API_KEY;
const DATATHISTLE_BASE = "https://api.datathistle.com/v1";

// Lairg is the geographic centre of the NC500 route.
// 40 miles ≈ 64 km covers the full Highland circuit.
const LAIRG_LAT = 58.0126; // geographic centre of NC500 bounding box
const LAIRG_LNG = -4.4505;
const RADIUS_KM = 103; // 64 miles — covers full NC500 circuit

interface DataThistlePlace {
  name?: string;
  town?: string;
  postal_code?: string;
}

interface DataThistleSchedule {
  start_ts?: string;
  end_ts?: string;
  place?: DataThistlePlace;
  tags?: string[];
}

interface DataThistleEvent {
  event_id: string;
  name: string;
  descriptions?: { type: string; description: string }[];
  schedules?: DataThistleSchedule[];
  tags?: string[];
  website?: string;
  links?: { url: string; type: string }[];
  images?: { url: string }[];
}

function mapEvent(e: DataThistleEvent): Event {
  const schedule = e.schedules?.[0] ?? {};
  const place = schedule.place ?? {};
  const description = e.descriptions?.find((d) => d.description)?.description ?? "";
  const tags = [...(e.tags ?? []), ...(schedule.tags ?? [])];
  const category = tags[0]
    ? tags[0].charAt(0).toUpperCase() + tags[0].slice(1)
    : "Event";
  const url =
    e.website ||
    e.links?.find((l) => l.type === "booking" || l.type === "info")?.url;

  return {
    id: e.event_id,
    title: e.name,
    description: description.slice(0, 500),
    startDate: schedule.start_ts?.slice(0, 10) ?? "",
    endDate: schedule.end_ts?.slice(0, 10),
    location: place.name ?? place.town ?? "Scottish Highlands",
    town: place.town,
    category,
    url,
    imageUrl: e.images?.[0]?.url,
  };
}

async function fetchFromDataThistle(): Promise<Event[]> {
  if (!DATATHISTLE_API_KEY) return [];

  const baseParams = new URLSearchParams({
    lat: String(LAIRG_LAT),
    lng: String(LAIRG_LNG),
    distance: String(RADIUS_KM),
    limit: "20",
  });

  const all: DataThistleEvent[] = [];
  const MAX_PAGES = 25;

  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const pageUrl = `${DATATHISTLE_BASE}/events?${baseParams.toString()}&page=${page}`;
      const res = await fetch(pageUrl, {
        headers: { Authorization: `Bearer ${DATATHISTLE_API_KEY}` },
        cache: "no-store",
      });
      if (!res.ok) break;
      const data: DataThistleEvent[] = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;
      all.push(...data);
      if (!res.headers.get("x-next")) break;
    }
  } catch {
    // return whatever we managed to collect
  }

  return all.map(mapEvent);
}

// ---------------------------------------------------------------------------
// Fallback: sample events for when the API is not configured
// ---------------------------------------------------------------------------
function getSampleEvents(): Event[] {
  const year = new Date().getFullYear();
  return [
    {
      id: "sample-1",
      title: "Durness Highland Gathering",
      description:
        "The traditional Highland Games at Durness — the most northwesterly games on the mainland. Expect heavy athletics, pipe bands, dancing, and a great community atmosphere.",
      startDate: `${year}-07-12`,
      location: "Durness, Sutherland",
      town: "Durness",
      category: "Highland Games",
      url: "https://www.visitscotland.com",
    },
    {
      id: "sample-2",
      title: "Ullapool Book Festival",
      description:
        "An intimate literary festival held each spring in the village of Ullapool. Attracts major authors and thinkers to this beautiful coastal setting.",
      startDate: `${year}-05-08`,
      endDate: `${year}-05-11`,
      location: "Ullapool, Wester Ross",
      town: "Ullapool",
      category: "Arts & Culture",
      url: "https://www.ullapoolbookfestival.co.uk",
    },
    {
      id: "sample-3",
      title: "Caithness International Science Festival",
      description:
        "A wide-ranging science and technology festival based in Caithness, with events across Wick and Thurso. Fun for all ages with hands-on experiments and expert talks.",
      startDate: `${year}-09-06`,
      endDate: `${year}-09-14`,
      location: "Wick & Thurso, Caithness",
      town: "Wick",
      category: "Science & Education",
      url: "https://www.caithnesssciencefestival.co.uk",
    },
    {
      id: "sample-4",
      title: "North Coast 500 Festival of Speed",
      description:
        "A celebration of classic cars and motorbikes gathering in Inverness before a 2-day scenic tour of the NC500 route.",
      startDate: `${year}-06-21`,
      endDate: `${year}-06-22`,
      location: "Inverness",
      town: "Inverness",
      category: "Motoring",
      url: "https://www.northcoast500.com",
    },
    {
      id: "sample-5",
      title: "Dornoch Highland Games",
      description:
        "One of the oldest Highland Games in Scotland, held on the links of Royal Dornoch. Traditional heavy athletics, dancing, and pipe band competitions.",
      startDate: `${year}-07-26`,
      location: "Dornoch, Sutherland",
      town: "Dornoch",
      category: "Highland Games",
    },
    {
      id: "sample-6",
      title: "Torridon Wildlife Weekend",
      description:
        "Guided walks and talks exploring the wildlife of the Torridon mountains and coastline. Spot red deer, golden eagles, pine martens, and otters with expert naturalists.",
      startDate: `${year}-08-16`,
      endDate: `${year}-08-17`,
      location: "Torridon, Wester Ross",
      town: "Torridon",
      category: "Nature & Wildlife",
      url: "https://www.nts.org.uk",
    },
    {
      id: "sample-7",
      title: "Wick Jazz Festival",
      description:
        "A popular jazz festival held in historic Wick, bringing world-class musicians to the far north of Scotland.",
      startDate: `${year}-08-08`,
      endDate: `${year}-08-10`,
      location: "Wick, Caithness",
      town: "Wick",
      category: "Music",
    },
    {
      id: "sample-8",
      title: "Handa Island Puffin Season Open Days",
      description:
        "Special guided trips to Handa Island to see the puffin colonies at their peak. Ferries run from Tarbet near Scourie.",
      startDate: `${year}-05-01`,
      endDate: `${year}-08-31`,
      location: "Handa Island, Sutherland",
      town: "Scourie",
      category: "Nature & Wildlife",
      url: "https://www.scottishwildlifetrust.org.uk",
    },
  ];
}

// ---------------------------------------------------------------------------
// Caching — works on Cloudflare Workers (Web Cache API) and Node.js dev
// (in-memory). TTL is 24 hours.
// ---------------------------------------------------------------------------
const CACHE_TTL = 86400;
const inMemory = new Map<string, { data: unknown; expires: number }>();

async function withCache<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const cacheReq = new Request(`https://nc500-cache.internal/${key}`);

  if (typeof caches !== "undefined") {
    try {
      const store = await caches.open("nc500");
      const hit = await store.match(cacheReq);
      if (hit) return hit.json() as Promise<T>;
      const data = await fn();
      await store.put(
        cacheReq,
        new Response(JSON.stringify(data), {
          headers: { "Cache-Control": `max-age=${CACHE_TTL}` },
        })
      );
      return data;
    } catch {
      // fall through to in-memory
    }
  }

  const mem = inMemory.get(key);
  if (mem && Date.now() < mem.expires) return mem.data as T;
  const data = await fn();
  inMemory.set(key, { data, expires: Date.now() + CACHE_TTL * 1000 });
  return data;
}

// ---------------------------------------------------------------------------
// Main export: getEvents()
// Falls back to sample events if the API is not configured.
// ---------------------------------------------------------------------------
export async function getEvents(): Promise<{ events: Event[]; source: "api" | "sample" }> {
  return withCache("events-v1", async () => {
    const apiEvents = await fetchFromDataThistle();

    if (apiEvents.length > 0) {
      const now = new Date().toISOString().slice(0, 10);
      const upcoming = apiEvents
        .filter((e) => e.startDate >= now)
        .sort((a, b) => a.startDate.localeCompare(b.startDate));
      return { events: upcoming, source: "api" as const };
    }

    const now = new Date().toISOString().slice(0, 10);
    const sample = getSampleEvents()
      .filter((e) => e.startDate >= now)
      .sort((a, b) => a.startDate.localeCompare(b.startDate));

    return { events: sample, source: "sample" as const };
  });
}

export function formatEventDate(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };

  if (!endDate || endDate === startDate) {
    return start.toLocaleDateString("en-GB", opts);
  }

  const end = new Date(endDate);
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${start.getDate()}–${end.toLocaleDateString("en-GB", opts)}`;
  }

  return `${start.toLocaleDateString("en-GB", opts)} – ${end.toLocaleDateString("en-GB", opts)}`;
}
