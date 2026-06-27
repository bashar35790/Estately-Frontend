"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { Calendar, Users, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { BookingModal } from "./BookingModal";
import { FavoriteButton } from "./FavoriteButton";

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

export function PropertyBookingCard({ property }: { property: Property }) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const propertyId = property?._id;

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <div className="bg-white dark:bg-zinc-900 shadow-2xl rounded-[32px] p-8 space-y-6 border border-default-100 dark:border-white/5">
                    <div>
                        <p className="text-default-500 font-medium mb-1 font-body">Total Rent</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-foreground font-heading">
                                ${property.price.toLocaleString()}
                            </span>
                            <span className="text-default-500 font-body font-medium">/{property.rentType}</span>
                        </div>
                    </div>

                    <hr className="border-default-100 dark:border-white/5" />

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-default-600 font-medium bg-default-50 dark:bg-zinc-800 p-4 rounded-2xl">
                            <div className="bg-primary/20 p-2 rounded-xl text-primary">
                                <Calendar size={18} />
                            </div>
                            <span className="font-body">Immediate move-in</span>
                        </div>
                        <div className="flex items-center gap-4 text-default-600 font-medium bg-default-50 dark:bg-zinc-800 p-4 rounded-2xl">
                            <div className="bg-blue-500/20 p-2 rounded-xl text-blue-500">
                                <Users size={18} />
                            </div>
                            <span className="font-body">Ideal for 3-4 People</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button
                            fullWidth
                            className="font-bold text-white h-16 rounded-2xl text-lg shadow-xl bg-primary hover:opacity-90 transition-opacity"
                            onPress={() => setIsBookingOpen(true)}
                        >
                            Book This Property
                        </Button>

                        <FavoriteButton propertyId={propertyId} />
                    </div>

                    <div className="flex items-center justify-center gap-2 text-default-400 text-xs font-medium font-body uppercase tracking-wider">
                        <ShieldCheck size={14} />
                        <span>100% Secure &amp; Guaranteed</span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-6 border border-white/10"
            >
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-700 flex items-center justify-center shadow-sm">
                        <Users className="text-primary" />
                    </div>
                    <div>
                        <h4 className="font-bold text-foreground font-heading">Need help?</h4>
                        <p className="text-sm text-default-500 font-body">Our concierge is available 24/7</p>
                    </div>
                </div>
            </motion.div>

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                property={property}
            />
        </div>
    );
}
