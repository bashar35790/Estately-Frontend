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

async function PropertyList({ resolvedParams, currentPage }: { resolvedParams: any, currentPage: number }) {
  const result = await getProperty({
    ...resolvedParams,
    page: String(currentPage),
    limit: "6",
    status: PropertyStatus.Approved,
  });

  const properties: Property[] = Array.isArray(result) ? result : (result as any)?.properties ?? [];
  const totalPages: number = !Array.isArray(result) ? (result as any)?.totalPages ?? 1 : 1;

  return (
    <>
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          {properties.map((property: Property) => (
            <PropertyCard
              key={property._id}
              property={property}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-32 rounded-2xl border border-dashed border-primary/20 bg-white/60">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">No Properties Found</p>
          <p className="text-zinc-500 text-sm max-w-xs">
            We couldn&apos;t find any estates matching your criteria. Try adjusting your filters.
          </p>
        </div>
      )}

      <PaginationWrapper currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}

export default async function AllPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = parseInt((resolvedParams.page as string) || "1", 10);

  return (
    <div className="min-h-screen">
      {/* ── Dark top banner — makes fixed white navbar readable ─── */}
      <div
        className="w-full pt-28 pb-12 md:pt-32 md:pb-16"
        style={{
          background: "linear-gradient(180deg, #0f1a14 0%, #1a2e20 50%, #243b28 80%, #243b28 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

            <div className="space-y-3 max-w-lg">
              <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
                Explore our premier{" "}
                <span className="text-primary italic">estates</span>
              </h1>
              <p className="text-sm text-white/60 leading-relaxed max-w-sm">
                Each listing offers unique features, exceptional quality, and prime
                locations, ensuring an exclusive living experience.
              </p>
            </div>

            {/* Real-time Filters */}
            <PropertyFilter key={
              `${resolvedParams.location ?? ""}-${resolvedParams.propertyType ?? ""}`
            } />
          </div>
        </div>
      </div>

      {/* ── Light gradient body ───────────────────────────────────── */}
      <div
        className="pb-20"
        style={{
          background: "linear-gradient(160deg, #f0f0f0 0%, #eaf6f0 40%, #f0f7e8 75%, #f0f0f0 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-8">
          {/* Divider */}
          <div className="h-px bg-zinc-300/60" />

          {/* Dynamic Card Layout Grid with Suspense */}
          <Suspense fallback={
            <div className="w-full py-32 flex flex-col justify-center items-center gap-4">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-zinc-400 text-xs uppercase tracking-widest font-medium">Loading Estates...</p>
            </div>
          }>
            <PropertyList resolvedParams={resolvedParams} currentPage={currentPage} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}