import React from "react";

export default function Logo() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 ring-1 ring-slate-700">
      <span className="absolute left-1 top-1 h-3 w-3 rounded-full bg-primary" />
      <span className="absolute right-1 bottom-1 h-3 w-3 rounded-full bg-secondary" />
      <span className="relative text-sm font-semibold text-white">E</span>
    </div>
  );
}