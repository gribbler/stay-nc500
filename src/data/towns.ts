export interface Town {
  slug: string;
  name: string;
  region: string;
  description: string;
  highlights: string[];
  accommodation: string;
  gettingThere: string;
  coordinates: { lat: number; lng: number };
  heroImage?: string;
}

export const towns: Town[] = [
  {
    slug: "inverness",
    name: "Inverness",
    region: "Inverness-shire",
    heroImage: "https://images.unsplash.com/photo-1667723814056-9f1f78abb856?w=1200&q=80&fit=crop",
    description:
      "The capital of the Highlands and the traditional starting point of the NC500. Inverness sits at the mouth of the River Ness and is steeped in history, from Culloden Battlefield to the iconic Inverness Castle overlooking the city. It's the ideal base for stocking up, resting, and planning your journey north.",
    highlights: [
      "Inverness Castle & Museum",
      "Culloden Battlefield (nearby)",
      "Loch Ness & Urquhart Castle",
      "River Ness walks",
      "Victorian Market",
    ],
    accommodation:
      "Inverness offers the widest range of accommodation on the NC500 — from luxury hotels to budget hostels, B&Bs, and self-catering apartments. Book well in advance during peak season (June–September).",
    gettingThere:
      "Inverness Airport connects to major UK cities. The city also has direct train and bus links from Edinburgh, Glasgow, and London.",
    coordinates: { lat: 57.4778, lng: -4.2247 },
  },
  {
    slug: "beauly",
    name: "Beauly",
    region: "Inverness-shire",
    heroImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80&fit=crop",
    description:
      "A charming small town 15 miles west of Inverness, Beauly takes its name from the French 'beau lieu' — beautiful place. It's home to the ruins of a 13th-century priory and makes a pleasant first stop heading north on the NC500.",
    highlights: [
      "Beauly Priory (13th century ruins)",
      "Strathglass valley views",
      "Local artisan shops",
      "Lovat Arms Hotel",
    ],
    accommodation:
      "Small selection of B&Bs, a hotel, and holiday cottages. Inverness is close enough to use as a base.",
    gettingThere: "15 miles west of Inverness on the A862.",
    coordinates: { lat: 57.4786, lng: -4.4689 },
  },
  {
    slug: "dingwall",
    name: "Dingwall",
    region: "Ross-shire",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&fit=crop",
    description:
      "One of Scotland's oldest royal burghs, Dingwall sits at the head of the Cromarty Firth and is often the first major town you pass through heading north. It was the birthplace of Macbeth and has strong Viking heritage.",
    highlights: [
      "Dingwall Museum",
      "Mitchell Hill War Memorial",
      "Cromarty Firth wildlife",
      "Tulloch Castle (now a hotel)",
    ],
    accommodation:
      "A range of B&Bs and guesthouses, plus the historic Tulloch Castle Hotel.",
    gettingThere: "On the A9, 15 miles north of Inverness. Regular train service.",
    coordinates: { lat: 57.5966, lng: -4.4275 },
  },
  {
    slug: "ullapool",
    name: "Ullapool",
    region: "Wester Ross",
    heroImage: "https://images.unsplash.com/photo-1484910292437-025e5d13ce87?w=1200&q=80&fit=crop",
    description:
      "Ullapool is the largest settlement on the northwest coast and one of the most beloved stops on the NC500. This picturesque fishing village on the shores of Loch Broom offers stunning views, excellent seafood, a vibrant arts scene, and is the ferry gateway to the Outer Hebrides.",
    highlights: [
      "Loch Broom waterfront",
      "Ferry to Stornoway (Isle of Lewis)",
      "Ullapool Museum",
      "Falls of Measach & Corrieshalloch Gorge",
      "Summer Isles boat trips",
      "Seafood straight from the boats",
    ],
    accommodation:
      "Hotels, B&Bs, hostels, and campsites. The Ceilidh Place is a legendary arts hotel. Very popular — book months ahead for July/August.",
    gettingThere: "58 miles northwest of Inverness on the A835. No rail link.",
    coordinates: { lat: 57.8959, lng: -5.1601 },
  },
  {
    slug: "gairloch",
    name: "Gairloch",
    region: "Wester Ross",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&fit=crop",
    description:
      "Gairloch is a scattered community of villages around the shores of Loch Gairloch, boasting some of the finest beaches on the Scottish mainland. On a clear day, the views stretch to the Outer Hebrides. It's a popular base for exploring Torridon and the Beinn Eighe National Nature Reserve.",
    highlights: [
      "Big Sand & Red Point beaches",
      "Gairloch Heritage Museum",
      "Beinn Eighe Nature Reserve",
      "Flowerdale Waterfall",
      "Whale and dolphin watching",
    ],
    accommodation:
      "Hotels, B&Bs, self-catering cottages, and a campsite. The Myrtle Bank Hotel and the Old Inn are popular choices.",
    gettingThere:
      "76 miles northwest of Inverness via Garve and Kinlochewe, or along the spectacular coast road from Ullapool.",
    coordinates: { lat: 57.7237, lng: -5.6785 },
  },
  {
    slug: "torridon",
    name: "Torridon",
    region: "Wester Ross",
    heroImage: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=80&fit=crop",
    description:
      "One of the most dramatic landscapes in Britain, Torridon is defined by its ancient red sandstone mountains — some of the oldest rock on Earth. Beinn Alligin, Liathach, and Beinn Eighe tower over a pristine loch, creating views that stop you in your tracks.",
    highlights: [
      "Torridon mountains (hillwalking & Munros)",
      "Beinn Eighe National Nature Reserve",
      "Torridon Countryside Centre (NTS)",
      "Sea kayaking on Loch Torridon",
      "Red deer and golden eagle spotting",
    ],
    accommodation:
      "The Torridon hotel is a luxury retreat. There is also a SYHA hostel, campsite, and self-catering options.",
    gettingThere: "Follow the A896 south from Kinlochewe.",
    coordinates: { lat: 57.5422, lng: -5.5072 },
  },
  {
    slug: "applecross",
    name: "Applecross",
    region: "Wester Ross",
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80&fit=crop",
    description:
      "Applecross is reached either via the legendary Bealach na Bà — one of the UK's highest mountain passes — or the stunning coastal road from Shieldaig. The remote village faces the Isle of Skye across the Inner Sound and has a real end-of-the-world feel that keeps visitors coming back.",
    highlights: [
      "Bealach na Bà mountain pass (626m)",
      "Applecross Inn (famous seafood pub)",
      "Coastal road to Shieldaig",
      "Views of Skye and Raasay",
      "Applecross Heritage Centre",
    ],
    accommodation:
      "The Applecross Inn has rooms. There are also self-catering cottages and a campsite.",
    gettingThere:
      "Via the Bealach na Bà (steep, not suitable for large vehicles) or the coastal road from Shieldaig.",
    coordinates: { lat: 57.4343, lng: -5.8104 },
  },
  {
    slug: "lochinver",
    name: "Lochinver",
    region: "Assynt, Sutherland",
    heroImage: "https://images.unsplash.com/photo-1516570628389-492e1488089d?w=1200&q=80&fit=crop",
    description:
      "Lochinver is a working fishing port in the heart of Assynt — a landscape of extraordinary ancient mountains rising from flat moorland. The area around Lochinver is famous for its dramatic geology, freshwater lochs, and the distinctive sugar-loaf peak of Suilven.",
    highlights: [
      "Suilven (iconic mountain)",
      "Lochinver Larder (world-famous pies)",
      "Inver Lodge Hotel",
      "Achmelvich & Clachtoll beaches",
      "Knockan Crag NNR (geology)",
    ],
    accommodation:
      "Inver Lodge is a luxury option. B&Bs, self-catering, and a campsite at Clachtoll are also available.",
    gettingThere: "Via the A837 from Ullapool or the scenic B869 coastal road.",
    coordinates: { lat: 58.1499, lng: -5.2427 },
  },
  {
    slug: "scourie",
    name: "Scourie",
    region: "Sutherland",
    heroImage: "https://images.unsplash.com/photo-1687524926362-ca1e306b48cd?w=1200&q=80&fit=crop",
    description:
      "A small, peaceful village on the northwest coast with a beautiful sandy bay. Scourie is the gateway to Handa Island — a seabird reserve that hosts tens of thousands of puffins, guillemots, and razorbills each summer.",
    highlights: [
      "Handa Island seabird reserve (ferry from Tarbet)",
      "Scourie Bay beach",
      "Sea angling",
      "Kyle of Durness road",
    ],
    accommodation:
      "Scourie Hotel, B&Bs, and self-catering cottages. Small but welcoming.",
    gettingThere: "On the A894, between Lochinver and Durness.",
    coordinates: { lat: 58.3546, lng: -5.1595 },
  },
  {
    slug: "durness",
    name: "Durness",
    region: "Sutherland",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&fit=crop",
    description:
      "Durness sits at the very northwest corner of mainland Britain, a remote and magnificent place where enormous sandy beaches meet towering sea cliffs. It was a childhood holiday destination of John Lennon, and the village celebrates this connection warmly.",
    highlights: [
      "Smoo Cave (largest sea cave in Britain)",
      "Balnakeil Beach",
      "Balnakeil Craft Village",
      "Cape Wrath (via ferry and minibus)",
      "John Lennon memorial garden",
      "Faraid Head headland walk",
    ],
    accommodation:
      "Durness Youth Hostel, B&Bs, self-catering, and the Smoo Cave Hotel. Sango Sands campsite has incredible clifftop views.",
    gettingThere:
      "At the end of the A838 from Lairg, or west on the A838 from Tongue.",
    coordinates: { lat: 58.5675, lng: -4.7418 },
  },
  {
    slug: "tongue",
    name: "Tongue",
    region: "Sutherland",
    heroImage: "https://images.unsplash.com/photo-1610890690772-3f7fed4d7c80?w=1200&q=80&fit=crop",
    description:
      "Tongue is a beautiful village on the Kyle of Tongue, a long tidal sea loch on the north coast. The dramatic ruins of Castle Varrich sit above the village, and the causeway across the Kyle provides one of the most photogenic views on the entire route.",
    highlights: [
      "Kyle of Tongue causeway & views",
      "Castle Varrich ruins",
      "Ben Loyal (Queen of Scottish mountains)",
      "Tongue Beach",
    ],
    accommodation:
      "The Tongue Hotel, Ben Loyal Hotel, B&Bs, and self-catering cottages.",
    gettingThere: "On the A836 between Durness and Thurso.",
    coordinates: { lat: 58.4814, lng: -4.4208 },
  },
  {
    slug: "thurso",
    name: "Thurso",
    region: "Caithness",
    heroImage: "https://images.unsplash.com/photo-1729250036760-6764204a4f80?w=1200&q=80&fit=crop",
    description:
      "Thurso is the most northerly mainland town in Britain and a major hub on the NC500's north coast. It has a surprisingly good surf scene — Thurso East is one of Europe's premier reef breaks. The nearby Castle of Mey, the Queen Mother's beloved Highland home, is a must-visit.",
    highlights: [
      "Thurso surfing (Thurso East reef break)",
      "Castle of Mey (former royal residence)",
      "Holborn Head lighthouse walk",
      "Northlands Viking Centre",
      "Ferry to Orkney from Scrabster",
    ],
    accommodation:
      "Good range of hotels, B&Bs, guesthouses, and self-catering. More options than most NC500 towns.",
    gettingThere: "On the A9/A836, 20 miles west of John o' Groats. Train from Inverness.",
    coordinates: { lat: 58.5936, lng: -3.5220 },
  },
  {
    slug: "john-o-groats",
    name: "John o' Groats",
    region: "Caithness",
    heroImage: "https://images.unsplash.com/photo-1720513221463-601783970256?w=1200&q=80&fit=crop",
    description:
      "Famous as the northeastern tip of mainland Britain, John o' Groats is an iconic milestone on the NC500 and is the traditional end (or start) of the Land's End to John o' Groats journey. The landscape here is vast and windswept, with ferries running to Orkney during summer.",
    highlights: [
      "Iconic signpost & Last House",
      "Duncansby Head & Stacks (2 miles east — don't miss)",
      "Ferry to South Ronaldsay, Orkney",
      "Seabird colonies at Duncansby",
    ],
    accommodation:
      "John o' Groats House Hotel, self-catering pods, and a campsite.",
    gettingThere: "At the end of the A99 from Wick.",
    coordinates: { lat: 58.6415, lng: -3.0694 },
  },
  {
    slug: "wick",
    name: "Wick",
    region: "Caithness",
    heroImage: "https://images.unsplash.com/photo-1605558162119-2de4d9ff8130?w=1200&q=80&fit=crop",
    description:
      "Wick was once the herring capital of Europe, and its dramatic harbour and historic old town reflect that proud past. The Wick Heritage Museum is one of the finest community museums in Scotland, and the ruined castle at Girnigoe is spectacular.",
    highlights: [
      "Wick Heritage Museum (superb)",
      "Castle Girnigoe & Sinclair ruins",
      "Wick Harbour & old town",
      "Caithness Glass Visitor Centre",
      "Noss Head Lighthouse",
    ],
    accommodation:
      "Mackays Hotel, B&Bs, and self-catering. Wick is a practical overnight stop.",
    gettingThere: "On the A9, with train links to Inverness.",
    coordinates: { lat: 58.4399, lng: -3.0878 },
  },
  {
    slug: "dornoch",
    name: "Dornoch",
    region: "Sutherland",
    heroImage: "https://images.unsplash.com/photo-1652134210858-bf1984c5ad7c?w=1200&q=80&fit=crop",
    description:
      "Often described as one of Scotland's most beautiful small towns, Dornoch has a 13th-century cathedral, a royal golf course that has hosted The Open Championship, and a beach that stretches for miles. It feels a world away from the wild north coast.",
    highlights: [
      "Dornoch Cathedral (13th century)",
      "Royal Dornoch Golf Course",
      "Dornoch Beach & Dunes",
      "Historylinks Museum",
      "Witch's Stone (last burning in Scotland)",
    ],
    accommodation:
      "Dornoch Castle Hotel, Royal Golf Hotel, B&Bs, and self-catering. A lovely place to unwind at the end of the journey.",
    gettingThere: "On the A9, 45 miles north of Inverness.",
    coordinates: { lat: 57.8788, lng: -4.0275 },
  },
];

export function getTownBySlug(slug: string): Town | undefined {
  return towns.find((t) => t.slug === slug);
}
