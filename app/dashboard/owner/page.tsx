import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getOwnerStats } from "@/lib/api/owner";
import OwnerDashboardClient from "./OwnerDashboardClient";

export const dynamic = "force-dynamic";

async function OwnerDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const ownerId = session?.user?.id || "";
  const userName = session?.user?.name || "Esteemed Owner";

  let stats = {
    totalEarnings: 0,
    totalProperties: 0,
    totalBookings: 0,
    monthlyEarnings: [] as { name: string; total: number }[],
  };

  if (ownerId) {
    try {
      const data = await getOwnerStats(ownerId);
      console.log("OWNER STATS DATA:", data);
      if (data) {
        stats = {
          totalEarnings: data.totalEarnings ?? 0,
          totalProperties: data.totalProperties ?? 0,
          totalBookings: data.totalBookings ?? 0,
          monthlyEarnings: data.monthlyEarnings ?? [],
        };
      }
    } catch (e) {
      console.error("OWNER STATS ERROR:", e);
    }
  }

  return <OwnerDashboardClient stats={stats} userName={userName} />;
}

export default OwnerDashboardPage;
