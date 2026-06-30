import { getAdminPropertiesApi } from "@/lib/api/admin";
import AdminPropertiesPage from "./AdminPropertiesPage";

export const dynamic = "force-dynamic";

async function Page() {
  const properties = await getAdminPropertiesApi();
  return <AdminPropertiesPage initialProperties={properties} />;
}

export default Page;
