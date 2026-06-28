import PropertyCard from "@/components/properties/PropertiesCard";
import { getProperty } from "@/lib/api/properties";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function FeaturedProperties() {
    const properties = await getProperty({ status: "approved", limit: "6" });

    return (
        <section className="bg-black py-24 px-6 sm:px-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-light tracking-wide text-white">
                            Featured <span className="text-amber-500 font-normal">Estates</span>
                        </h2>
                        <p className="text-sm md:text-base text-zinc-400 max-w-xl font-light leading-relaxed tracking-wide">
                            Discover a curated selection of our most premium approved properties, waiting for you.
                        </p>
                    </div>
                    <div>
                        <Link 
                            href="/all-properties"
                            className="text-amber-500 hover:text-white uppercase tracking-[0.2em] text-xs font-semibold flex items-center gap-2 transition-colors group"
                        >
                            View All Estates
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
                
                {properties && properties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                        {properties.map((property: any) => {
                            const idString = typeof property._id === "object" ? property._id.$oid : property._id;
                            return (
                                <PropertyCard 
                                    key={idString} 
                                    property={property} 
                                />
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-white/10 rounded-sm bg-zinc-900/50">
                        <p className="text-amber-500 font-light tracking-widest uppercase text-lg mb-2">Check back soon</p>
                        <p className="text-zinc-500 text-sm font-light max-w-sm">
                            We are curating the finest properties for you.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
