import { Suspense } from "react";
import HeroSection from "./components/homepage/Hero";
import FeaturedProperties from "./components/homepage/FeaturedProperties";
import WhyChooseUs from "./components/homepage/WhyChooseUs";
import TopLocations from "./components/homepage/TopLocations";
import RentalStatistics from "./components/homepage/RentalStatistics";
import LoadReviewData from "./components/homepage/LoadeReviewData";
import CTASection from "./components/homepage/CTASection";

const Spinner = () => (
  <div className="w-full py-32 flex justify-center text-primary">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans w-full">
      <HeroSection />
      <TopLocations />
      <Suspense fallback={<Spinner />}>
        <FeaturedProperties />
      </Suspense>
      <WhyChooseUs />
      <RentalStatistics />
      <Suspense fallback={<Spinner />}>
        <LoadReviewData />
      </Suspense>

      <CTASection />
    </div>
  );
}
