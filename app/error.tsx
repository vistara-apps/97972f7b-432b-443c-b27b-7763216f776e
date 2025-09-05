'use client';

import { Shield, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-300 mb-6">
          CitizenShield encountered an error. Don't worry, your data is safe.
        </p>
        <button
          onClick={reset}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
