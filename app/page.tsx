'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Star background layers */}
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="mb-8 text-6xl font-bold tracking-wider text-yellow-400 animate-pulse">
          STAR WARS
        </h1>
        <button
          className="rounded-md border border-yellow-400 px-6 py-3 text-xl text-yellow-400 transition-colors 
                     hover:bg-yellow-400/10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onClick={() => router.push('/dashboard')}
        >
          Explore Starships
        </button>
      </div>
    </div>
  );
}
