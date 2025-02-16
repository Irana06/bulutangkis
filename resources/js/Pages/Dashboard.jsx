import Sidebar, { SidebarItem } from "@/Pages/Layouts/SidebarItem";
import { LayoutDashboard, Users } from "lucide-react";

export default function Dashboard({ auth, children }) {
    console.log(auth);
    return (
        <main className="app flex">
            <Sidebar userData={auth} className="w-64">
                <hr className="my-3 py-1"/>
                <SidebarItem icon={<Users size={20} />} text="Peserta"/>
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
            <div className="flex-grow">{children}</div>
        </main>
    );
}
