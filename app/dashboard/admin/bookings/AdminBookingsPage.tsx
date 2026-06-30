import type { AdminBooking } from "@/lib/api/admin";

interface Props {
  initialBookings: AdminBooking[];
}

const statusClasses: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
};

function AdminBookingsPage({ initialBookings }: Props) {
  const formatDate = (value?: string) =>
    value
      ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "-";

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount || 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">All Bookings</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Monitor booking activity across the platform.</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          This view helps the admin team follow tenant demand, payment states, and owner activity without changing booking records.
        </p>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Tenant</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Property</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Owner</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Move In</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Amount</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                    No bookings available.
                  </td>
                </tr>
              ) : (
                initialBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{booking.tenantName || "Unknown Tenant"}</p>
                      <p className="text-xs text-slate-500">{booking.tenantEmail || booking.contactNumber || "-"}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-slate-800">{booking.propertyTitle || "-"}</p>
                      <p className="text-xs text-slate-500">Booked: {formatDate(booking.createdAt)}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-slate-800">{booking.ownerName || "-"}</p>
                      <p className="text-xs text-slate-500">{booking.ownerEmail || "-"}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">{formatDate(booking.moveInDate)}</td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-900">{formatPrice(booking.amount)}</p>
                      <p className="text-xs capitalize text-slate-500">{booking.paymentStatus}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClasses[booking.bookingStatus] || "bg-slate-100 text-slate-700"}`}>
                        {booking.bookingStatus}
                      </span>
                    </td>
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

export default AdminBookingsPage;
