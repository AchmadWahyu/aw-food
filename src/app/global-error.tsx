'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </body>
    </html>
  );
}
