import { Suspense } from "react";
import PropertyCard from "@/components/properties/PropertiesCard";
import PropertyFilter from "@/components/properties/PropertyFilter";
import { PaginationWrapper } from "@/components/properties/PaginationWrapper";
import { PropertyStatus } from "@/types/enums";
import { getProperty } from "@/lib/api/properties";

interface Property {
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

export default async function AllPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = parseInt((resolvedParams.page as string) || "1", 10);

  const result = await getProperty({
    ...resolvedParams,
    page: String(currentPage),
    limit: "3",
    status: PropertyStatus.Approved,
  });

  const properties: Property[] = Array.isArray(result) ? result : (result as any)?.properties ?? [];
  const totalPages: number = !Array.isArray(result) ? (result as any)?.totalPages ?? 1 : 1;

  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 sm:p-12 font-sans selection:bg-primary selection:text-black">
      <div className="container mx-auto space-y-16">

        {/* Luxury Brand Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-white">
              Exclusive <span className="text-primary font-normal">Estates</span>
            </h1>
            <p className="text-sm md:text-base text-zinc-400 max-w-xl font-light leading-relaxed tracking-wide">
              Discover our curated collection of premium architectural masterpieces.
              Extraordinary residences for those who seek the exceptional.
            </p>
          </div>

          {/* Real-time Filters */}
          <PropertyFilter key={
            `${resolvedParams.location ?? ""}-${resolvedParams.propertyType ?? ""}`
          } />
        </div>

        {/* Dynamic Card Layout Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
            {properties.map((property: Property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-32 border border-dashed border-white/10 rounded-sm bg-zinc-900/50">
            <p className="text-primary font-light tracking-widest uppercase text-lg mb-2">No Properties Found</p>
            <p className="text-zinc-500 text-sm font-light max-w-sm">
              We couldn&apos;t find any estates matching your refined criteria. Please adjust your filters.
            </p>
          </div>
        )}

        <Suspense fallback={null}>
          <PaginationWrapper currentPage={currentPage} totalPages={totalPages} />
        </Suspense>

      </div>
    </div>
  );
}