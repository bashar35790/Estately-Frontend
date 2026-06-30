import { getAdminUsersApi } from "@/lib/api/admin";
import AdminUsersPage from "./AdminUsersPage";

export const dynamic = "force-dynamic";

async function Page() {
  const users = await getAdminUsersApi();
  return <AdminUsersPage initialUsers={users} />;
}

export default Page;
