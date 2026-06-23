import HeroSection from "./components/homepage/Hero";
import ClientReviews from "./components/homepage/Review";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection></HeroSection>
      <ClientReviews></ClientReviews>
    </div>
  );
}
