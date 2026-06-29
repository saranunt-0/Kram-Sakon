import { Link } from '@/i18n/navigation';

export interface Crumb {
  label: string;
  href?: string;
}

/* Breadcrumbs (§6) + JSON-LD BreadcrumbList (§9). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-tamarind">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.href ? (
              <Link href={c.href} className="hover:text-indigo-night hover:underline underline-offset-2">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-indigo-night">
                {c.label}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden className="opacity-50">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* Reusable section heading with eyebrow + selvedge underline. */
export function SectionHeading({
  eyebrow,
  title,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 font-display text-3xl font-light sm:text-4xl">{title}</h2>
    </div>
  );
}
