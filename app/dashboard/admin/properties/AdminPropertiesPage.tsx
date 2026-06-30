"use client";

import { useState, useTransition } from "react";
import type { AdminProperty } from "@/lib/api/admin";
import {
  deleteAdminPropertyAction,
  updateAdminPropertyAction,
  updateAdminPropertyStatusAction,
} from "@/lib/action/admin";

interface Props {
  initialProperties: AdminProperty[];
}

type EditFormState = Pick<
  AdminProperty,
  "title" | "location" | "propertyType" | "price" | "rentType" | "bedrooms" | "bathrooms" | "size"
>;

const statusClasses: Record<string, string> = {
  approved: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-rose-100 text-rose-700",
  active: "bg-emerald-100 text-emerald-700",
  rented: "bg-sky-100 text-sky-700",
};

function AdminPropertiesPage({ initialProperties }: Props) {
  const [properties, setProperties] = useState(initialProperties);
  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [rejectingProperty, setRejectingProperty] = useState<AdminProperty | null>(null);
  const [editingProperty, setEditingProperty] = useState<AdminProperty | null>(null);
  const [rejectionFeedback, setRejectionFeedback] = useState("");
  const [editForm, setEditForm] = useState<EditFormState | null>(null);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount || 0);

  const updateLocalProperty = (propertyId: string, patch: Partial<AdminProperty>) => {
    setProperties((prev) => prev.map((item) => (item._id === propertyId ? { ...item, ...patch } : item)));
  };

  const handleApprove = (propertyId: string) => {
    setLoadingId(propertyId);
    startTransition(async () => {
      await updateAdminPropertyStatusAction(propertyId, "approved");
      updateLocalProperty(propertyId, { status: "approved", rejectionFeedback: "" });
      setLoadingId(null);
    });
  };

  const openRejectModal = (property: AdminProperty) => {
    setRejectingProperty(property);
    setRejectionFeedback(property.rejectionFeedback || "");
  };

  const submitRejection = () => {
    if (!rejectingProperty || !rejectionFeedback.trim()) return;
    const propertyId = rejectingProperty._id;
    setLoadingId(propertyId);
    startTransition(async () => {
      await updateAdminPropertyStatusAction(propertyId, "rejected", rejectionFeedback.trim());
      updateLocalProperty(propertyId, {
        status: "rejected",
        rejectionFeedback: rejectionFeedback.trim(),
      });
      setRejectingProperty(null);
      setRejectionFeedback("");
      setLoadingId(null);
    });
  };

  const handleDelete = (propertyId: string) => {
    if (!confirm("Delete this property permanently?")) return;
    setLoadingId(propertyId);
    startTransition(async () => {
      await deleteAdminPropertyAction(propertyId);
      setProperties((prev) => prev.filter((item) => item._id !== propertyId));
      setLoadingId(null);
    });
  };

  const openEditModal = (property: AdminProperty) => {
    setEditingProperty(property);
    setEditForm({
      title: property.title,
      location: property.location,
      propertyType: property.propertyType,
      price: property.price,
      rentType: property.rentType,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      size: property.size,
    });
  };

  const submitEdit = () => {
    if (!editingProperty || !editForm) return;
    const propertyId = editingProperty._id;
    setLoadingId(propertyId);
    startTransition(async () => {
      await updateAdminPropertyAction(propertyId, editForm);
      updateLocalProperty(propertyId, editForm);
      setEditingProperty(null);
      setEditForm(null);
      setLoadingId(null);
    });
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">All Properties</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Moderate submitted property listings.</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Approve, reject with required feedback, update listing details, or delete unsuitable properties.
        </p>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Property</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Owner</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Details</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Status</th>
                <th className="px-4 py-4 text-right text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                    No properties available.
                  </td>
                </tr>
              ) : (
                properties.map((property) => {
                  const isLoading = isPending && loadingId === property._id;
                  return (
                    <tr key={property._id} className={isLoading ? "opacity-60" : ""}>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                            {property.title?.charAt(0) || "P"}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{property.title}</p>
                            <p className="text-sm text-slate-500">{property.location}</p>
                            {property.rejectionFeedback ? (
                              <p className="mt-1 max-w-md text-xs leading-5 text-rose-600">
                                Feedback: {property.rejectionFeedback}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-slate-800">{property.ownerName}</p>
                        <p className="text-xs text-slate-500">{property.ownerEmail}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-slate-700 capitalize">
                          {property.propertyType} · {property.bedrooms} bed · {property.bathrooms} bath
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {formatPrice(property.price)} <span className="font-normal text-slate-500">/{property.rentType}</span>
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClasses[property.status] || statusClasses.pending}`}>
                          {property.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            onClick={() => handleApprove(property._id)}
                            disabled={isLoading}
                            className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => openRejectModal(property)}
                            disabled={isLoading}
                            className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => openEditModal(property)}
                            disabled={isLoading}
                            className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 disabled:opacity-50"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(property._id)}
                            disabled={isLoading}
                            className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
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

      {rejectingProperty ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
          <div className="w-full max-w-xl rounded-[28px] bg-white p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-slate-900">Reject property</h2>
            <p className="mt-2 text-sm text-slate-600">
              Owners will see this feedback, so add a clear reason for rejection.
            </p>
            <textarea
              value={rejectionFeedback}
              onChange={(event) => setRejectionFeedback(event.target.value)}
              rows={5}
              className="mt-5 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-secondary"
              placeholder="Explain what needs to be fixed before this property can be approved."
            />
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => {
                  setRejectingProperty(null);
                  setRejectionFeedback("");
                }}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={submitRejection}
                disabled={!rejectionFeedback.trim()}
                className="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Save rejection
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {editingProperty && editForm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
          <div className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-slate-900">Update property</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input
                value={editForm.title}
                onChange={(event) => setEditForm({ ...editForm, title: event.target.value })}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-secondary"
                placeholder="Title"
              />
              <input
                value={editForm.location}
                onChange={(event) => setEditForm({ ...editForm, location: event.target.value })}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-secondary"
                placeholder="Location"
              />
              <input
                value={editForm.propertyType}
                onChange={(event) => setEditForm({ ...editForm, propertyType: event.target.value })}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-secondary"
                placeholder="Property type"
              />
              <input
                value={editForm.rentType}
                onChange={(event) => setEditForm({ ...editForm, rentType: event.target.value })}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-secondary"
                placeholder="Rent type"
              />
              <input
                type="number"
                value={editForm.price}
                onChange={(event) => setEditForm({ ...editForm, price: Number(event.target.value) })}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-secondary"
                placeholder="Price"
              />
              <input
                type="number"
                value={editForm.size}
                onChange={(event) => setEditForm({ ...editForm, size: Number(event.target.value) })}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-secondary"
                placeholder="Size"
              />
              <input
                type="number"
                value={editForm.bedrooms}
                onChange={(event) => setEditForm({ ...editForm, bedrooms: Number(event.target.value) })}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-secondary"
                placeholder="Bedrooms"
              />
              <input
                type="number"
                value={editForm.bathrooms}
                onChange={(event) => setEditForm({ ...editForm, bathrooms: Number(event.target.value) })}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-secondary"
                placeholder="Bathrooms"
              />
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => {
                  setEditingProperty(null);
                  setEditForm(null);
                }}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={submitEdit}
                className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AdminPropertiesPage;
