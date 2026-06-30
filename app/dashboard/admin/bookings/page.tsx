import { getAdminBookingsApi } from "@/lib/api/admin";
import AdminBookingsPage from "./AdminBookingsPage";

export const dynamic = "force-dynamic";

async function Page() {
  const bookings = await getAdminBookingsApi();
  return <AdminBookingsPage initialBookings={bookings} />;
}

export default Page;
