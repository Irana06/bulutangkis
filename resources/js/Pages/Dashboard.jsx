import Sidebar, { SidebarItem } from "@/Pages/Layouts/SidebarItem";
import { LayoutDashboard, Users } from "lucide-react";
import { Link } from "@inertiajs/react";
import ListPeserta from "@/Pages/Src/Peserta/ListPeserta";
import CreateEditPeserta from "@/Pages/Src/Peserta/CreateEditPeserta";

// Mapping string ke komponen
const getChildComponent = (child) => {
    switch (child) {
        case "Peserta/ListPeserta":
            return <ListPeserta />;
        case "Peserta/CreateEditPeserta":
            return <CreateEditPeserta />;
        default:
            return null;
    }
};

export default function Dashboard({ auth, child }) {
    return (
        <main className="app flex">
            <Sidebar userData={auth} className="w-64">
                <hr className="my-3 py-1" />
                <Link href="/peserta">
                    <SidebarItem icon={<Users size={20} />} text="Peserta" />
                </Link>
                <Link href="/tanding">
                    <SidebarItem
                        icon={<LayoutDashboard size={20} />}
                        text="Tanding"
                    />
                </Link>
            </Sidebar>
            <div className="flex-grow">
                <div className="flex flex-col text-center">
                    <div className="text-left p-6 py-5 border-b border-gray-300">
                        <span className="text-2xl font-extrabold text-green-400 tracking-wide drop-shadow-lg">
                            Tournament
                        </span>
                        <span className="p-3 text-2xl text-gray-400 font-medium tracking-wide drop-shadow-lg">
                            Bulutangkis 2025
                        </span>
                    </div>
                </div>
                {/* Content */}
                <div className="mt-4">
                    {getChildComponent(child) || <p>Loading...</p>}
                </div>
            </div>
        </main>
    );
}
