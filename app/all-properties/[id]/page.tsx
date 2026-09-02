import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { PropertyHeader } from "@/components/properties/PropertyHeader";
import { PropertyInfoCards } from "@/components/properties/PropertyInfoCards";
import { PropertyDescription } from "@/components/properties/PropertyDescription";
import { PropertyAmenities } from "@/components/properties/PropertyAmenities";
import { PropertyOwnerCard } from "@/components/properties/PropertyOwnerCard";
import { PropertyReviews } from "@/components/properties/PropertyReviews";
import { PropertyBookingCard } from "@/components/properties/PropertyBookingCard";
import { getPropertyById } from "@/lib/api/properties";

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

export default async function PropertyDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const property: Property | null = await getPropertyById(id);

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-default-50">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-heading text-default-900">Property Not Found</h1>
                    <Link href="/all-properties" className="text-primary hover:underline font-medium">
                        Return to Listings
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen"
            style={{
                background: `linear-gradient(
                    180deg,
                    #0c1810 0%,
                    #152a1c 5%,
                    #1d3c28 11%,
                    #2a5239 16%,
                    #c8e4d0 22%,
                    #e0efe4 28%,
                    #edf4ef 35%,
                    #f2f5f2 50%,
                    #f5f5f4 100%
                )`,
            }}
        >
            {/* ── Back nav — sits in the dark zone at top ─── */}
            <div className="w-full pt-28 pb-10 md:pt-32 md:pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/all-properties"
                        className="group inline-flex items-center gap-2 text-white/70 hover:text-primary font-semibold transition-all hover:gap-3 text-sm"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Properties
                    </Link>
                </div>
            </div>

            {/* ── Content — sits in the soft light zone ─── */}
            <div className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Gallery */}
                    <PropertyGallery images={property.images} />

                    {/* Content Grid */}
                    <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-16 mt-16 items-start">
                        {/* Left Column: Details */}
                        <div className="space-y-12">
                            <PropertyHeader property={property} />
                            <hr className="border-zinc-200" />
                            <PropertyInfoCards property={property} />
                            <PropertyDescription description={property.description} />
                            <PropertyAmenities property={property} />
                            <hr className="border-zinc-200" />
                            <PropertyReviews propertyId={property._id} />
                        </div>

                        {/* Right Column: Sticky Booking & Owner */}
                        <div
                            className="sticky top-28 space-y-8 overflow-y-auto pb-4"
                            style={{
                                maxHeight: "calc(100vh - 8rem)",
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                        >
                            <PropertyBookingCard property={property} />
                            <PropertyOwnerCard property={property} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
