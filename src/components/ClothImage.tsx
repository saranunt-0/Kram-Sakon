import { clothDataUri, type ClothMotif } from '@/lib/cloth';

/*
  Renders a deterministic indigo "cloth" placeholder as a background image.
  Drop-in stand-in for next/image until real photography exists (§14).
  `alt` is honoured for a11y (bilingual alt text, §9).
*/
export function ClothImage({
  seed,
  alt,
  motif,
  brassAccent,
  className = '',
  priority = false,
  src,
  position,
}: {
  seed: string;
  alt: string;
  motif?: ClothMotif;
  brassAccent?: boolean;
  className?: string;
  priority?: boolean;
  /** Real photograph path (e.g. "/images/bear_07.jpg"). When set, the deterministic
      cloth placeholder is bypassed and this image is shown instead. */
  src?: string;
  /** CSS background-position override (default "center"), e.g. "top". */
  position?: string;
}) {
  const uri = src ?? clothDataUri({ seed, motif, brassAccent });
  return (
    <div
      role="img"
      aria-label={alt}
      className={`bg-indigo-night bg-cover ${className}`}
      style={{ backgroundImage: `url("${uri}")`, backgroundPosition: position ?? 'center' }}
      data-placeholder="cloth"
      data-priority={priority ? 'true' : undefined}
    />
  );
}
