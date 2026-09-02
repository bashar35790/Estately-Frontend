"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const Counter = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsInView(true);
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000;
            const increment = value / (duration / 16); // 60fps
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center space-y-2 p-6">
            <div className="text-4xl md:text-6xl font-light text-primary tracking-tight">
                {count}{suffix}
            </div>
            <div className="text-sm md:text-base text-zinc-500 uppercase tracking-[0.2em] font-medium">
                {label}
            </div>
        </div>
    );
};

export default function RentalStatistics() {
    return (
        <section className="bg-zinc-50 py-16 md:py-24 w-full border-t border-zinc-200 relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-zinc-200"
                >
                    <Counter value={2500} label="Premium Estates" suffix="+" />
                    <Counter value={50} label="Global Cities" suffix="+" />
                    <Counter value={15} label="Years Experience" suffix="+" />
                    <Counter value={99} label="Client Satisfaction" suffix="%" />
                </motion.div>
            </div>
        </section>
    );
}
