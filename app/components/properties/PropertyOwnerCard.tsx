"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

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

export function PropertyOwnerCard({ property }: { property: Property }) {
    const avatarSrc = property.images[0] || `https://api.dicebear.com/7.x/initials/svg?seed=${property.ownerName}`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-8 border border-primary/10">
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary rounded-full blur-[10px] opacity-20" />
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl">
                            <Image
                                src={avatarSrc}
                                alt={property.ownerName}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-heading text-foreground">{property.ownerName}</h3>
                        <p className="text-default-500 font-body">Property Owner</p>
                    </div>

                    <div className="w-full space-y-3">
                        <Button
                            fullWidth
                            variant="secondary"
                            onPress={() => window.location.href = `mailto:${property.ownerEmail}`}
                            className="font-medium bg-white dark:bg-zinc-800 text-default-700"
                        >
                            <Mail size={18} className="mr-2" />
                            {property.ownerEmail}
                        </Button>
                        <Link
                            href={`mailto:${property.ownerEmail}`}
                            className="font-bold text-white shadow-lg bg-primary hover:opacity-90 h-12 rounded-xl w-full flex items-center justify-center"
                        >
                            <MessageSquare size={18} className="mr-2" />
                            Send Message
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
