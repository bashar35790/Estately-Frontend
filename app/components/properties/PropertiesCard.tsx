"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Image from "next/image";

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

const BedIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9V19" /><path d="M22 9V19" /><path d="M2 14H22" />
        <rect x="6" y="9" width="12" height="5" rx="1" />
        <path d="M2 9C2 7.9 2.9 7 4 7H20C21.1 7 22 7.9 22 9" />
    </svg>
);

const BathIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 6 C9 4.3 10.3 3 12 3 C13.7 3 15 4.3 15 6 L15 12" />
        <path d="M4 12H20V15C20 17.8 17.8 20 15 20H9C6.2 20 4 17.8 4 15V12Z" />
        <path d="M4 12C4 10.9 4.9 10 6 10H18C19.1 10 20 10.9 20 12" />
    </svg>
);

export default function PropertyCard({ property }: PropertyCardProps) {
    const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop";
    const initialImage = property.images && property.images.length > 0 ? property.images[0] : FALLBACK_IMAGE;
    const [imgSrc, setImgSrc] = useState(initialImage);

    if (!property) return null;

    const formatPrice = (amount: number) => {
        if (!amount) return "$0";
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const propertyId = typeof property._id === "object" && "$oid" in property._id
        ? property._id.$oid
        : property._id as string;

    const detailsHref = `/all-properties/${propertyId}`;

    return (
        <Link href={detailsHref} className="group block w-full">
            <div
                className="w-full flex flex-col rounded-2xl overflow-hidden bg-white transition-all duration-300 group-hover:-translate-y-1"
                style={{
                    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(30,172,112,0.15), 0 2px 8px rgba(0,0,0,0.08)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)")}
            >
                {/* ── Image ─────────────────────────────────── */}
                <div className="relative w-full overflow-hidden bg-zinc-100" style={{ height: "220px" }}>
                    {imgSrc && (
                        <Image
                            src={imgSrc}
                            alt={property.title || "Property"}
                            fill
                            sizes="(max-width: 420px) 100vw, 420px"
                            priority={property.isFeatured}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={() => { if (imgSrc !== FALLBACK_IMAGE) setImgSrc(FALLBACK_IMAGE); }}
                        />
                    )}

                    {/* Badge top-left */}
                    <div className="absolute top-3 left-3 z-10">
                        <span
                            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-zinc-800 shadow-sm"
                            style={{ fontFamily: "var(--font-manrope)" }}
                        >
                            {property.isFeatured ? "Featured" : "For Rent"}
                        </span>
                    </div>
                </div>

                {/* ── Body ──────────────────────────────────── */}
                <div className="p-5 flex flex-col gap-3">

                    {/* Beds · Baths row */}
                    <div className="flex items-center gap-4 text-zinc-500" style={{ fontSize: "13px" }}>
                        <span className="flex items-center gap-1.5 text-zinc-500">
                            <span className="text-primary"><BedIcon /></span>
                            <span>{property.bedrooms || 0} Bedroom{property.bedrooms !== 1 ? "s" : ""}</span>
                        </span>
                        <span className="w-px h-4 bg-zinc-200" />
                        <span className="flex items-center gap-1.5 text-zinc-500">
                            <span className="text-primary"><BathIcon /></span>
                            <span>{property.bathrooms || 0} Bathroom{property.bathrooms !== 1 ? "s" : ""}</span>
                        </span>
                    </div>

                    {/* Title */}
                    <h3
                        className="text-zinc-900 font-semibold leading-snug line-clamp-1 group-hover:text-primary transition-colors duration-200"
                        style={{ fontSize: "18px", fontFamily: "var(--font-playfair)" }}
                    >
                        {property.title}
                    </h3>

                    {/* Divider */}
                    <div className="h-px bg-zinc-100" />

                    {/* Price · Location */}
                    <div className="flex items-center gap-2 flex-wrap" style={{ fontSize: "13px" }}>
                        <span className="font-bold text-zinc-900" style={{ fontSize: "15px" }}>
                            {formatPrice(property.price)}
                        </span>
                        <span className="text-zinc-300">·</span>
                        <span className="flex items-center gap-1 text-zinc-500">
                            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="line-clamp-1">{property.location || "Location TBD"}</span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
