'use client';

import Error from 'next/error';

export default function Forbidden() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={403} />;
      </body>
    </html>
  )
}