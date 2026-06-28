"use client";

import { useState } from "react";
import { Link } from "@heroui/react";
import { MapPin, ArrowRight } from "@gravity-ui/icons";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

interface Property {
    _id: string | { $oid: string };
    title: string;
    description: string;
    location: string;
    propertyType: string;
    price: number;
    rentType: string;
    bedrooms: number;
    bathrooms: number;
    size: number;
    amenities?: string[];
    extraFeatures?: string[];
    isFeatured: boolean;
    status: string;
    ownerId: string;
    ownerName: string;
    ownerEmail: string;
    images?: string[];
}

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const { data: session } = authClient.useSession();

    // Premium fallback estate image
    const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop";

    // Check if primary image exists, otherwise default straight to fallback
    const initialImage = property.images && property.images.length > 0
        ? property.images[0]
        : FALLBACK_IMAGE;

    // State to track if the current image breaks at runtime
    const [imgSrc, setImgSrc] = useState(initialImage);

    if (!property) return null;

    const formatPrice = (amount: number) => {
        if (!amount) return "0";
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const propertyId = typeof property._id === "object" && "$oid" in property._id
        ? property._id.$oid
        : property._id as string;

    const detailsHref = session?.user ? `/all-properties/${propertyId}` : "/auth/sign-in";

    return (
        <div className="group relative w-full max-w-[420px] bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 ease-out flex flex-col shadow-2xl">
            {/* Image Section */}
            <div className="w-full h-72 relative overflow-hidden bg-zinc-900 block" style={{ minHeight: '288px' }}>
                {imgSrc && (
                    <Image
                        src={imgSrc || FALLBACK_IMAGE}
                        alt={property.title || "Luxury Property"}
                        fill
                        sizes="(max-width: 420px) 100vw, 420px"
                        priority={property.isFeatured}
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        onError={() => {
                            if (imgSrc !== FALLBACK_IMAGE) {
                                setImgSrc(FALLBACK_IMAGE);
                            }
                        }}
                    />
                )}

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40 z-10 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20 pointer-events-none">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-sm border border-primary/30">
                        {property.propertyType}
                    </span>
                    {property.isFeatured && (
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white font-semibold bg-primary/90 px-3 py-1.5 rounded-sm shadow-lg">
                            Featured
                        </span>
                    )}
                </div>

                {/* Price Display */}
                <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                    <div className="text-primary text-2xl font-light tracking-wide">
                        {formatPrice(property.price)}
                        <span className="text-zinc-400 text-sm font-normal ml-1">/ {property.rentType || "mo"}</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow z-20 bg-zinc-950">
                <h2 className="text-xl font-light tracking-wide text-white leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-1 mb-2">
                    {property.title}
                </h2>

                {property.location && (
                    <div className="flex items-center gap-2 text-zinc-400 mb-4">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm font-light tracking-wider line-clamp-1">
                            {property.location}
                        </span>
                    </div>
                )}

                <div className="w-8 h-[1px] bg-primary/30 mb-4" />

                {/* Features Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col">
                        <span className="text-zinc-500 text-[10px] uppercase tracking-[0.15em] mb-1">Beds</span>
                        <span className="text-zinc-200 font-light text-lg">{property.bedrooms || 0}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-zinc-500 text-[10px] uppercase tracking-[0.15em] mb-1">Baths</span>
                        <span className="text-zinc-200 font-light text-lg">{property.bathrooms || 0}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-zinc-500 text-[10px] uppercase tracking-[0.15em] mb-1">Area</span>
                        <span className="text-zinc-200 font-light text-lg">{property.size || 0} <span className="text-xs text-zinc-500">m²</span></span>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${property.status === "active" ? "bg-primary" : "bg-zinc-600"}`} />
                        <span className="text-xs text-zinc-400 uppercase tracking-wider">{property.status}</span>
                    </div>

                    <Link
                        href={detailsHref}
                        className="group/btn flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-primary hover:text-white transition-colors duration-300"
                    >
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
