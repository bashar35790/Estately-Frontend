"use client";

import { useState, useTransition } from "react";
import type { AdminUser } from "@/lib/api/admin";
import { updateUserRoleAction } from "@/lib/action/admin";

const roleStyles: Record<string, string> = {
  admin: "bg-slate-950 text-white",
  owner: "bg-secondary/20 text-[#5d7b00]",
  tenant: "bg-slate-100 text-slate-700",
};

const ROLE_OPTIONS = ["tenant", "owner", "admin"];

interface Props {
  initialUsers: AdminUser[];
}

function AdminUsersPage({ initialUsers }: Props) {
  const [users, setUsers] = useState(initialUsers);
  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleRoleChange = (userId: string, userRole: string) => {
    setLoadingId(userId);
    startTransition(async () => {
      await updateUserRoleAction(userId, userRole);
      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, userRole: userRole as AdminUser["userRole"] } : user)));
      setLoadingId(null);
    });
  };

  const formatDate = (value?: string) =>
    value
      ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "-";

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">All Users</p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Manage every account from one table.</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Update user roles for tenants, owners, and admins while keeping the same clean dashboard language as the rest of the app.
            </p>
          </div>
          <span className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
            {users.length} users
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">User</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Email</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Role</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Plan</th>
                <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Joined</th>
                <th className="px-4 py-4 text-right text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => {
                  const isLoading = isPending && loadingId === user.id;
                  return (
                    <tr key={user._id} className={isLoading ? "opacity-60" : ""}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                            {user.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{user.name || "Unnamed User"}</p>
                            <p className="text-xs text-slate-500">ID: {user.id?.slice(-8) || "-"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">{user.email}</td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${roleStyles[user.userRole] || roleStyles.tenant}`}>
                          {user.userRole}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm capitalize text-slate-600">{user.plan || "free"}</td>
                      <td className="px-4 py-4 text-sm text-slate-600">{formatDate(user.createdAt)}</td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end">
                          <select
                            aria-label="Change user role"
                            value={user.userRole}
                            disabled={isLoading}
                            onChange={(event) => handleRoleChange(user.id, event.target.value)}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-secondary"
                          >
                            {ROLE_OPTIONS.map((role) => (
                              <option key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </option>
                            ))}
                          </select>
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

export default AdminUsersPage;
