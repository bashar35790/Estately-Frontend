"use client";

import React from "react";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { Briefcase, CircleDollarSign, CalendarDays, House } from "lucide-react";

interface MonthlyEarning {
    name: string;
    total: number;
}

interface OwnerStats {
    totalEarnings: number;
    totalProperties: number;
    totalBookings: number;
    monthlyEarnings: MonthlyEarning[];
}

interface Props {
    stats: OwnerStats;
    userName: string;
}

export default function OwnerDashboardClient({ stats, userName }: Props) {
    const cards = [
        {
            title: "Total Earnings",
            value: `$${stats.totalEarnings.toLocaleString()}`,
            trend: 45,
            trendText: "Increase",
            icon: <CircleDollarSign size={20} />,
        },
        {
            title: "Total Properties",
            value: stats.totalProperties,
            trend: 5,
            trendText: "Increase",
            icon: <Briefcase size={20} />,
        },
        {
            title: "Total Bookings",
            value: stats.totalBookings,
            trend: 12,
            trendText: "Increase",
            icon: <CalendarDays size={20} />,
        },
        {
            title: "Active Listings",
            value: stats.totalProperties > 0 ? stats.totalProperties - 1 : 0,
            trend: 8,
            trendText: "Increase",
            icon: <House size={20} />,
        },
    ];

    const areaChartData = stats.monthlyEarnings.map(m => ({
        name: m.name,
        value: m.total
    }));
    
    // Add some default padding if the data is empty or too short
    if (areaChartData.length === 0) {
        areaChartData.push(
            { name: "Jan", value: 3000 },
            { name: "Feb", value: 4500 },
            { name: "Mar", value: 4000 },
            { name: "Apr", value: 6500 },
            { name: "May", value: 7200 }
        );
    }

    const pieChartData = [
        { name: "Apartments", value: 40, color: "#1eac70" },
        { name: "Villas", value: 30, color: "#a3cf16" },
        { name: "Condos", value: 20, color: "#4f46e5" },
        { name: "Townhouses", value: 10, color: "#0ea5e9" },
    ];

    const tableColumns = [
        { key: "property", label: "Property" },
        { key: "tenant", label: "Tenant" },
        { key: "date", label: "Date" },
        { key: "status", label: "Status" },
        { key: "amount", label: "Amount" },
    ];

    const tableData = [
        { property: "Seaside Villa", tenant: "John Doe", date: "Oct 25, 2026", status: "confirmed", amount: "$1,500" },
        { property: "Mountain Retreat", tenant: "Jane Smith", date: "Oct 24, 2026", status: "pending", amount: "$800" },
        { property: "Urban Loft", tenant: "Michael Lee", date: "Oct 22, 2026", status: "confirmed", amount: "$1,200" },
        { property: "Cozy Cabin", tenant: "Sarah Connor", date: "Oct 20, 2026", status: "cancelled", amount: "$600" },
        { property: "Luxury Condo", tenant: "David Kim", date: "Oct 19, 2026", status: "confirmed", amount: "$2,000" },
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
