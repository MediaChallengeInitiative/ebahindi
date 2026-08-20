import type { RailItem } from "@/content/site";

/**
 * Own icon set rather than Ovro's SVG assets — Ovro is a commercially licensed
 * template, and its art shouldn't be redistributed in this repo.
 */
const PATHS: Record<RailItem["icon"], React.ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5" />,
  user: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c1.4-3.6 4.2-5.4 7.5-5.4s6.1 1.8 7.5 5.4" />
    </>
  ),
  case: (
    <>
      <rect x="2.8" y="6.8" width="18.4" height="13.4" rx="2.4" />
      <path d="M8.6 6.8V5.2a2 2 0 0 1 2-2h2.8a2 2 0 0 1 2 2v1.6M2.8 12.4h18.4" />
    </>
  ),
  lab: (
    <>
      <path d="M9.5 3v6.2L4.6 17.4A2 2 0 0 0 6.3 20.5h11.4a2 2 0 0 0 1.7-3.1L14.5 9.2V3" />
      <path d="M8.5 3h7M8 14h8" />
    </>
  ),
  mic: (
    <>
      <rect x="9.2" y="2.8" width="5.6" height="10.4" rx="2.8" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3.2" />
    </>
  ),
  grid: (
    <>
      <rect x="3.4" y="3.4" width="7" height="7" rx="1.6" />
      <rect x="13.6" y="3.4" width="7" height="7" rx="1.6" />
      <rect x="3.4" y="13.6" width="7" height="7" rx="1.6" />
      <rect x="13.6" y="13.6" width="7" height="7" rx="1.6" />
    </>
  ),
  spark: <path d="M12 2.6 14.3 9l6.4 2.3-6.4 2.3L12 20l-2.3-6.4L3.3 11.3 9.7 9z" />,
  mail: (
    <>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" />
      <path d="m3.4 6.6 8.6 6 8.6-6" />
    </>
  ),
};

export default function RailIcon({ name }: { name: RailItem["icon"] }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[22px] w-[22px]"
    >
      {PATHS[name]}
    </svg>
  );
}
