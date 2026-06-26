import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PropertyGallery } from "@/components/properties/PropertyGallery";

export default async function PropertyDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;



    return (
        <div className="bg-default-50 min-h-screen py-28">
            <div className="max-w-7xl mx-auto px-5">
                <Link
                    href="/properties"
                    className="inline-flex items-center gap-2 mb-8 text-primary hover:gap-3 transition-all"
                >
                    <ArrowLeft size={18} />
                    Back to Properties
                </Link>

                <PropertyGallery images={property.images} />

                <div className="grid lg:grid-cols-[1fr_390px] gap-12 mt-10">
                    {/* <div className="space-y-8">
            <PropertyHeader property={property} />

            <PropertyInfoCards property={property} />

            <PropertyDescription
              description={property.description}
            />

            <PropertyAmenities
              amenities={property.amenities}
              extraFeatures={property.extraFeatures}
            />

            <PropertyOwnerCard property={property} />

            <PropertyReviews propertyId={property._id} />
          </div>

          <div>
            <PropertyBookingCard property={property} />
          </div> */}
                </div>
            </div>
        </div>
    );
}
