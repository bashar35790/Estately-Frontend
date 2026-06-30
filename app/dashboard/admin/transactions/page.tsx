import { getAdminTransactionsApi } from "@/lib/api/admin";
import AdminTransactionsPage from "./AdminTransactionsPage";

export const dynamic = "force-dynamic";

async function Page() {
  const transactions = await getAdminTransactionsApi();
  return <AdminTransactionsPage initialTransactions={transactions} />;
}

export default Page;
