"use client";

import { useState, useTransition } from "react";
import type { OwnerBooking } from "@/lib/api/owner";
import { approveBookingAction, rejectBookingAction } from "@/lib/action/owner";
import { BookingStatus } from "@/types/enums";

const bookingStatusColors: Record<string, { badge: string; dot: string }> = {
    pending:   { badge: "bg-amber-100 text-amber-700 border border-amber-200",    dot: "bg-amber-500" },
    confirmed: { badge: "bg-emerald-100 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500" },
    rejected:  { badge: "bg-red-100 text-red-700 border border-red-200",          dot: "bg-red-500" },
    approved:  { badge: "bg-emerald-100 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500" },
};

interface Props {
    initialBookings: OwnerBooking[];
}

export default function OwnerBookingsPage({ initialBookings }: Props) {
    const [bookings, setBookings] = useState<OwnerBooking[]>(initialBookings);
    const [isPending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleApprove = (bookingId: string) => {
        setLoadingId(bookingId);
        startTransition(async () => {
            await approveBookingAction(bookingId);
            setBookings((prev) =>
                prev.map((b) => (b._id === bookingId ? { ...b, bookingStatus: BookingStatus.Confirmed } : b))
            );
            setLoadingId(null);
        });
    };

    const handleReject = (bookingId: string) => {
        if (!confirm("Are you sure you want to reject this booking request?")) return;
        setLoadingId(bookingId);
        startTransition(async () => {
            await rejectBookingAction(bookingId);
            setBookings((prev) =>
                prev.map((b) => (b._id === bookingId ? { ...b, bookingStatus: BookingStatus.Rejected } : b))
            );
            setLoadingId(null);
        });
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
        });
    };

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount || 0);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight font-heading text-gray-900">Booking Requests</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Review and manage booking requests from tenants for your properties.
                    </p>
                </div>
                <div className="flex gap-3">
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                        {bookings.filter(b => b.bookingStatus?.toLowerCase() === BookingStatus.Pending).length} Pending
                    </span>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
                        {bookings.length} Total
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500">Tenant</th>
                                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500">Property</th>
                                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500">Move-In</th>
                                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500">Amount</th>
                                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                                <th className="px-4 py-4 text-right text-[11px] font-bold uppercase tracking-widest text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                                        <p className="text-4xl mb-3">📋</p>
                                        <p className="font-semibold text-gray-600">No booking requests yet</p>
                                        <p className="text-sm mt-1">When tenants request to book your properties, they will appear here.</p>
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((booking) => {
                                    const statusKey = booking.bookingStatus?.toLowerCase() || BookingStatus.Pending;
                                    const colors = bookingStatusColors[statusKey] || { badge: "bg-gray-100 text-gray-600 border border-gray-200", dot: "bg-gray-400" };
                                    const isLoading = loadingId === booking._id && isPending;
                                    const isResolved = [BookingStatus.Confirmed, BookingStatus.Rejected, BookingStatus.Approved].includes(statusKey);

                                    return (
                                        <tr
                                            key={booking._id}
                                            className={`transition-colors hover:bg-gray-50/50 ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
                                        >
                                            {/* Tenant Info */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-sm font-bold text-indigo-600">
                                                        {booking.tenantName?.charAt(0) || booking.tenantId?.charAt(0) || "T"}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">
                                                            {booking.tenantName || `Tenant #${booking.tenantId?.slice(-6)}`}
                                                        </p>
                                                        <p className="text-xs text-gray-400">{booking.contactNumber}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Property Info */}
                                            <td className="px-4 py-4">
                                                <p className="text-sm font-medium text-gray-800">
                                                    {booking.propertyTitle || `Property #${booking.propertyId?.slice(-6)}`}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-0.5">ID: {booking.propertyId?.slice(-8)}</p>
                                            </td>

                                            {/* Move-In Date */}
                                            <td className="px-4 py-4">
                                                <p className="text-sm text-gray-700">{formatDate(booking.moveInDate)}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">Booked {formatDate(booking.createdAt)}</p>
                                            </td>

                                            {/* Amount */}
                                            <td className="px-4 py-4">
                                                <p className="font-semibold text-gray-900 text-sm">{formatCurrency(booking.amount)}</p>
                                                <p className="text-xs text-gray-400 mt-0.5 capitalize">{booking.paymentStatus}</p>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${colors.badge}`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                                                    {booking.bookingStatus || BookingStatus.Pending}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    {isResolved ? (
                                                        <span className="text-xs text-gray-400 italic">Resolved</span>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleApprove(booking._id)}
                                                                disabled={isLoading}
                                                                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-all hover:bg-emerald-100 hover:border-emerald-200 disabled:opacity-50"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(booking._id)}
                                                                disabled={isLoading}
                                                                className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-all hover:bg-red-100 hover:border-red-200 disabled:opacity-50"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
