/*
  Self-hosted Google Fonts via next/font (§3, §11 — no render-blocking web fonts).
  CSS variables here are mapped to families in globals.css @theme.
  Display = Fraunces / Noto Serif Thai · Body = Inter / IBM Plex Sans Thai.
*/
import { Fraunces, Inter, Noto_Serif_Thai, IBM_Plex_Sans_Thai } from 'next/font/google';

export const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-fraunces',
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const notoSerifThai = Noto_Serif_Thai({
  subsets: ['thai'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-noto-serif-thai',
});

export const plexThai = IBM_Plex_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-thai',
});

export const fontVariables = `${fraunces.variable} ${inter.variable} ${notoSerifThai.variable} ${plexThai.variable}`;
