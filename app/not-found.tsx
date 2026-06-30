"use client";

import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

// The function name should ideally be NotFound, and it MUST be default exported
export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-6">
      <div className="relative max-w-xl w-full rounded-[32px] backdrop-blur-xl bg-white/20 border border-white/5 p-10 md:p-14 text-center">
        <div className="mx-auto w-fit p-4 rounded-2xl bg-secondary/5 border border-secondary/20 mb-8">
          <AlertTriangle className="h-10 w-10 text-secondary animate-bounce" />
        </div>

        <h1 className="text-7xl md:text-9xl font-black tracking-tighter bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-heading">
          404
        </h1>

        <h2 className="mt-4 text-xl md:text-2xl text-primary font-bold font-heading tracking-wide">
          Listing Not Found
        </h2>

        <p className="mt-4 text-slate-400 leading-relaxed max-w-sm mx-auto font-body text-sm md:text-base">
          The property portal or asset configuration directory you are trying to access has been relocated, unlisted, or expired.
        </p>

        <div className="mt-10 flex justify-center items-center">
          <Link
            href="/"
            className="w-full flex justify-center items-center sm:w-auto h-12 px-8 rounded-xl font-semibold font-body bg-primary text-slate-950 hover:bg-primary/90 transition-all duration-300 shadow-[0_4px_20px_rgba(30,172,112,0.3)]"
          >
            <Home size={16} className="mr-2 inline-block" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
