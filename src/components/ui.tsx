import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

type ButtonVariant = 'primary' | 'secondary' | 'text';

const base =
  'inline-flex items-center justify-center gap-2 text-sm tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-[2px]';

const variants: Record<ButtonVariant, string> = {
  // primary = Vat Indigo bg / Resist White text (§6)
  primary:
    'bg-indigo-vat text-cream-resist px-7 py-3 hover:bg-indigo-night',
  // secondary = transparent / indigo border
  secondary:
    'border border-indigo-vat text-indigo-vat px-7 py-3 hover:bg-indigo-vat hover:text-cream-resist',
  // text = underlined link with brass underline on hover
  text: 'text-indigo-night underline decoration-transparent underline-offset-4 hover:decoration-brass px-0 py-1',
};

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: { variant?: ButtonVariant; className?: string; children: ReactNode } & ComponentProps<'button'>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  href,
  className = '',
  children,
}: {
  variant?: ButtonVariant;
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow bg-cream-resist/90 text-indigo-vat px-2.5 py-1 backdrop-blur-sm">
      {children}
    </span>
  );
}
