import type { AdminTransaction } from "@/lib/api/admin";

interface Props {
  initialTransactions: AdminTransaction[];
}

function AdminTransactionsPage({ initialTransactions }: Props) {
  const formatDate = (value?: string) =>
    value
      ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "-";

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount || 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">Transactions</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Review payment activity in one place.</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Each row includes transaction ID, property, tenant, owner, amount, and payment date for quick operational review.
        </p>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Transaction ID</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Property</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Tenant</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Owner</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Amount</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                    No paid transactions found.
                  </td>
                </tr>
              ) : (
                initialTransactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {transaction.transactionId || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-slate-800">{transaction.propertyName || "-"}</td>
                    <td className="px-4 py-4 text-sm text-slate-700">{transaction.tenantName || "-"}</td>
                    <td className="px-4 py-4 text-sm text-slate-700">{transaction.ownerName || "-"}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-slate-900">{formatPrice(transaction.amount)}</td>
                    <td className="px-4 py-4 text-sm text-slate-700">{formatDate(transaction.date)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminTransactionsPage;
