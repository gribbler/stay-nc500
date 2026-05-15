interface ThistleIconProps {
  className?: string;
  size?: number;
}

/**
 * Scottish thistle mark — florets, spiky head, stem, and two leaves.
 * Uses currentColor so it inherits from the parent text colour.
 */
export default function ThistleIcon({ className = "", size = 28 }: ThistleIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 130"
      width={size}
      height={Math.round(size * 1.3)}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* ── Florets: 7 fine filaments from crown of head ── */}
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="50" y1="34" x2="30" y2="6" />
        <line x1="50" y1="34" x2="37" y2="3" />
        <line x1="50" y1="34" x2="44" y2="1" />
        <line x1="50" y1="34" x2="50" y2="0" />
        <line x1="50" y1="34" x2="56" y2="1" />
        <line x1="50" y1="34" x2="63" y2="3" />
        <line x1="50" y1="34" x2="70" y2="6" />
      </g>
      {/* Floret tips */}
      <g fill="currentColor">
        <circle cx="30" cy="6"  r="2.5" />
        <circle cx="37" cy="3"  r="2.5" />
        <circle cx="44" cy="1"  r="2.5" />
        <circle cx="50" cy="0"  r="2.5" />
        <circle cx="56" cy="1"  r="2.5" />
        <circle cx="63" cy="3"  r="2.5" />
        <circle cx="70" cy="6"  r="2.5" />
      </g>

      {/* ── Thistle head: 8-spoked polygon (spiky bract ball) ── */}
      {/*
        Center (50, 54). Outer spikes at r=20, inner valleys at r=13.
        8 outer tips: 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315° from top.
        8 inner valleys: offset 22.5° between each.
      */}
      <polygon
        points="
          50,34   54,42
          64,40   62,49
          70,54   62,59
          64,68   54,66
          50,74   46,66
          36,68   38,59
          30,54   38,49
          36,40   46,42
        "
        fill="currentColor"
      />

      {/* ── Stem ── */}
      <line
        x1="50" y1="74"
        x2="50" y2="118"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* ── Left leaf (at ~y 88) ── */}
      <path
        d="M50 89 C42 85 28 81 26 71 C33 77 43 86 50 87 Z"
        fill="currentColor"
      />
      {/* ── Right leaf (at ~y 101) ── */}
      <path
        d="M50 102 C58 98 72 94 74 84 C67 90 57 99 50 100 Z"
        fill="currentColor"
      />
    </svg>
  );
}
