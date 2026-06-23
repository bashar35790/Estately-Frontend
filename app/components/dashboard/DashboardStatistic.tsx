"use client";

import React from "react";
import { motion } from "framer-motion";

export interface StatItem {
    title: string;
    value: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface DashboardStatisticProps {
    statsData: StatItem[];
}

export default function DashboardStatistic({ statsData }: DashboardStatisticProps) {
    return (
        <section className="relative overflow-hidden rounded-[32px] bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-white/60">
            {/* Minimal Luxury Glow Effect */}
            <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]" />
            <div className="absolute -left-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-secondary/5 blur-[100px]" />

            {/* Top Insight Title */}
            <div className="relative z-10 mb-12 max-w-2xl">
                <h3 className="font-heading text-2xl font-medium leading-relaxed text-text/90 md:text-3xl">
                    Portfolio Performance & <br />
                    <span className="text-primary font-semibold">Real Estate Intelligence.</span>
                </h3>

                {/* Status Badges with Subtle Motion */}
                <div className="mt-4 flex gap-3 text-xs font-semibold tracking-wider uppercase">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-full bg-primary/10 px-4 py-1.5 text-primary"
                    >
                        • Live Estate Portfolio
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-full bg-secondary/10 px-4 py-1.5 text-secondary"
                    >
                        • Premium Plan Active
                    </motion.span>
                </div>
            </div>

            {/* Premium Stats Cards Grid */}
            <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {statsData.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={`${stat.title}-${index}`}
                            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-[#fbfbfb] p-6 transition-all duration-300 hover:bg-white hover:shadow-[0_30px_60px_rgba(30,172,112,0.08)] hover:border-primary/20"
                        >
                            {/* Card Hover Border Glow Line */}
                            <div className="absolute top-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />

                            <div className="flex items-center justify-between">
                                {/* Label / Title */}
                                <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                    {stat.title}
                                </p>

                                {/* Premium Glassmorphic Icon Wrapper */}
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                                    <IconComponent className="h-5 w-5" />
                                </div>
                            </div>

                            {/* Main Stat Value */}
                            <h4 className="mt-6 font-heading text-4xl font-bold tracking-tight text-text group-hover:text-primary transition-colors duration-300">
                                {stat.value}
                            </h4>

                            {/* Subtle Background Shape inside Card */}
                            <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-gray-50 transition-all duration-300 group-hover:bg-primary/5" />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
