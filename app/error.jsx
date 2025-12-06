'use client';

import Link from 'next/link';

export default function Error({ error, reset }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>
        <p className="text-xl mb-8">Something went wrong</p>
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
