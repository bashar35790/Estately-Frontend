"use client";

function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-[28px] border border-rose-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">Admin Error</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">This page could not load.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {error.message || "Something went wrong while loading the admin dashboard."}
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default AdminError;
