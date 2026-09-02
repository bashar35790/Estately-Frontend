import React from "react";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { BarChart3, Building2, CreditCard, Users } from "lucide-react";
import { getAdminStatsApi } from "@/lib/api/admin";

export const dynamic = "force-dynamic";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default async function AdminDashboardPage() {
    const stats = await getAdminStatsApi();

    const cards = [
        {
            title: "Total Users",
            value: stats.totalUsers,
            trend: 24,
            trendText: "Increase",
            icon: <Users size={20} />,
        },
        {
            title: "Properties",
            value: stats.totalProperties,
            trend: 12,
            trendText: "Increase",
            icon: <Building2 size={20} />,
        },
        {
            title: "Bookings",
            value: stats.totalBookings,
            trend: -4,
            trendText: "Decrease",
            icon: <BarChart3 size={20} />,
        },
        {
            title: "Revenue",
            value: currency.format(stats.totalRevenue),
            trend: 36,
            trendText: "Increase",
            icon: <CreditCard size={20} />,
        },
    ];

    const areaChartData = [
        { name: "Jan", value: 50000 },
        { name: "Feb", value: 62000 },
        { name: "Mar", value: 55000 },
        { name: "Apr", value: 80000 },
        { name: "May", value: 70000 },
        { name: "Jun", value: 98000 },
        { name: "Jul", value: 105000 },
        { name: "Aug", value: 95000 },
        { name: "Sep", value: 112000 },
        { name: "Oct", value: 108000 },
        { name: "Nov", value: 125000 },
        { name: "Dec", value: 140000 },
    ];

    const pieChartData = [
        { name: "Apartments", value: 55, color: "#1eac70" },
        { name: "Villas", value: 25, color: "#a3cf16" },
        { name: "Commercial", value: 15, color: "#4f46e5" },
        { name: "Land", value: 5, color: "#0ea5e9" },
    ];

    const tableColumns = [
        { key: "property", label: "Property" },
        { key: "tenant", label: "Tenant" },
        { key: "date", label: "Date" },
        { key: "status", label: "Status" },
        { key: "amount", label: "Amount" },
    ];

    const tableData = [
        { property: "Sunset Villa", tenant: "Alice Smith", date: "Oct 24, 2026", status: "confirmed", amount: "$1,200" },
        { property: "Downtown Condo", tenant: "Bob Jones", date: "Oct 22, 2026", status: "pending", amount: "$850" },
        { property: "Luxury Loft", tenant: "Charlie Davis", date: "Oct 21, 2026", status: "confirmed", amount: "$2,100" },
        { property: "Oceanview Apartment", tenant: "Diana Prince", date: "Oct 20, 2026", status: "cancelled", amount: "$950" },
        { property: "Suburban House", tenant: "Eve Adams", date: "Oct 18, 2026", status: "confirmed", amount: "$1,500" },
    ];

    return (
        <DashboardOverview 
            title="Dashboard" 
            cards={cards} 
            areaChartData={areaChartData} 
            pieChartData={pieChartData}
            tableColumns={tableColumns}
            tableData={tableData}
        />
    );
}
