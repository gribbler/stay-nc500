export interface OvernightStop {
  label: string;       // e.g. "Night 1", "Nights 3–4"
  town: string;        // for Booking.com search
  displayName: string; // shown in UI
  nights: number;      // how many nights here
}

export interface BookableItinerary {
  id: string;
  title: string;
  duration: string;
  totalNights: number;
  stops: OvernightStop[];
}

export const bookableItineraries: BookableItinerary[] = [
  {
    id: "classic-7",
    title: "The Classic NC500 — 7 Days",
    duration: "7 days",
    totalNights: 6,
    stops: [
      { label: "Night 1", town: "Dornoch, Scotland", displayName: "Dornoch", nights: 1 },
      { label: "Night 2", town: "Thurso, Scotland", displayName: "Thurso", nights: 1 },
      { label: "Night 3", town: "Durness, Scotland", displayName: "Durness", nights: 1 },
      { label: "Night 4", town: "Ullapool, Scotland", displayName: "Ullapool", nights: 1 },
      { label: "Night 5", town: "Torridon, Scotland", displayName: "Torridon", nights: 1 },
      { label: "Night 6", town: "Inverness, Scotland", displayName: "Inverness (last night)", nights: 1 },
    ],
  },
  {
    id: "fast-5",
    title: "The Fast Five — 5 Days",
    duration: "5 days",
    totalNights: 4,
    stops: [
      { label: "Night 1", town: "Thurso, Scotland", displayName: "Thurso", nights: 1 },
      { label: "Night 2", town: "Ullapool, Scotland", displayName: "Ullapool", nights: 1 },
      { label: "Night 3", town: "Torridon, Scotland", displayName: "Torridon", nights: 1 },
      { label: "Night 4", town: "Inverness, Scotland", displayName: "Inverness", nights: 1 },
    ],
  },
  {
    id: "deep-10",
    title: "The Deep Exploration — 10 Days",
    duration: "10 days",
    totalNights: 9,
    stops: [
      { label: "Nights 1–2", town: "Inverness, Scotland", displayName: "Inverness & Black Isle", nights: 2 },
      { label: "Nights 3–4", town: "Dornoch, Scotland", displayName: "Dornoch & Caithness", nights: 2 },
      { label: "Nights 5–6", town: "Durness, Scotland", displayName: "Durness (north coast)", nights: 2 },
      { label: "Nights 7–8", town: "Ullapool, Scotland", displayName: "Assynt & Ullapool", nights: 2 },
      { label: "Nights 9–10", town: "Torridon, Scotland", displayName: "Wester Ross & Applecross", nights: 2 },
    ],
  },
  {
    id: "west-coast-4",
    title: "West Coast Focus — 4 Days",
    duration: "4 days",
    totalNights: 3,
    stops: [
      { label: "Night 1", town: "Ullapool, Scotland", displayName: "Ullapool", nights: 1 },
      { label: "Night 2", town: "Lochinver, Scotland", displayName: "Lochinver (Assynt)", nights: 1 },
      { label: "Night 3", town: "Torridon, Scotland", displayName: "Torridon", nights: 1 },
    ],
  },
  {
    id: "family-7",
    title: "Family Adventure — 7 Days",
    duration: "7 days",
    totalNights: 6,
    stops: [
      { label: "Night 1", town: "Inverness, Scotland", displayName: "Inverness", nights: 1 },
      { label: "Night 2", town: "Dornoch, Scotland", displayName: "Dornoch", nights: 1 },
      { label: "Night 3", town: "Wick, Scotland", displayName: "Wick", nights: 1 },
      { label: "Night 4", town: "Tongue, Scotland", displayName: "Tongue", nights: 1 },
      { label: "Night 5", town: "Durness, Scotland", displayName: "Durness", nights: 1 },
      { label: "Night 6", town: "Ullapool, Scotland", displayName: "Ullapool", nights: 1 },
    ],
  },
];
