"use client";

import React from "react";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { Bookmark, CalendarDays, CircleDollarSign, House } from "lucide-react";
import type { TenantBooking, TenantStats } from "@/lib/api/tenant";

interface Props {
    stats: TenantStats;
    bookings: TenantBooking[];
    userName: string;
}

export default function TenantOverviewPage({ stats, bookings, userName }: Props) {
    const cards = [
        {
            title: "Total Bookings",
            value: stats.totalBookings,
            trend: 12,
            trendText: "Increase",
            icon: <CalendarDays size={20} />,
        },
        {
            title: "Active Bookings",
            value: stats.activeBookings,
            trend: -5,
            trendText: "Decrease",
            icon: <House size={20} />,
        },
        {
            title: "Favorites Saved",
            value: stats.favoriteProperties,
            trend: 8,
            trendText: "Increase",
            icon: <Bookmark size={20} />,
        },
        {
            title: "Amount Paid",
            value: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(stats.totalPaid),
            trend: 24,
            trendText: "Increase",
            icon: <CircleDollarSign size={20} />,
        },
    ];

    const areaChartData = [
        { name: "Jan", value: 30000 },
        { name: "Feb", value: 42000 },
        { name: "Mar", value: 35000 },
        { name: "Apr", value: 50000 },
        { name: "May", value: 40000 },
        { name: "Jun", value: 58000 },
        { name: "Jul", value: 65000 },
        { name: "Aug", value: 59000 },
        { name: "Sep", value: 72000 },
        { name: "Oct", value: 68000 },
        { name: "Nov", value: 80000 },
        { name: "Dec", value: 85000 },
    ];

    const pieChartData = [
        { name: "Apartments", value: 45, color: "#1eac70" },
        { name: "Villas", value: 25, color: "#a3cf16" },
        { name: "Condos", value: 20, color: "#4f46e5" },
        { name: "Townhouses", value: 10, color: "#0ea5e9" },
    ];

    const tableColumns = [
        { key: "title", label: "Property Name" },
        { key: "id", label: "Booking ID" },
        { key: "date", label: "Date" },
        { key: "status", label: "Status" },
        { key: "amount", label: "Amount" },
    ];

    const tableData = bookings.slice(0, 5).map(b => ({
        title: b.propertyTitle || "Unknown Property",
        id: `#${b._id.toString().slice(-6).toUpperCase()}`,
        date: new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: b.bookingStatus,
        amount: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(b.amount || 0),
    }));

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
