/*
  Root redirect for the static export.

  With no Proxy/middleware (STATIC-DEPLOYMENT-PLAN.md §4.3), nothing redirects
  `/` to a locale at request time. This page does it on the client instead:
  a `<meta refresh>` covers the no-JS case (always → /en/), and a tiny inline
  script restores best-effort detection — Thai-preference browsers go to /th/.

  Like the global not-found, it renders its own <html> because no locale layout
  wraps this route. It must avoid server-only dynamic APIs so it exports cleanly.
*/
const detectScript = `
  try {
    var lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    var target = lang.indexOf('th') === 0 ? '/th/' : '/en/';
    location.replace(target);
  } catch (e) {
    location.replace('/en/');
  }
`;

export default function RootRedirect() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en/" />
        <link rel="canonical" href="/en/" />
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script dangerouslySetInnerHTML={{ __html: detectScript }} />
      </head>
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
        <p>
          Redirecting to{' '}
          <a href="/en/" style={{ color: '#243b5a' }}>
            Kram Sakon
          </a>
          …
        </p>
      </body>
    </html>
  );
}
