"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";

export interface DashboardCardProps {
    title: string;
    value: string | number;
    trend: number;
    trendText: string;
    icon: React.ReactNode;
}

export interface ChartData {
    name: string;
    value: number;
}

export interface PieData {
    name: string;
    value: number;
    color: string;
}

export interface TableColumn {
    key: string;
    label: string;
}

interface DashboardOverviewProps {
    title: string;
    cards: DashboardCardProps[];
    areaChartData: ChartData[];
    pieChartData: PieData[];
    tableColumns: TableColumn[];
    tableData: any[];
}

export default function DashboardOverview({
    title,
    cards,
    areaChartData,
    pieChartData,
    tableColumns,
    tableData,
}: DashboardOverviewProps) {
    return (
        <div className="p-6 md:p-10 space-y-8">
            <h1 className="text-[28px] font-bold text-slate-800 tracking-tight">{title}</h1>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-white rounded-[20px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-12 h-12 rounded-[14px] bg-slate-50 text-slate-600">
                                {card.icon}
                            </div>
                            <p className="text-sm font-medium text-slate-500">{card.title}</p>
                        </div>
                        <div className="mt-4 flex items-end justify-between">
                            <h3 className="text-[28px] font-bold text-slate-800 tracking-tight">{card.value}</h3>
                            <div className={`flex items-center gap-1 text-sm font-semibold mb-1 ${card.trend >= 0 ? "text-primary" : "text-amber-500"}`}>
                                {card.trend >= 0 ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                            </div>
                        </div>
                        <p className="mt-3 text-[13px] text-slate-400 font-medium">
                            <span className={card.trend >= 0 ? "text-primary" : "text-amber-500"}>{Math.abs(card.trend)}% {card.trend >= 0 ? 'Increase' : 'Decrease'}</span> from last month
                        </p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Area Chart */}
                <div className="lg:col-span-2 bg-white rounded-[24px] p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-800">Sales Report</h3>
                        <select className="bg-transparent text-sm font-medium text-slate-500 outline-none cursor-pointer">
                            <option>Monthly</option>
                            <option>Weekly</option>
                        </select>
                    </div>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={areaChartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#255f58" stopOpacity={0.15}/>
                                        <stop offset="95%" stopColor="#255f58" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(val) => `${val/1000}k`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ color: '#255f58', fontWeight: 600 }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#255f58" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-800">Most Sales</h3>
                        <select className="bg-transparent text-sm font-medium text-slate-500 outline-none cursor-pointer">
                            <option>This Month</option>
                        </select>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="h-[220px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={0}
                                        outerRadius={90}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4">
                        {pieChartData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="text-[13px] text-slate-500 font-medium truncate">{item.name} {item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Product Sales</h3>
                    <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-[#245b53] text-sm font-semibold rounded-[10px] transition">
                        Add Product
                    </button>
                </div>
                <div className="bg-white rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    {tableColumns.map((col, idx) => (
                                        <th key={idx} className="px-6 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                                            {col.label}
                                        </th>
                                    ))}
                                    <th className="px-6 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-wider text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition">
                                        {tableColumns.map((col, colIdx) => (
                                            <td key={colIdx} className="px-6 py-5 text-[14px] font-medium text-slate-600 whitespace-nowrap">
                                                {row[col.key]}
                                            </td>
                                        ))}
                                        <td className="px-6 py-5 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-3 text-[13px] font-medium text-slate-500">
                                                <button className="hover:text-[#245b53] transition">Edit</button>
                                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                <button className="hover:text-red-500 transition">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
