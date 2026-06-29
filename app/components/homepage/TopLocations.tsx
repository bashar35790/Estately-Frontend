"use client";

// Explicitly import the Variants type from framer-motion
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface LocationItem {
    name: string;
    properties: number;
    image: string;
}

export default function TopLocations() {
    // Upgraded high-end luxury architectural and cityscape photography from Unsplash
    const locations: LocationItem[] = [
        {
            name: "Los Angeles",
            properties: 124,
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
        },
        {
            name: "New York",
            properties: 98,
            image: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=2070&auto=format&fit=crop"
        },
        {
            name: "Miami",
            properties: 156,
            image: "https://images.unsplash.com/photo-1506970845246-18f21d533b20?q=80&w=2070&auto=format&fit=crop"
        },
        {
            name: "Dubai",
            properties: 210,
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    // Explicitly typed as Variants to fix TypeScript compilation errors
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    // Explicitly typed as Variants to ensure type-safety for spring parameters
    const cardVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { type: "spring", stiffness: 50, damping: 20 }
        }
    };

    return (
        <section className="bg-white dark:bg-zinc-950 py-24 px-6 sm:px-12 w-full border-t border-zinc-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-zinc-200 dark:border-white/10 pb-10">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <h2 className="text-3xl md:text-5xl font-light tracking-wide text-zinc-900 dark:text-white">
                            Top <span className="text-primary font-normal">Destinations</span>
                        </h2>
                        <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-xl font-light leading-relaxed tracking-wide">
                            Explore our most sought-after locations offering the finest luxury living experiences across the globe.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link 
                            href="/all-properties"
                            className="text-primary hover:text-primary/80 uppercase tracking-[0.2em] text-xs font-semibold flex items-center gap-2 transition-colors group"
                        >
                            Explore All Locations
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {locations.map((location, index) => (
                        <motion.div 
                            key={index}
                            variants={cardVariants}
                            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <Link href={`/all-properties?location=${encodeURIComponent(location.name)}`}>
                                <Image
                                    src={location.image}
                                    alt={location.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                                
                                <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
                                    <div>
                                        <h3 className="text-white text-2xl font-light tracking-wide mb-1">
                                            {location.name}
                                        </h3>
                                        <p className="text-primary text-sm font-medium tracking-widest uppercase">
                                            {location.properties} Properties
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                        <ArrowRight className="text-white w-5 h-5" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
