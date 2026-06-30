import HeroSection from "./components/homepage/Hero";
import FeaturedProperties from "./components/homepage/FeaturedProperties";
import WhyChooseUs from "./components/homepage/WhyChooseUs";
import TopLocations from "./components/homepage/TopLocations";
import RentalStatistics from "./components/homepage/RentalStatistics";
import ClientReviews from "./components/homepage/Review";
import { getAllReviews } from "./lib/action/properties";
import { ReviewPayload } from "./types/review";

export default async function Home() {
  // Fetch data directly on the server
  const reviews: ReviewPayload[] = await getAllReviews();
  console.log("Fetched reviews:", reviews); // Debugging line
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black w-full">
      <HeroSection />
      <TopLocations />
      <FeaturedProperties />
      <WhyChooseUs />
      <RentalStatistics />
      <ClientReviews reviews={reviews} />
    </div>
  );
}
