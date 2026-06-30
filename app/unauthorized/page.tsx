"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-6">
      
      {/* Decorative Brand Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] h-125 w-125 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-125 w-125 rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />

      {/* Grid Pattern Mesh Overlay for Premium Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-xl w-full rounded-[32px] backdrop-blur-xl bg-white/2 border border-white/5 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] p-10 md:p-14 text-center">
        
        {/* Animated Brand Warning Icon */}
        <div className="mx-auto w-fit p-4 rounded-2xl bg-primary/5 border border-primary/20 mb-8 relative group">
          <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <ShieldAlert className="h-10 w-10 text-primary relative z-10 animate-pulse" />
        </div>

        {/* Big 401 Header */}
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-heading">
          401
        </h1>

        <h2 className="mt-4 text-xl md:text-2xl text-secondary font-bold font-heading tracking-wide">
          Access Denied
        </h2>

        <p className="mt-4 text-slate-400 leading-relaxed max-w-sm mx-auto font-body text-sm md:text-base">
          Your current account roles do not hold authorization parameters for this management console. Please switch to an authorized user profile.
        </p>

        {/* HeroUI Custom Buttons with pure Tailwind */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/auth/login"
            className="flex justify-center items-center w-full sm:w-auto h-12 px-6 rounded-xl font-semibold font-body bg-primary text-slate-950 hover:bg-primary/90 transition-all duration-300 shadow-[0_4px_20px_rgba(30,172,112,0.3)]"
          >
            <LogIn size={16} className="mr-2 inline-block" />
            Sign In
          </Link>

          <Link
            href="/"
            className="flex justify-center items-center w-full sm:w-auto h-12 px-6 rounded-xl font-semibold font-body border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft size={16} className="mr-2 inline-block" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
