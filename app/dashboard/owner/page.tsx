'use client';

import React from 'react';
import { useSession } from "@/lib/auth-client";
import { Briefcase, Thunderbolt, CircleCheck } from '@gravity-ui/icons';
import DashboardStatistic, { StatItem } from '@/components/dashboard/DashboardStatistic';
import { getOwnerStats } from '@/lib/api/owner';
import { useQuery } from '@tanstack/react-query';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface OwnerStats {
  totalEarnings: number;
  totalProperties: number;
  totalBookings: number;
  monthlyEarnings: { name: string; total: number }[];
}

const DEFAULT_STATS: OwnerStats = {
  totalEarnings: 0,
  totalProperties: 0,
  totalBookings: 0,
  monthlyEarnings: [],
};

const OwnerDashboard: React.FC = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const { data: stats = DEFAULT_STATS } = useQuery({
    queryKey: ["ownerStats", user?.id],
    queryFn: () => getOwnerStats(user!.id),
    enabled: !!user?.id,
  });

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center font-body text-text">
        <div className="animate-pulse font-medium text-gray-500">
          Elevating your dashboard...
        </div>
      </div>
    );
  }

  const propertyOwnerStats: StatItem[] = [
    { title: "Total Earnings", value: `$${stats.totalEarnings.toLocaleString()}`, icon: Thunderbolt },
    { title: "Total Properties", value: stats.totalProperties.toString(), icon: Briefcase },
    { title: "Total Bookings", value: stats.totalBookings.toString(), icon: CircleCheck },
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f0] px-6 py-10 font-body text-text">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 border-b border-gray-200 pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-primary/80">
            Overview
          </span>
          <h2 className="mt-2 font-heading text-4xl font-semibold tracking-tight text-text md:text-5xl">
            Welcome back, <span className="italic text-primary">{user?.name || "Esteemed Owner"}</span>
          </h2>
        </div>

        <DashboardStatistic statsData={propertyOwnerStats} />

        <div className="mt-12 rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-6 font-heading text-xl font-semibold text-text">
            Monthly Earnings
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={stats.monthlyEarnings}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickFormatter={(value: number) => `$${value}`}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value: any) => {
                    const numValue = typeof value === 'number' ? value : Number(value) || 0;
                    return [`$${numValue.toLocaleString()}`, 'Earnings'];
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line
                  type="monotone"
                  dataKey="total"
                  name="Earnings"
                  stroke="#A3CF16"
                  strokeWidth={3}
                  dot={{ fill: '#A3CF16', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
