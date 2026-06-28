import HeroSection from "./components/homepage/Hero";
import FeaturedProperties from "./components/homepage/FeaturedProperties";
import WhyChooseUs from "./components/homepage/WhyChooseUs";
import TopLocations from "./components/homepage/TopLocations";
import RentalStatistics from "./components/homepage/RentalStatistics";
import ClientReviews from "./components/homepage/Review";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black w-full">
      <HeroSection />
      <TopLocations />
      <FeaturedProperties />
      <WhyChooseUs />
      <RentalStatistics />
      <ClientReviews />
    </div>
  );
}
