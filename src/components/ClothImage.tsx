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
}: {
  seed: string;
  alt: string;
  motif?: ClothMotif;
  brassAccent?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const uri = clothDataUri({ seed, motif, brassAccent });
  return (
    <div
      role="img"
      aria-label={alt}
      className={`bg-indigo-night bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url("${uri}")` }}
      data-placeholder="cloth"
      data-priority={priority ? 'true' : undefined}
    />
  );
}
