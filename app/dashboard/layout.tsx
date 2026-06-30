import { DashboardSidebar } from "../components/dashboard/Sidebar";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  
    return (
        <>
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                <DashboardSidebar />
                <div className="flex-1">
                    <main className="p-4">{children}</main>
                </div>
            </div>
        </>
    );
}

export default DashboardLayout;
