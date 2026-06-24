"use client";

import React, { useState } from "react";
import { Card, Link } from "@heroui/react";
import { MapPin, CircleDollar, ArrowRight } from "@gravity-ui/icons";
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

export default function PropertyCard({ property }: PropertyCardProps) {
    if (!property) return null;

    // Premium fallback estate image provided by you
    const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    // Check if primary image exists, otherwise default straight to fallback
    const initialImage = property.images && property.images.length > 0
        ? property.images[0]
        : FALLBACK_IMAGE;

    // State to track if the current image breaks at runtime
    const [imgSrc, setImgSrc] = useState<string>(initialImage);

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

    return (
        <Card className="group/card w-full max-w-[420px] bg-white border border-zinc-200/60 rounded-[32px] p-4 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_22px_45px_rgba(30,172,112,0.14)] hover:border-primary/30 transition-all duration-500 ease-out flex flex-col justify-between">

            <div>
                {/* 1. Change this wrapper container to include a strict height class like h-[240px] or h-full */}
                <div className="w-full h-60 relative rounded-[24px] overflow-hidden bg-zinc-100 block">
                    {imgSrc && (
                        <Image
                            src={imgSrc}
                            alt={`${property.title || "Property"} listing asset showcase`}
                            width={420}
                            height={240}
                            unoptimized
                            sizes="(max-width: 420px) 100vw, 420px"
                            priority={property.isFeatured}
                            className="object-cover absolute inset-0 w-full h-full"
                            onError={() => {
                                if (imgSrc !== FALLBACK_IMAGE) {
                                    setImgSrc(FALLBACK_IMAGE);
                                }
                            }}
                        />
                    )}

                    {/* Elegant overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-90 pointer-events-none z-10" />

                    {/* Floating Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center z-20">
                        <span className="text-[10px] uppercase tracking-widest font-extrabold bg-white/90 backdrop-blur-md text-zinc-800 border border-white/20 px-3 py-1.5 rounded-full shadow-sm font-body">
                            {property.propertyType}
                        </span>

                        {property.isFeatured && (
                            <span className="text-[10px] uppercase tracking-widest font-extrabold bg-primary text-white px-3 py-1.5 rounded-full shadow-md font-body">
                                Premium Selection
                            </span>
                        )}
                    </div>

                    {/* Floating Pricing Architecture Wrapper */}
                    <div className="absolute bottom-3.5 left-3.5 z-20 bg-white/95 backdrop-blur-md border border-zinc-100 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-md">
                        <div className="flex justify-center items-center bg-primary/10 rounded-full w-5 h-5">
                            <CircleDollar className="text-primary w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-bold text-zinc-900 tracking-tight font-body">
                            {formatPrice(property.price)} <span className="text-zinc-500 font-normal text-xs">/ {property.rentType || "mo"}</span>
                        </span>
                    </div>
                </div>

                {/* Text Header & Title Meta Descriptions */}
                <div className="flex flex-col items-start gap-1 pt-5 pb-2 px-1">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 leading-tight group-hover/card:text-primary transition-colors duration-300 font-heading line-clamp-1">
                        {property.title}
                    </h2>

                    {property.location && (
                        <div className="flex items-center gap-1.5 text-zinc-500 font-body">
                            <MapPin className="text-zinc-400 w-3.5 h-3.5" />
                            <span className="text-xs font-semibold tracking-wide line-clamp-1">
                                {property.location}
                            </span>
                        </div>
                    )}

                    <p className="text-sm text-zinc-500 leading-relaxed font-body line-clamp-2 mt-2">
                        {property.description}
                    </p>
                </div>
            </div>

            <div>
                {/* Architectural Structural Grid Strip */}
                <div className="grid grid-cols-3 gap-2 border-y border-zinc-100 py-3.5 my-3 font-body text-xs text-center bg-zinc-50/70 rounded-2xl mx-1">
                    <div className="flex flex-col gap-0.5 border-r border-zinc-200/60">
                        <span className="text-zinc-400 text-[9px] uppercase tracking-wider font-extrabold">Beds</span>
                        <span className="text-zinc-800 font-bold text-sm">🛏️ {property.bedrooms || 0}</span>
                    </div>
                    <div className="flex flex-col gap-0.5 border-r border-zinc-200/60">
                        <span className="text-zinc-400 text-[9px] uppercase tracking-wider font-extrabold">Baths</span>
                        <span className="text-zinc-800 font-bold text-sm">🚿 {property.bathrooms || 0}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-zinc-400 text-[9px] uppercase tracking-wider font-extrabold">Area</span>
                        <span className="text-secondary font-extrabold text-sm">{property.size || 0} m²</span>
                    </div>
                </div>

                {/* Dynamic Interactive Card Footer Bar */}
                <div className="pt-2 pb-1 px-1 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-zinc-400 flex items-center gap-1.5 font-body">
                        <span className={`w-1.5 h-1.5 rounded-full ${property.status === "active" ? "bg-primary" : "bg-amber-500"}`} />
                        Status: {property.status}
                    </span>

                    <Link
                        href={`/properties/${propertyId}`}
                        className="group/link flex items-center gap-2 bg-zinc-50 hover:bg-primary px-4 py-2 rounded-full text-xs font-bold text-zinc-700 hover:text-white border border-zinc-200/60 hover:border-primary shadow-sm transition-all duration-300 font-body"
                        variant="light"
                        disableRipple
                    >
                        View Listing
                        <ArrowRight className="group-hover/link:translate-x-1 text-primary group-hover/link:text-white w-3.5 h-3.5 transition-transform duration-200" />
                    </Link>
                </div>
            </div>

        </Card>
    );
}
