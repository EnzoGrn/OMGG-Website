'use client';

import Error from 'next/error';

export default function Unauthorized() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={401} />;
      </body>
    </html>
  );
}