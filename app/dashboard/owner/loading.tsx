function OwnerLoading() {
  return (
    <div className="min-h-[60vh] animate-pulse rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="h-4 w-32 rounded-full bg-slate-200" />
      <div className="mt-4 h-12 w-2/3 rounded-2xl bg-slate-200" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-32 rounded-[24px] bg-slate-100" />
        ))}
      </div>
      <div className="mt-8 h-72 rounded-[24px] bg-slate-100" />
    </div>
  );
}

export default OwnerLoading;
