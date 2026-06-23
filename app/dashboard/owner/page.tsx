'use client';

import React from 'react';
import { useSession } from "@/lib/auth-client";
import { Briefcase, Persons, Thunderbolt, CircleCheck } from '@gravity-ui/icons';
import DashboardStatistic, { StatItem } from '@/components/dashboard/DashboardStatistic';

const OwnerDashboard: React.FC = () => {
    // Better Auth client session type handling
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center font-body text-text">
                <div className="animate-pulse font-medium text-gray-500">
                    Elevating your dashboard...
                </div>
            </div>
        );
    }

    // টাইপসেফ প্রপার্টি ওনার স্ট্যাটস ডাটা array
    const propertyOwnerStats: StatItem[] = [
        { title: "Total Properties", value: "24", icon: Briefcase },
        { title: "Monthly Revenue", value: "$45,280", icon: Persons },
        { title: "Occupancy Rate", value: "92%", icon: Thunderbolt },
        { title: "Maintenance Requests", value: "3", icon: CircleCheck },
    ];

    const user = session?.user;

    return (
        <div className="min-h-screen bg-[#f0f0f0] px-6 py-10 font-body text-text">
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-12 border-b border-gray-200 pb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/80">
                        Overview
                    </span>
                    <h2 className="mt-2 font-heading text-4xl font-semibold tracking-tight text-text md:text-5xl">
                        Welcome back, <span className="italic text-primary">{user?.name || "Esteemed Owner"}</span>
                    </h2>
                </div>

                {/* Statistics Component */}
                <DashboardStatistic statsData={propertyOwnerStats} />
            </div>
        </div>
    );
};

export default OwnerDashboard;
