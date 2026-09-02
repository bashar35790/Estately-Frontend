import { DashboardSidebar } from "../components/dashboard/Sidebar";
import { DashboardHeader } from "../components/dashboard/Header";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#f8faf9]">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}

export default DashboardLayout;
