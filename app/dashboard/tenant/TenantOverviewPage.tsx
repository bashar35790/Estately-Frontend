"use client";

import Link from "next/link";
import { Bookmark, CalendarDays, CircleDollarSign, House } from "lucide-react";
import type { TenantBooking, TenantStats } from "@/lib/api/tenant";

interface Props {
  stats: TenantStats;
  bookings: TenantBooking[];
  userName: string;
}

function TenantOverviewPage({ stats, bookings, userName }: Props) {
  const recentBookings = bookings.slice(0, 4);

  const cards = [
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarDays,
      tone: "from-[#1eac70]/15 to-[#1eac70]/5 text-primary",
    },
    {
      label: "Active Bookings",
      value: stats.activeBookings,
      icon: House,
      tone: "from-[#a3cf16]/20 to-[#a3cf16]/5 text-[#6d8d00]",
    },
    {
      label: "Favorites Saved",
      value: stats.favoriteProperties,
      icon: Bookmark,
      tone: "from-slate-900/10 to-slate-900/5 text-slate-800",
    },
    {
      label: "Amount Paid",
      value: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(stats.totalPaid),
      icon: CircleDollarSign,
      tone: "from-emerald-500/15 to-lime-300/5 text-emerald-700",
    },
  ];

  const formatDate = (value?: string) =>
    value
      ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "-";

  return (
    <div className="min-h-screen bg-[#f4f4ef] px-6 py-8 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="relative overflow-hidden rounded-[34px] border border-white/50 bg-slate-950 px-7 py-8 text-white shadow-[0_35px_90px_rgba(15,23,42,0.22)] md:px-10 md:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,172,112,0.32),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(163,207,22,0.22),transparent_26%)]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary">
                Tenant Overview
              </span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Welcome back, {userName}.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 md:text-base">
                Track your bookings, payments, and saved homes in one polished place designed to match the rest of your brand.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/tenant/properties"
                className="rounded-2xl bg-secondary px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
              >
                View My Bookings
              </Link>
              <Link
                href="/dashboard/tenant/favorites"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Open Favorites
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ label, value, icon: Icon, tone }) => (
            <article key={label} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <div className={`rounded-2xl bg-gradient-to-br p-3 ${tone}`}>
                  <Icon size={18} />
                </div>
              </div>
              <p className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">Recent Bookings</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Your latest rental activity.</h2>
            </div>
            <Link href="/dashboard/tenant/properties" className="text-sm font-semibold text-primary hover:underline">
              See all bookings
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <div className="mt-8 rounded-[26px] border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
              <p className="text-lg font-semibold text-slate-800">No bookings yet</p>
              <p className="mt-2 text-sm text-slate-500">When you book a property, it will show up here.</p>
              <Link
                href="/all-properties"
                className="mt-6 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Browse Properties
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {recentBookings.map((booking) => (
                <article key={booking._id} className="rounded-[24px] border border-slate-200 bg-[#fbfbf8] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{booking.propertyTitle || "Booked Property"}</h3>
                      <p className="mt-1 text-sm text-slate-500">Booked on {formatDate(booking.createdAt)}</p>
                    </div>
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold capitalize text-white">
                      {booking.bookingStatus}
                    </span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-slate-500">Amount Paid</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(booking.amount || 0)}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-slate-500">Payment Status</p>
                      <p className="mt-1 font-semibold capitalize text-slate-900">{booking.paymentStatus}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default TenantOverviewPage;
