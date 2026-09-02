"use client";

import { authClient } from "@/lib/auth-client";
import { Search, Bell, ChevronDown } from "lucide-react";
import Image from "next/image";

export function DashboardHeader() {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    
    // @ts-ignore
    const userRole = user?.userRole || "Admin Manager";

    return (
        <header className="hidden md:flex h-20 shrink-0 items-center justify-between bg-[#f8faf9] px-8 lg:px-10">
            <div className="flex w-full max-w-sm items-center gap-3 rounded-[14px] bg-[#f0f3f2] px-4 py-2.5 transition focus-within:bg-white focus-within:shadow-sm focus-within:ring-1 focus-within:ring-primary/20">
                <Search size={18} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent text-[13px] font-medium text-slate-700 outline-none placeholder:text-gray-400"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-gray-500 hover:text-slate-700 transition">
                    <Bell size={20} />
                    <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary ring-2 ring-[#f8faf9]"></span>
                </button>

                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm transition group-hover:scale-105">
                        <Image 
                            src={user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"} 
                            alt="User Profile" 
                            width={36}
                            height={36}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="hidden lg:block text-left mr-1">
                        <p className="text-[13px] font-bold text-slate-800 leading-tight">{user?.name || "Marcus Robb"}</p>
                        <p className="text-[11px] font-medium text-gray-500 capitalize leading-tight mt-0.5">{userRole}</p>
                    </div>
                    <ChevronDown size={14} className="text-gray-400 hidden lg:block transition group-hover:text-slate-600" />
                </div>
            </div>
        </header>
    );
}
