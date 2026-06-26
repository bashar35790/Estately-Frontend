"use client";

import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";

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

export function PropertyHeader({ property }: { property: Property }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
        >
            <div className="flex flex-wrap items-center gap-3">
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold capitalize">
                    {property.propertyType}
                </div>
                {property.isFeatured && (
                    <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg shadow-amber-500/20">
                        <Star size={12} className="fill-current" />
                        FEATURED
                    </div>
                )}
                <div className="flex items-center gap-2 bg-default-100 text-default-600 px-3 py-1 rounded-full text-xs font-medium">
                    <div className={`w-2 h-2 rounded-full ${property.status === "approved" ? "bg-success" : "bg-warning"}`} />
                    {property.status}
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading text-foreground tracking-tight leading-tight">
                {property.title}
            </h1>

            <div className="flex items-center gap-2 text-default-500">
                <MapPin size={18} className="text-primary" />
                <span className="text-base font-body">{property.location}</span>
            </div>
        </motion.div>
    );
}
