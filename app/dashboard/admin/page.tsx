import Link from "next/link";
import { BarChart3, Building2, CreditCard, ShieldCheck, Users } from "lucide-react";
import { getAdminStatsApi } from "@/lib/api/admin";

export const dynamic = "force-dynamic";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

async function AdminDashboardPage() {
  const stats = await getAdminStatsApi();

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users },
    { label: "Properties", value: stats.totalProperties, icon: Building2 },
    { label: "Bookings", value: stats.totalBookings, icon: BarChart3 },
    { label: "Revenue", value: currency.format(stats.totalRevenue), icon: CreditCard },
  ];

  const quickLinks = [
    {
      href: "/dashboard/admin/users",
      title: "Manage Users",
      text: "Review accounts and update user roles from one place.",
    },
    {
      href: "/dashboard/admin/properties",
      title: "Moderate Properties",
      text: "Approve, reject, update, or delete submitted listings.",
    },
    {
      href: "/dashboard/admin/bookings",
      title: "Monitor Bookings",
      text: "Keep an eye on booking activity across the platform.",
    },
    {
      href: "/dashboard/admin/transactions",
      title: "Track Transactions",
      text: "See payment records with tenant, owner, and property details.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f4ef] p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="relative overflow-hidden rounded-[32px] border border-slate-900/10 bg-slate-950 px-6 py-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] md:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,207,22,0.28),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(30,172,112,0.18),transparent_28%)]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary">
                <ShieldCheck size={14} />
                Admin Control Center
              </span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Oversee users, listings, bookings, and payments.
              </h1>
              <p className="mt-3 max-w-xl text-sm text-white/70 md:text-base">
                A polished command center for the marketplace, designed to match the rest of your brand while keeping moderation work fast.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm text-white/75">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-white/45">Pending Properties</p>
                <p className="mt-2 text-2xl font-semibold text-white">{stats.pendingProperties}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-white/45">Confirmed Bookings</p>
                <p className="mt-2 text-2xl font-semibold text-white">{stats.confirmedBookings}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ label, value, icon: Icon }) => (
            <article key={label} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">{label}</span>
                <span className="rounded-2xl bg-secondary/15 p-3 text-secondary">
                  <Icon size={18} />
                </span>
              </div>
              <p className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition group-hover:border-secondary/30 group-hover:text-secondary">
                  Open
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
