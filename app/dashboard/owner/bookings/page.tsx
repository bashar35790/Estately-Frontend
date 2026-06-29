import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getOwnerBookingsApi } from "@/lib/api/owner";
import OwnerBookingsPage from "./OwnerBookingsPage";

export const dynamic = "force-dynamic";

async function Page() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const ownerId = session?.user?.id || "";
    const bookings = await getOwnerBookingsApi(ownerId);

    return <OwnerBookingsPage initialBookings={bookings} />;
}

export default Page;
