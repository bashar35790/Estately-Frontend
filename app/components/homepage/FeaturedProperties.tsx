import PropertyCard from "@/components/properties/PropertiesCard";
import { getProperty } from "@/lib/api/properties";
import Link from "next/link";
import { PropertyStatus } from "@/types/enums";
import { ArrowRight } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "./MotionWrapper";

export default async function FeaturedProperties() {
    const properties = await getProperty({ status: PropertyStatus.Approved, limit: "6" });

    return (
        <section className="bg-black py-16 md:py-24 w-full overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                <FadeInUp className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-light tracking-wide text-white">
                            Featured <span className="text-primary font-normal">Estates</span>
                        </h2>
                        <p className="text-sm md:text-base text-zinc-400 max-w-xl font-light leading-relaxed tracking-wide">
                            Discover a curated selection of our most premium approved properties, waiting for you.
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/all-properties"
                            className="text-primary hover:text-white uppercase tracking-[0.2em] text-xs font-semibold flex items-center gap-2 transition-colors group"
                        >
                            View All Estates
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </FadeInUp>

                {properties && properties.length > 0 ? (
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                        {properties.map((property: any) => {
                            const idString = typeof property._id === "object" ? property._id.$oid : property._id;
                            return (
                                <StaggerItem key={idString} className="w-full max-w-[420px]">
                                    <PropertyCard property={property} />
                                </StaggerItem>
                            )
                        })}
                    </StaggerContainer>
                ) : (
                    <FadeInUp className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-white/10 rounded-sm bg-zinc-900/50">
                        <p className="text-primary font-light tracking-widest uppercase text-lg mb-2">Check back soon</p>
                        <p className="text-zinc-500 text-sm font-light max-w-sm">
                            We are curating the finest properties for you.
                        </p>
                    </FadeInUp>
                )}
            </div>
        </section>
    );
}
