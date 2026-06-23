import { DashboardSidebar } from "../components/dashboard/Sidebar";
import { Navbar } from "../components/navbar/Navbar";


function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex min-h-screen bg-gray-100">
                <DashboardSidebar />
                <div className="flex-1">
                    <main className="p-4">{children}</main>
                </div>
            </div>
        </>
    );
}

export default DashboardLayout;