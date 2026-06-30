import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getTenantBookingsApi } from "@/lib/api/tenant";
import TenantBookingsPage from "./TenantBookingsPage";

export const dynamic = "force-dynamic";

async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const tenantId = session?.user?.id || "";
  const bookings = await getTenantBookingsApi(tenantId);

  return <TenantBookingsPage initialBookings={bookings} />;
}

export default Page;
