"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Property {
    _id: string;
    title: string;
    description: string;
    location: string;
    propertyType: string;
    price: number;
    rentType: "monthly" | "yearly" | "weekly" | "daily";
    bedrooms: number;
    bathrooms: number;
    size: number;
    amenities: string[];
    extraFeatures: string[];
    isFeatured: boolean;
    status: "pending" | "approved" | "rejected";
    ownerId: string;
    ownerName: string;
    ownerEmail: string;
    images: string[];
}

export function PropertyAmenities({ property }: { property: Property }) {
    const allAmenities = [
        ...property.amenities.map(a => ({ name: a, category: "Core" })),
        ...property.extraFeatures.map(f => ({ name: f, category: "Feature" }))
    ];

    return (
        <section className="space-y-8">
            <div>
                <h2 className="text-3xl font-heading text-foreground">Amenities & Features</h2>
                <p className="text-default-500 font-body">Everything this premium property has to offer</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allAmenities.map((item, index) => (
                    <motion.div
                        key={`${item.name}-${index}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-default-100 shadow-sm hover:border-primary/30 transition-colors group">
                            <div className="bg-primary/10 text-primary p-2 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                                <Check size={16} />
                            </div>
                            <div>
                                <span className="font-semibold text-foreground font-body">{item.name}</span>
                                <p className="text-[10px] uppercase tracking-widest text-default-400 font-medium">
                                    {item.category}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
