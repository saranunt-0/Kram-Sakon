import Link from 'next/link';

/*
  Global fallback for paths that never matched a locale. The proxy normally
  redirects to /en or /th, so this is rarely hit; it must render its own <html>
  because no locale layout wraps it.
*/
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          background: '#f1ece2',
          color: '#141e33',
          fontFamily: 'Georgia, serif',
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div>
          <h1 style={{ fontWeight: 300, fontSize: '2rem' }}>Page not found</h1>
          <p style={{ marginTop: '1rem' }}>
            <Link href="/en" style={{ color: '#243b5a' }}>
              Return to Kram Sakon
            </Link>
          </p>
        </div>
      </body>
    </html>
  );
}
