"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCcw, AlertCircle, Home } from "lucide-react";
import { Button } from "@heroui/react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Optional: Log the error to your analytics or tracking systems here
    console.error("Property Detail Error Block:", error);
  }, [error]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-6">
      
      {/* Decorative Brand Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />

      {/* Grid Pattern Mesh Overlay for Premium Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-xl w-full rounded-[32px] backdrop-blur-xl bg-white/[0.02] border border-white/5 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] p-10 md:p-14 text-center">
        
        {/* Animated Accent Alert Icon */}
        <div className="mx-auto w-fit p-4 rounded-2xl bg-primary/5 border border-primary/20 mb-8 relative group">
          <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <AlertCircle className="h-10 w-10 text-primary relative z-10 animate-pulse" />
        </div>

        {/* Brand Elegant Heading */}
        <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-heading">
          System Interrupted
        </h1>

        <h2 className="mt-4 text-xl md:text-2xl text-secondary font-bold font-heading tracking-wide">
          Unable to Load Property Details
        </h2>

        <p className="mt-4 text-slate-400 leading-relaxed max-w-sm mx-auto font-body text-sm md:text-base">
          An error occurred while fetching this listing&lsquo;s configurations. The asset might be unlisted or temporarily unavailable.
        </p>

        {/* Debug Block - Only renders during development environment checks */}
        {process.env.NODE_ENV === "development" && error?.message && (
          <div className="mt-6 text-left rounded-2xl bg-black/40 border border-white/5 p-5 overflow-auto max-h-40 font-mono text-xs text-red-400 custom-scrollbar">
            <span className="text-slate-500 block mb-1 font-bold tracking-wider uppercase text-[10px]">Dev Error Message:</span>
            {error.message}
          </div>
        )}

        {/* Premium Action Buttons - Fully Compliant with Gravity UI Property Schemas */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold font-body bg-primary text-slate-950 hover:bg-primary/90 shadow-[0_4px_20px_rgba(30,172,112,0.3)] transition-all duration-300 hover:scale-[1.02]"
          >
            <RefreshCcw size={16} strokeWidth={2.5} className="mr-2 inline-block" />
            Try Again
          </Button>

          <Link
            href="/"
            className="bg-accent w-full sm:w-auto px-6 py-3 rounded-xl font-semibold font-body border-white/10 text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
          >
            <Home size={16} className="mr-2 inline-block" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}