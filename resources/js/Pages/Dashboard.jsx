import Sidebar, { SidebarItem } from "@/Pages/Layouts/SidebarItem";
import { LayoutDashboard, Users } from "lucide-react";

export default function Dashboard({ auth, children }) {
    return (
        <main className="app flex">
            <Sidebar userData={auth} className="w-64">
                <hr className="my-3 py-1" />
                <SidebarItem icon={<Users size={20} />} text="Peserta" />
                <SidebarItem
                    icon={<LayoutDashboard size={20} />}
                    text="Dashboard"
                />
                <SidebarItem
                    icon={<LayoutDashboard size={20} />}
                    text="Dashboard"
                />
                <SidebarItem
                    icon={<LayoutDashboard size={20} />}
                    text="Dashboard"
                />
            </Sidebar>
            <div className="flex-grow">
                {/* Header Sidebar */}
                <div className="flex flex-col text-center">
                    <div className="text-left p-6 py-5 border-b border-gray-300">
                        <span className="text-2xl font-extrabold text-green-400 tracking-wide drop-shadow-lg">
                            Tournament
                        </span>
                        <span className=" p-3 text-2xl text-gray-400 font-medium tracking-wide drop-shadow-lg">
                            Bulutangkis 2025
                        </span>
                    </div>
                </div>
                {/* Content */}
                <div className="p-12">{children}</div>
            </div>
        </main>
    );
}
