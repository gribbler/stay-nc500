export type CampsiteType = "tent" | "motorhome" | "glamping" | "pod" | "bothie";

export interface Campsite {
  id: string;
  name: string;
  town: string;
  region: string;
  types: CampsiteType[];
  description: string;
  facilities: string[];
  priceFrom: string; // e.g. "£12/night"
  coordinates: { lat: number; lng: number };
  pitchupSlug?: string; // for pitchup.com/campsites/{slug}
  bookingUrl: string;  // direct booking or pitchup search
  website?: string;
}

export const campsites: Campsite[] = [
  {
    id: "bught-park",
    name: "Bught Park Caravan & Camping",
    town: "Inverness",
    region: "Inverness-shire",
    types: ["tent", "motorhome"],
    description:
      "A well-equipped municipal site on the banks of the River Ness, walking distance from Inverness city centre. A great base for the NC500 start or finish.",
    facilities: ["Electric hook-ups", "Showers", "Toilets", "Laundry", "Wi-Fi", "Dog friendly"],
    priceFrom: "£18/night",
    coordinates: { lat: 57.4726, lng: -4.2358 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Inverness/Inverness/bught-park-caravan-site/",
    website: "https://www.inverness.gov.uk",
  },
  {
    id: "dornoch-firth",
    name: "Dornoch Firth Caravan Park",
    town: "Bonar Bridge",
    region: "Sutherland",
    types: ["tent", "motorhome"],
    description:
      "A peaceful riverside site at the head of the Dornoch Firth, with excellent views and easy access to the east coast towns. A popular first overnight stop heading north.",
    facilities: ["Electric hook-ups", "Showers", "Toilets", "Play area", "Dog friendly"],
    priceFrom: "£14/night",
    coordinates: { lat: 57.8897, lng: -4.3542 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Sutherland/Bonar_Bridge/",
  },
  {
    id: "grannie-camp",
    name: "Grannie's Heilan Hame",
    town: "Embo",
    region: "Sutherland",
    types: ["tent", "motorhome", "pod"],
    description:
      "A large, well-run holiday park near Dornoch with direct beach access. The timber camping pods sleep four and are a great option if you don't want to pitch in the rain.",
    facilities: ["Electric hook-ups", "Showers", "Bar & restaurant", "Pool", "Play area", "Pods", "Dog friendly"],
    priceFrom: "£20/night",
    coordinates: { lat: 57.8852, lng: -4.0126 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Sutherland/Embo/grannies-heilan-hame/",
  },
  {
    id: "dunrobin-camping",
    name: "Golspie Camping & Caravanning",
    town: "Golspie",
    region: "Sutherland",
    types: ["tent", "motorhome"],
    description:
      "A small, quiet site just outside Golspie, within cycling distance of Dunrobin Castle. Great for an early morning visit before the coach parties arrive.",
    facilities: ["Electric hook-ups", "Showers", "Toilets", "Dog friendly"],
    priceFrom: "£13/night",
    coordinates: { lat: 57.9747, lng: -3.9805 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Sutherland/Golspie/",
  },
  {
    id: "dunnet-bay",
    name: "Dunnet Bay Caravan Club Site",
    town: "Dunnet",
    region: "Caithness",
    types: ["tent", "motorhome"],
    description:
      "One of the finest coastal campsites in Scotland. Set right behind Dunnet Bay's magnificent white-sand beach, with views to Dunnet Head — the UK's most northerly point. Book well ahead in summer.",
    facilities: ["Electric hook-ups", "Showers", "Toilets", "Laundry", "Wi-Fi", "Dog friendly"],
    priceFrom: "£22/night",
    coordinates: { lat: 58.5903, lng: -3.3757 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Caithness/Dunnet/dunnet-bay-caravan-club-site/",
  },
  {
    id: "john-ogroats-camp",
    name: "John O'Groats Caravan & Camping",
    town: "John O'Groats",
    region: "Caithness",
    types: ["tent", "motorhome"],
    description:
      "Wake up at the top of Britain. This basic but well-loved site is right next to the famous signpost and has views across the Pentland Firth to Orkney on clear days.",
    facilities: ["Electric hook-ups", "Showers", "Toilets", "Shop nearby", "Dog friendly"],
    priceFrom: "£16/night",
    coordinates: { lat: 58.6438, lng: -3.0699 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Caithness/John_OGroats/",
  },
  {
    id: "tongue-campsite",
    name: "Tongue Youth Hostel & Campsite",
    town: "Tongue",
    region: "Sutherland",
    types: ["tent", "motorhome", "bothie"],
    description:
      "A classic Highland campsite on the shores of the Kyle of Tongue, with views to Ben Hope and Ben Loyal. The SYHA hostel next door makes this popular with solo travellers and walkers.",
    facilities: ["Showers", "Toilets", "Hostel adjacent", "Dog friendly"],
    priceFrom: "£11/night",
    coordinates: { lat: 58.4844, lng: -4.4215 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Sutherland/Tongue/",
  },
  {
    id: "sango-sands",
    name: "Sango Sands Oasis",
    town: "Durness",
    region: "Sutherland",
    types: ["tent", "motorhome"],
    description:
      "Perched on the clifftop above Sango Bay, this is one of the most dramatically positioned campsites in Scotland. The sunsets over the Atlantic are extraordinary. Right in the heart of Durness village.",
    facilities: ["Electric hook-ups", "Showers", "Toilets", "Bar & café", "Dog friendly"],
    priceFrom: "£16/night",
    coordinates: { lat: 58.5676, lng: -4.7516 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Sutherland/Durness/sango-sands-oasis/",
    website: "https://www.sangosands.com",
  },
  {
    id: "scourie-camping",
    name: "Scourie Caravan & Camping Park",
    town: "Scourie",
    region: "Sutherland",
    types: ["tent", "motorhome"],
    description:
      "A well-maintained park in the tiny village of Scourie, perfectly placed midway along the wild northwest coast. Close to the Handa Island ferry and the Kylesku Bridge.",
    facilities: ["Electric hook-ups", "Showers", "Toilets", "Dog friendly"],
    priceFrom: "£15/night",
    coordinates: { lat: 58.3545, lng: -5.1512 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Sutherland/Scourie/scourie-camping-and-caravanning-park/",
  },
  {
    id: "clachtoll-beach",
    name: "Clachtoll Beach Campsite",
    town: "Lochinver",
    region: "Sutherland",
    types: ["tent"],
    description:
      "A small, beautiful site on a white-sand beach in the Assynt peninsula. Tent-only, which keeps it peaceful. The ruined broch on the headland is a 10-minute walk away. One of the NC500's hidden gems.",
    facilities: ["Toilets", "Showers (basic)", "Dog friendly"],
    priceFrom: "£12/night",
    coordinates: { lat: 58.1628, lng: -5.3365 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Sutherland/Lochinver/clachtoll-beach-campsite/",
  },
  {
    id: "achmelvich-beach",
    name: "Achmelvich Beach SYHA Campsite",
    town: "Lochinver",
    region: "Sutherland",
    types: ["tent", "bothie"],
    description:
      "Crystal-clear turquoise water that looks more Caribbean than Scottish. This basic site is beside one of Scotland's most beautiful beaches. Book the 'love bothie' for a truly unique overnight.",
    facilities: ["Toilets", "Cold showers", "Bothie available", "Dog friendly"],
    priceFrom: "£10/night",
    coordinates: { lat: 58.1716, lng: -5.3112 },
    bookingUrl: "https://www.hostellingscotland.org.uk/hostels/achmelvich/",
    website: "https://www.hostellingscotland.org.uk/hostels/achmelvich/",
  },
  {
    id: "ullapool-camp",
    name: "Broomfield Holiday Park",
    town: "Ullapool",
    region: "Ross-shire",
    types: ["tent", "motorhome"],
    description:
      "Right on Ullapool's seafront, with views across Loch Broom to the mountains beyond. Walk into the village for the Ceilidh Place, fresh fish, and the Caledonian MacBrayne ferry to the Outer Hebrides.",
    facilities: ["Electric hook-ups", "Showers", "Toilets", "Wi-Fi", "Dog friendly"],
    priceFrom: "£20/night",
    coordinates: { lat: 57.8954, lng: -5.1601 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Ross-shire/Ullapool/broomfield-holiday-park/",
    website: "https://www.broomfieldholidaypark.co.uk",
  },
  {
    id: "gairloch-sands",
    name: "Gairloch Sands Youth Hostel & Camping",
    town: "Gairloch",
    region: "Wester Ross",
    types: ["tent", "motorhome"],
    description:
      "A wonderfully situated site on the shores of Loch Gairloch, with sandy beaches a short walk away and views to the Torridon mountains. Great base for sea kayaking and wildlife watching.",
    facilities: ["Electric hook-ups", "Showers", "Toilets", "Play area", "Dog friendly"],
    priceFrom: "£16/night",
    coordinates: { lat: 57.7239, lng: -5.7012 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Ross-shire/Gairloch/",
  },
  {
    id: "torridon-campsite",
    name: "Torridon Campsite (NTS)",
    town: "Torridon",
    region: "Wester Ross",
    types: ["tent", "motorhome"],
    description:
      "Run by the National Trust for Scotland at the foot of Beinn Alligin and Liathach. Waking up surrounded by ancient Torridonian sandstone mountains is an unforgettable experience. The NTS visitor centre is next door.",
    facilities: ["Showers", "Toilets", "Bike hire nearby", "Dog friendly"],
    priceFrom: "£13/night",
    coordinates: { lat: 57.5447, lng: -5.5021 },
    bookingUrl: "https://www.nts.org.uk/visit/places/torridon/camping",
    website: "https://www.nts.org.uk/visit/places/torridon",
  },
  {
    id: "applecross-campsite",
    name: "Applecross Campsite",
    town: "Applecross",
    region: "Wester Ross",
    types: ["tent", "motorhome", "glamping"],
    description:
      "Set in the stunning Applecross Bay, this is one of the most coveted pitches on the NC500. Walk to the legendary Applecross Inn for seafood and whisky after dark. Glamping pods available for those who want the view without the tent.",
    facilities: ["Electric hook-ups", "Showers", "Toilets", "Pods", "Dog friendly"],
    priceFrom: "£15/night",
    coordinates: { lat: 57.4333, lng: -5.8108 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Ross-shire/Applecross/applecross-campsite/",
    website: "https://www.applecross.uk.com/campsite",
  },
  {
    id: "shieldaig-camping",
    name: "Shieldaig Camping",
    town: "Shieldaig",
    region: "Wester Ross",
    types: ["tent"],
    description:
      "A small, low-key site in one of the prettiest villages on the west coast. Shieldaig sits on Loch Torridon with views of a wooded island. Quiet, uncrowded, and utterly Highland.",
    facilities: ["Toilets", "Basic facilities", "Dog friendly"],
    priceFrom: "£10/night",
    coordinates: { lat: 57.5168, lng: -5.6476 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Ross-shire/Shieldaig/",
  },
  {
    id: "loch-ness-camp",
    name: "Loch Ness Shores Camping & Caravanning",
    town: "Foyers",
    region: "Inverness-shire",
    types: ["tent", "motorhome", "glamping", "pod"],
    description:
      "A well-appointed site right on the south shore of Loch Ness — you may spot the monster from your pitch. Glamping pods and bell tents available. Popular with families and monster hunters alike.",
    facilities: ["Electric hook-ups", "Showers", "Toilets", "Shop", "Glamping pods", "Dog friendly"],
    priceFrom: "£18/night",
    coordinates: { lat: 57.2427, lng: -4.4752 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Inverness-shire/Foyers/loch-ness-shores/",
    website: "https://www.lochness-shores.co.uk",
  },
  {
    id: "beauly-glamping",
    name: "Lovat Arms Glamping",
    town: "Beauly",
    region: "Inverness-shire",
    types: ["glamping", "pod"],
    description:
      "Luxury safari tents and shepherd's huts just outside Beauly, an ideal NC500 starting or ending point. Each unit is fully equipped with beds, kitchenette, and private outdoor seating.",
    facilities: ["Private facilities", "Fully equipped kitchen", "Fire pit", "Dog friendly (some units)"],
    priceFrom: "£85/night",
    coordinates: { lat: 57.4824, lng: -4.4703 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Inverness-shire/Beauly/",
  },
  {
    id: "dornoch-glamping",
    name: "Dornoch Glamping",
    town: "Dornoch",
    region: "Sutherland",
    types: ["glamping", "pod"],
    description:
      "Beautifully appointed geodesic domes and shepherd's huts near Dornoch cathedral. Each dome has a transparent roof panel for stargazing from your bed — the dark skies here are exceptional.",
    facilities: ["En-suite", "Kitchenette", "Hot tub (some units)", "Breakfast hamper available", "Dog friendly"],
    priceFrom: "£95/night",
    coordinates: { lat: 57.8794, lng: -4.0263 },
    bookingUrl: "https://www.coolcamping.com/campsites/uk/scotland/highlands/dornoch",
  },
  {
    id: "nc500-pods-thurso",
    name: "NC500 Pods at Thurso",
    town: "Thurso",
    region: "Caithness",
    types: ["pod", "glamping"],
    description:
      "Modern timber pods set on the outskirts of Thurso, the most northerly mainland town in Britain. Each pod sleeps up to four and has heating, a small kitchen, and outdoor seating. Easy walking distance to the town and Thurso Beach.",
    facilities: ["Heating", "Kitchen", "Shower room", "Outdoor seating", "Dog friendly"],
    priceFrom: "£70/night",
    coordinates: { lat: 58.5936, lng: -3.5225 },
    bookingUrl: "https://www.pitchup.com/campsites/Scotland/Highlands/Caithness/Thurso/",
  },
];

export const typeLabels: Record<CampsiteType, string> = {
  tent: "Tents",
  motorhome: "Motorhomes & Vans",
  glamping: "Glamping",
  pod: "Pods & Cabins",
  bothie: "Bothies",
};

export const typeIcons: Record<CampsiteType, string> = {
  tent: "⛺",
  motorhome: "🚐",
  glamping: "✨",
  pod: "🏕️",
  bothie: "🪨",
};
