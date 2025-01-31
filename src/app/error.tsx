'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string },
  reset: () => void
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="text-center space-y-6 max-w-md px-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Oops! Something went wrong
        </h1>

        <p className="text-gray-600 text-lg">
          <span> {error.digest} </span>
          {error.message || "We encountered an unexpected error."}
        </p>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => reset()}
            variant="outline"
            className="px-6 py-2"
          >
            Try Again
          </Button>

          <Link href="/">
            <Button className="px-6 py-2">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}