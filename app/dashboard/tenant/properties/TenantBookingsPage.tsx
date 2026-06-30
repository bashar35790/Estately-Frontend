"use client";

import type { TenantBooking } from "@/lib/api/tenant";

interface Props {
  initialBookings: TenantBooking[];
}

const bookingStatusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
};

const paymentStatusStyles: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-700",
  unpaid: "bg-amber-100 text-amber-700",
  refunded: "bg-sky-100 text-sky-700",
};

function TenantBookingsPage({ initialBookings }: Props) {
  const formatDate = (value?: string) =>
    value
      ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "-";

  const formatAmount = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value || 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">My Bookings</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">All your booked properties in one table.</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Review property name, booking date, amount paid, booking status, and payment status at a glance.
        </p>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Property Name</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Booking Date</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Amount Paid</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Booking Status</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                    No bookings found for this account yet.
                  </td>
                </tr>
              ) : (
                initialBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{booking.propertyTitle || "Booked Property"}</p>
                      <p className="text-xs text-slate-500">{booking.ownerName || "Property Owner"}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">{formatDate(booking.createdAt)}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-slate-900">{formatAmount(booking.amount)}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${bookingStatusStyles[booking.bookingStatus] || "bg-slate-100 text-slate-700"}`}>
                        {booking.bookingStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${paymentStatusStyles[booking.paymentStatus] || "bg-slate-100 text-slate-700"}`}>
                        {booking.paymentStatus}
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

export default TenantBookingsPage;
