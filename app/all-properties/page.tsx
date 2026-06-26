import PropertyCard from "@/components/properties/PropertiesCard";
import { getProperty } from "@/lib/api/properties";

export interface Property {
  _id: string;
  title: string;
  description: string;
  location: string;
  propertyType: string;
  price: number;
  rentType: string;
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

export default async function AllPropertiesPage() {

  const properties: Property[] = await getProperty();
  console.log(properties);
  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 sm:p-12 font-sans selection:bg-amber-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Luxury Brand Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-white">
              Exclusive <span className="text-amber-500 font-normal">Estates</span>
            </h1>
            <p className="text-sm md:text-base text-zinc-400 max-w-xl font-light leading-relaxed tracking-wide">
              Discover our curated collection of premium architectural masterpieces.
              Extraordinary residences for those who seek the exceptional.
            </p>
          </div>

          {/* Real-time Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search estates or locations..."
                className="w-full h-12 pl-4 pr-10 bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 rounded-sm focus:outline-none focus:border-amber-500/50 transition-colors text-sm font-light tracking-wide"
              />

              <button
                className="absolute right-3 top-0 bottom-0 my-auto text-zinc-500 hover:text-amber-500 text-xs transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full sm:max-w-[160px]">
              <select
                aria-label="Filter by property type"
                className="w-full h-12 px-4 bg-zinc-900 border border-white/10 text-zinc-300 rounded-sm focus:outline-none focus:border-amber-500/50 transition-colors appearance-none text-sm font-light tracking-wide cursor-pointer"
              >
                <option value="all">All Properties</option>
                <option value="villa">Villas</option>
                <option value="apartment">Apartments</option>
                <option value="studio">Studios</option>
              </select>
              <div className="absolute right-4 top-0 bottom-0 my-auto h-1.5 w-1.5 border-r border-b border-amber-500 rotate-45 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Dynamic Card Layout Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {properties.map((property) => {
              const idString = typeof property._id === "object" ? property._id.$oid : property._id;
              return (
                <PropertyCard
                  key={idString}
                  property={property}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-32 border border-dashed border-white/10 rounded-sm bg-zinc-900/50">
            <p className="text-amber-500 font-light tracking-widest uppercase text-lg mb-2">No Properties Found</p>
            <p className="text-zinc-500 text-sm font-light max-w-sm">
              We couldn&apos;t find any estates matching your refined criteria. Please adjust your filters.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}