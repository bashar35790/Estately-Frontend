import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getTenantBookingsApi, getTenantStatsApi } from "@/lib/api/tenant";
import TenantOverviewPage from "./TenantOverviewPage";

export const dynamic = "force-dynamic";

async function TenantPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const tenantId = session?.user?.id || "";
  const [stats, bookings] = await Promise.all([
    getTenantStatsApi(tenantId),
    getTenantBookingsApi(tenantId),
  ]);

  return <TenantOverviewPage stats={stats} bookings={bookings} userName={session?.user?.name || "Tenant"} />;
}

export default TenantPage;
