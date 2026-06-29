'use client';

import { useState, type ReactNode } from 'react';

export interface Field {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'textarea';
  required?: boolean;
}

/*
  Generic, accessible demo form. No backend — it just shows the success state.
  Wire to a server action / Shopify / email service for production.
*/
export function DemoForm({
  fields,
  submitLabel,
  successMessage,
  children,
}: {
  fields: Field[];
  submitLabel: string;
  successMessage: string;
  children?: ReactNode;
}) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p
        role="status"
        className="border-l-2 border-brass bg-cream-cotton/60 p-5 text-indigo-night"
      >
        {successMessage}
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      {fields.map((f) => (
        <div key={f.name} className="flex flex-col gap-1.5">
          <label htmlFor={f.name} className="eyebrow !text-indigo-night/70">
            {f.label}
            {f.required && <span className="text-brass"> *</span>}
          </label>
          {f.type === 'textarea' ? (
            <textarea
              id={f.name}
              name={f.name}
              required={f.required}
              rows={5}
              className="rounded-[2px] border border-line bg-cream-resist/40 px-4 py-3 text-sm outline-none focus:border-indigo-vat"
            />
          ) : (
            <input
              id={f.name}
              name={f.name}
              type={f.type ?? 'text'}
              required={f.required}
              className="rounded-[2px] border border-line bg-cream-resist/40 px-4 py-3 text-sm outline-none focus:border-indigo-vat"
            />
          )}
        </div>
      ))}
      {children}
      <button
        type="submit"
        className="mt-2 self-start rounded-[2px] bg-indigo-vat px-7 py-3 text-sm tracking-wide text-cream-resist transition-colors hover:bg-indigo-night"
      >
        {submitLabel}
      </button>
    </form>
  );
}
