"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-gray-900 text-white">
            {/* Background Video Layer */}
            <div
                className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{
                    // This serves as your poster image while the iframe loads
                    backgroundImage: `url('https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                }}

            >
                <iframe
                    src="https://player.vimeo.com/video/1203055512?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&playsinline=1"
                    className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title="Hero Background Video"
                />

                {/* Subtle dark overlay to keep the white text readable over video scenes */}
                <div className="absolute inset-0 bg-black/50 z-10" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex min-h-screen flex-col justify-between container mx-auto px-4">

                {/* Main Hero Body */}
                <div className="my-auto max-w-4xl pt-20 md:pt-0">
                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                        Find Your Perfect Home, <span className=" italic text-primary text-shadow-2xl">Anywhere .</span>
                    </h1>
                    <p className="text-lg text-slate-50 md:text-xl max-w-2xl mt-6">
                        Discover premium villas, sky-high penthouses, and storied estates from the world&apos;s most thoughtful hosts.
                    </p>

                    {/* Main Action Button */}
                    <div className="mt-8 md:mt-12">
                        <Link href="/properties">
                        <Button
                            size="lg"
                            className="bg-white text-black font-medium rounded-full shadow-lg hover:bg-gray-100 px-6 py-6 text-sm md:text-base inline-flex items-center gap-2"
                        >
                            Available Properties <ArrowRight className="h-4 w-4 text-black" />
                        </Button>
                        </Link>
                    </div>
                </div>

                {/* Empty bottom spacing element to perfectly balance the flex layout */}
                <div className="hidden md:block h-8" />
            </div>
        </section>
    );
}
