"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { OwnerProperty } from "@/lib/api/owner";
import { deletePropertyAction, updatePropertyStatusAction } from "@/lib/action/owner";

const statusColorMap: Record<string, { badge: string; dot: string }> = {
  pending: { badge: "bg-amber-100 text-amber-700 border border-amber-200", dot: "bg-amber-500" },
  approved: { badge: "bg-emerald-100 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500" },
  rejected: { badge: "bg-red-100 text-red-700 border border-red-200", dot: "bg-red-500" },
  active: { badge: "bg-emerald-100 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500" },
  rented: { badge: "bg-blue-100 text-blue-700 border border-blue-200", dot: "bg-blue-500" },
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
      setProperties((prev) => prev.filter((property) => property._id !== id));
      setLoadingId(null);
      router.refresh();
    });
  };

  const handleStatusChange = (id: string, status: string) => {
    setLoadingId(id);
    startTransition(async () => {
      await updatePropertyStatusAction(id, status);
      setProperties((prev) => prev.map((property) => (property._id === id ? { ...property, status } : property)));
      setLoadingId(null);
    });
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-gray-900">My Properties</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your property listings, status, and admin feedback.</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          {properties.length} Listing{properties.length !== 1 ? "s" : ""}
        </span>
      </div>

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
                    <p className="mb-3 text-4xl">Home</p>
                    <p className="font-semibold text-gray-600">No properties found</p>
                    <p className="mt-1 text-sm">Start by posting your first property listing.</p>
                  </td>
                </tr>
              ) : (
                properties.map((property) => {
                  const statusKey = property.status?.toLowerCase() || "pending";
                  const colors = statusColorMap[statusKey] || {
                    badge: "bg-gray-100 text-gray-600 border border-gray-200",
                    dot: "bg-gray-400",
                  };
                  const isLoading = loadingId === property._id && isPending;

                  return (
                    <tr
                      key={property._id}
                      className={`transition-colors hover:bg-gray-50/50 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-lg font-bold text-primary">
                            {property.title?.charAt(0) || "P"}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-gray-900">{property.title}</p>
                              {property.isFeatured ? (
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                                  Premium
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-0.5 line-clamp-1 text-xs text-gray-400">{property.location}</p>
                            <p className="mt-0.5 text-xs text-gray-400">
                              {property.bedrooms} bed / {property.bathrooms} bath / {property.size} m2
                            </p>
                            {property.status?.toLowerCase() === "rejected" && property.rejectionFeedback ? (
                              <p className="mt-2 max-w-md rounded-xl bg-red-50 px-3 py-2 text-xs font-medium leading-5 text-red-600">
                                Admin feedback: {property.rejectionFeedback}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm capitalize text-gray-600">{property.propertyType}</span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-gray-900">{formatPrice(property.price)}</p>
                        <p className="text-xs capitalize italic text-gray-400">/{property.rentType}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${colors.badge}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                          {property.status || "pending"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <select
                            className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
                            value={property.status?.toLowerCase() || "pending"}
                            onChange={(event) => handleStatusChange(property._id, event.target.value)}
                            disabled={isLoading}
                            aria-label="Update status"
                          >
                            {STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={() => handleDelete(property._id)}
                            disabled={isLoading}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-all hover:border-red-200 hover:bg-red-100 disabled:opacity-50"
                            aria-label="Delete property"
                          >
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
