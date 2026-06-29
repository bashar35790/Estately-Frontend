"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { OwnerProperty } from "@/lib/api/owner";
import { deletePropertyAction, updatePropertyStatusAction } from "@/lib/action/owner";

const statusColorMap: Record<string, { badge: string; dot: string }> = {
    pending:  { badge: "bg-amber-100 text-amber-700 border border-amber-200",  dot: "bg-amber-500" },
    approved: { badge: "bg-emerald-100 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500" },
    rejected: { badge: "bg-red-100 text-red-700 border border-red-200",        dot: "bg-red-500" },
    active:   { badge: "bg-emerald-100 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500" },
    rented:   { badge: "bg-blue-100 text-blue-700 border border-blue-200",     dot: "bg-blue-500" },
};

const STATUS_OPTIONS = ["pending", "approved", "rejected"];

interface Props {
    initialProperties: OwnerProperty[];
}

export default function OwnerPropertiesPage({ initialProperties }: Props) {
    const [properties, setProperties] = useState<OwnerProperty[]>(initialProperties);
    const [isPending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = (id: string) => {
        if (!confirm("Are you sure you want to delete this property? This cannot be undone.")) return;
        setLoadingId(id);
        startTransition(async () => {
            await deletePropertyAction(id);
            setProperties((prev) => prev.filter((p) => p._id !== id));
            setLoadingId(null);
            router.refresh();
        });
    };

    const handleStatusChange = (id: string, status: string) => {
        setLoadingId(id);
        startTransition(async () => {
            await updatePropertyStatusAction(id, status);
            setProperties((prev) =>
                prev.map((p) => (p._id === id ? { ...p, status } : p))
            );
            setLoadingId(null);
        });
    };

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight font-heading text-gray-900">My Properties</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage your property listings — update status or delete.
                    </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {properties.length} Listing{properties.length !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500">Property</th>
                                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500">Type</th>
                                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500">Price</th>
                                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-gray-500">Status</th>
                                <th className="px-4 py-4 text-right text-[11px] font-bold uppercase tracking-widest text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {properties.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center text-gray-400">
                                        <p className="text-4xl mb-3">🏠</p>
                                        <p className="font-semibold text-gray-600">No properties found</p>
                                        <p className="text-sm mt-1">Start by posting your first property listing.</p>
                                    </td>
                                </tr>
                            ) : (
                                properties.map((property) => {
                                    const statusKey = property.status?.toLowerCase() || "pending";
                                    const colors = statusColorMap[statusKey] || { badge: "bg-gray-100 text-gray-600 border border-gray-200", dot: "bg-gray-400" };
                                    const isLoading = loadingId === property._id && isPending;

                                    return (
                                        <tr
                                            key={property._id}
                                            className={`transition-colors hover:bg-gray-50/50 ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
                                        >
                                            {/* Property Details */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg font-bold text-primary">
                                                        {property.title?.charAt(0) || "P"}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-semibold text-gray-900 text-sm">{property.title}</p>
                                                            {property.isFeatured && (
                                                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                                                                    Premium
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{property.location}</p>
                                                        <p className="text-xs text-gray-400 mt-0.5">
                                                            {property.bedrooms} bed · {property.bathrooms} bath · {property.size} m²
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Type */}
                                            <td className="px-4 py-4">
                                                <span className="text-sm text-gray-600 capitalize">{property.propertyType}</span>
                                            </td>

                                            {/* Price */}
                                            <td className="px-4 py-4">
                                                <p className="font-semibold text-gray-900 text-sm">{formatPrice(property.price)}</p>
                                                <p className="text-xs text-gray-400 capitalize italic">/{property.rentType}</p>
                                            </td>

                                            {/* Status Dropdown */}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${colors.badge}`}>
                                                        <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                                                        {property.status || "pending"}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* Status change select */}
                                                    <select
                                                        className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                                                        value={property.status?.toLowerCase() || "pending"}
                                                        onChange={(e) => handleStatusChange(property._id, e.target.value)}
                                                        disabled={isLoading}
                                                        aria-label="Update status"
                                                    >
                                                        {STATUS_OPTIONS.map((s) => (
                                                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                                        ))}
                                                    </select>

                                                    {/* Delete button */}
                                                    <button
                                                        onClick={() => handleDelete(property._id)}
                                                        disabled={isLoading}
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-all hover:bg-red-100 hover:border-red-200 disabled:opacity-50"
                                                        aria-label="Delete property"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        Delete
                                                    </button>
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
