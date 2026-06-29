import { Link } from '@/i18n/navigation';

/*
  Brand wordmark (§5.2, §6).

  On light surfaces (the header) we now render the real brushscript logo
  (`/images/logo_02.png`, navy on transparent) as the primary mark, with the
  small Thai-script lockup kept beneath — the original text logo is preserved,
  not removed.

  On dark surfaces (the footer) the navy artwork would disappear, so we keep the
  original cream text lockup there (indigo-drop mark + KRAM SAKON + Thai script).
*/
export function Wordmark({
  tone = 'brass',
  className = '',
}: {
  tone?: 'brass' | 'cream';
  className?: string;
}) {
  // Footer / dark surfaces: keep the original cream text lockup.
  if (tone === 'cream') {
    return (
      <Link
        href="/"
        aria-label="Kram Sakon — home"
        className={`group inline-flex flex-col items-center leading-none ${className}`}
      >
        <span className="flex items-center gap-2">
          <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden className="text-cream-resist">
            <path
              d="M7 0C7 0 0 8.2 0 12.2A7 7 0 0 0 14 12.2C14 8.2 7 0 7 0Z"
              fill="currentColor"
              fillOpacity="0.9"
            />
          </svg>
          <span
            className="font-display text-cream-resist text-xl sm:text-2xl"
            style={{ letterSpacing: '0.22em', fontWeight: 400 }}
          >
            KRAM&nbsp;SAKON
          </span>
        </span>
        <span
          lang="th"
          className="font-display text-cream-resist mt-1 text-[0.7rem] opacity-80"
          style={{ letterSpacing: '0.3em' }}
        >
          ครามสกล
        </span>
      </Link>
    );
  }

  // Header / light surfaces: the real brushscript logo, with the Thai text logo kept beneath.
  return (
    <Link
      href="/"
      aria-label="Kram Sakon — home"
      className={`group inline-flex flex-col items-center leading-none ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo_1.png"
        alt="Kram Sakon"
        className="h-12 w-auto sm:h-16"
        width={260}
        height={109}
      />
      <span
        lang="th"
        className="font-display text-indigo-night mt-1 text-[0.7rem] opacity-70"
        style={{ letterSpacing: '0.3em' }}
      >
        ครามสกล
      </span>
    </Link>
  );
}
