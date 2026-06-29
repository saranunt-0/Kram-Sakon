/*
  Indigo "cloth" placeholder generator.

  The first draft has no real photography (Build Guide §14 lists it as a human
  deliverable). Instead of grey boxes, we generate deterministic, brand-correct
  SVG swatches: a dip-dye indigo gradient with shibori-style resist motifs.
  Same seed → same image, so layouts are stable across renders.

  Replace these with <Image> + Shopify CDN URLs when real photos arrive.
*/

const NIGHT = '#141e33';
const VAT = '#243b5a';
const DIP = '#3c5c84';
const FIRST = '#a9bbce';
const RESIST = '#f7f4ec';
const BRASS = '#a8894e';

/** Deterministic string → 32-bit hash (xmur3). */
function hash(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h ^= h >>> 16) >>> 0;
}

/** Seeded PRNG (mulberry32). */
function rng(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type ClothMotif = 'shibori' | 'fold' | 'spiral' | 'plain';

export interface ClothOptions {
  seed: string;
  width?: number;
  height?: number;
  motif?: ClothMotif;
  /** Draw a single small brass mark (used sparingly, < 5% of screen). */
  brassAccent?: boolean;
}

/** Returns a standalone SVG string (no external refs) for a given seed. */
export function clothSvg({
  seed,
  width = 800,
  height = 1000,
  motif,
  brassAccent = false,
}: ClothOptions): string {
  const r = rng(hash(seed));
  const id = `g${hash(seed).toString(36)}`;
  const chosen: ClothMotif =
    motif ?? (['shibori', 'fold', 'spiral'] as const)[Math.floor(r() * 3)];

  // Vary the dip-dye stops a little per seed so the catalogue feels woven, not cloned.
  const topStop = 12 + Math.floor(r() * 18); // where night begins to dominate
  const mid = 40 + Math.floor(r() * 20);

  let motifEls = '';

  if (chosen === 'shibori') {
    // Concentric resist rings (spider shibori) blooming from a few centres.
    const blooms = 2 + Math.floor(r() * 2);
    for (let b = 0; b < blooms; b++) {
      const cx = Math.floor(r() * width);
      const cy = Math.floor(r() * height);
      const rings = 4 + Math.floor(r() * 4);
      for (let i = rings; i > 0; i--) {
        const rad = (i / rings) * (90 + r() * 120);
        motifEls += `<circle cx="${cx}" cy="${cy}" r="${rad.toFixed(
          1
        )}" fill="none" stroke="${RESIST}" stroke-opacity="${(
          0.04 +
          (i / rings) * 0.06
        ).toFixed(3)}" stroke-width="${(1 + r() * 1.5).toFixed(1)}"/>`;
      }
    }
  } else if (chosen === 'fold') {
    // Itajime: horizontal resist bands from the fold-and-clamp technique.
    const bands = 5 + Math.floor(r() * 5);
    for (let i = 0; i < bands; i++) {
      const y = (i / bands) * height + r() * 30;
      const h = 6 + r() * 26;
      motifEls += `<rect x="0" y="${y.toFixed(1)}" width="${width}" height="${h.toFixed(
        1
      )}" fill="${RESIST}" fill-opacity="${(0.03 + r() * 0.05).toFixed(3)}"/>`;
    }
  } else {
    // Spiral resist sweeping across the cloth.
    const cx = width * (0.3 + r() * 0.4);
    const cy = height * (0.3 + r() * 0.4);
    const turns = 3 + Math.floor(r() * 3);
    let d = `M ${cx} ${cy}`;
    const steps = turns * 36;
    for (let s = 0; s < steps; s++) {
      const a = (s / 36) * Math.PI * 2;
      const rad = s * (1.4 + r() * 0.4);
      d += ` L ${(cx + Math.cos(a) * rad).toFixed(1)} ${(
        cy +
        Math.sin(a) * rad
      ).toFixed(1)}`;
    }
    motifEls += `<path d="${d}" fill="none" stroke="${RESIST}" stroke-opacity="0.08" stroke-width="1.4"/>`;
  }

  // Subtle vertical "warp" weave lines for texture.
  let warp = '';
  const cols = 18;
  for (let c = 1; c < cols; c++) {
    const x = (c / cols) * width;
    warp += `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="${NIGHT}" stroke-opacity="0.05" stroke-width="1"/>`;
  }

  const brass = brassAccent
    ? `<circle cx="${width - 46}" cy="${height - 46}" r="6" fill="${BRASS}" fill-opacity="0.85"/>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" role="presentation">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${FIRST}"/>
      <stop offset="${topStop}%" stop-color="${DIP}"/>
      <stop offset="${mid}%" stop-color="${VAT}"/>
      <stop offset="100%" stop-color="${NIGHT}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${id})"/>
  ${warp}
  ${motifEls}
  ${brass}
</svg>`;
}

/** Encode an SVG string as a data URI usable in `src`/`background-image`. */
export function clothDataUri(opts: ClothOptions): string {
  const svg = clothSvg(opts);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
