type IconName = "puzzle" | "target" | "medal" | "shieldHeart" | "users" | "globe" | "cap" | "home" | "shield" | "heart" | "chat" | "list" | "file" | "calendar" | "book";

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function Icon({ name, size = 20, color = "#fff" }: { name: IconName; size?: number; color?: string }) {
  switch (name) {
    case "puzzle":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <path d="M4 4h6v2.5a1.5 1.5 0 003 0V4h6v6h-2.5a1.5 1.5 0 000 3H19v6h-6v-2.5a1.5 1.5 0 00-3 0V19H4v-6h2.5a1.5 1.5 0 000-3H4V4z" />
        </svg>
      );
    case "target":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1" fill={color} />
        </svg>
      );
    case "medal":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <circle cx="12" cy="8" r="6" />
          <path d="M8.5 13.5L7 22l5-2.6 5 2.6-1.5-8.5" />
        </svg>
      );
    case "shieldHeart":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M14.8 9.6a1.8 1.8 0 00-2.5 0l-.3.3-.3-.3a1.8 1.8 0 00-2.5 2.5l2.8 2.8 2.8-2.8a1.8 1.8 0 000-2.5z" fill={color} stroke="none" />
        </svg>
      );
    case "users":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
          <circle cx="10" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "globe":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      );
    case "cap":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <path d="M12 3L2 8l10 5 10-5-10-5z" />
          <path d="M6 10v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
        </svg>
      );
    case "home":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <path d="M3 12l9-9 9 9" />
          <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
        </svg>
      );
    case "shield":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "heart":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 000-7.8z" />
        </svg>
      );
    case "list":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <path d="M9 6h11M9 12h11M9 18h11" />
          <path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" />
        </svg>
      );
    case "file":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6M9 17h6" />
        </svg>
      );
    case "calendar":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
          <path d="M8 14h2M14 14h2M8 17h2M14 17h2" />
        </svg>
      );
    case "book":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <path d="M4 4.5A2.5 2.5 0 016.5 2H20v16H6.5A2.5 2.5 0 004 20.5v-16z" />
          <path d="M4 20.5A2.5 2.5 0 016.5 18H20" />
          <path d="M9 7h7M9 10.5h7" />
        </svg>
      );
    case "chat":
      return (
        <svg width={size} height={size} {...common} stroke={color}>
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
        </svg>
      );
    default:
      return null;
  }
}
