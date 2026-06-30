// Adjust path
import { getAllReviews } from "@/lib/action/properties";
import ClientReviews from "./Review";

export default async function LoadReviewData() {
  // Fetch data directly on the server
  const reviews = await getAllReviews();

  return (
    <div>
      <ClientReviews reviews={reviews} />
    </div>
  );
}