import { Shield } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">CitizenShield</h2>
        <p className="text-gray-300">Loading your protection...</p>
      </div>
    </div>
  );
}
