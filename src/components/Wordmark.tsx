import { Link } from '@/i18n/navigation';

/*
  Centered brass wordmark (§5.2, §6). Placeholder lockup until the real SVG logo
  is delivered (§14: "Logo as SVG — brass wordmark; ideally a Thai-script lockup
  คราม สกล"). Renders the Latin wordmark with a small brass indigo-drop mark and
  the Thai script beneath, set in the display face.
*/
export function Wordmark({
  tone = 'brass',
  className = '',
}: {
  tone?: 'brass' | 'cream';
  className?: string;
}) {
  const color = tone === 'cream' ? 'text-cream-resist' : 'text-brass';
  return (
    <Link
      href="/"
      aria-label="Kram Sakon — home"
      className={`group inline-flex flex-col items-center leading-none ${className}`}
    >
      <span className="flex items-center gap-2">
        {/* Indigo-drop mark */}
        <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden className={color}>
          <path
            d="M7 0C7 0 0 8.2 0 12.2A7 7 0 0 0 14 12.2C14 8.2 7 0 7 0Z"
            fill="currentColor"
            fillOpacity="0.9"
          />
        </svg>
        <span
          className={`font-display ${color} text-xl sm:text-2xl`}
          style={{ letterSpacing: '0.22em', fontWeight: 400 }}
        >
          KRAM&nbsp;SAKON
        </span>
      </span>
      <span
        lang="th"
        className={`font-display ${color} mt-1 text-[0.7rem] opacity-80`}
        style={{ letterSpacing: '0.3em' }}
      >
        ครามสกล
      </span>
    </Link>
  );
}
