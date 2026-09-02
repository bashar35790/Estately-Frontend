import PropertyCard from "@/components/properties/PropertiesCard";
import { getProperty } from "@/lib/api/properties";
import Link from "next/link";
import { PropertyStatus } from "@/types/enums";
import { ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem } from "./MotionWrapper";

export default async function FeaturedProperties() {
    const properties = await getProperty({ status: PropertyStatus.Approved, limit: "6" });

    return (
        <section className="w-full py-16 md:py-24 bg-background border-t border-zinc-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Header ─────────────────────────────────────── */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">

                    {/* Left: heading + subtitle */}
                    <div className="max-w-xl space-y-3">
                        <h2
                            className="text-4xl md:text-5xl font-semibold text-zinc-900 leading-tight"
                        >
                            Explore our premier{" "}
                            <span className="text-primary italic">estates</span>
                        </h2>
                        <p className="text-sm text-zinc-500 leading-relaxed max-w-sm font-body">
                            Each listing offers unique features, exceptional quality, and prime locations,
                            ensuring an exclusive living experience.
                        </p>
                    </div>

                    {/* Right: CTA button */}
                    <div className="shrink-0">
                        <Link
                            href="/all-properties"
                            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-primary transition-all duration-300 shadow-md hover:shadow-primary/30"
                        >
                            See All Properties
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* ── Grid ───────────────────────────────────────── */}
                {properties && properties.length > 0 ? (
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((property: any) => {
                            const idString = typeof property._id === "object" ? property._id.$oid : property._id;
                            return (
                                <StaggerItem key={idString} className="w-full">
                                    <PropertyCard property={property} />
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-24 rounded-2xl border border-dashed border-primary/20 bg-white">
                        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">
                            Check back soon
                        </p>
                        <p className="text-zinc-400 text-sm max-w-xs">
                            We are curating the finest properties for you.
                        </p>
                    </div>
                )}

            </div>
        </section>
    );
}
