import Sidebar, { SidebarItem } from "@/Pages/Layouts/SidebarItem";
import { LayoutDashboard, Users } from "lucide-react";
import { Link } from "@inertiajs/react";
import ListPeserta from "@/Pages/Src/Peserta/ListPeserta";
import CreateEditPeserta from "@/Pages/Src/Peserta/CreateEditPeserta";
import DetailPeserta from "./Src/Peserta/DetailPeserta";
import Home from "./Home";

// Mapping string ke komponen

export default function Dashboard({ auth, child }) {
    const getChildComponent = (child) => {
        switch (child) {
            case "Peserta/ListPeserta":
                return <ListPeserta />;
            case "Peserta/CreateEditPeserta":
                return <CreateEditPeserta />;
            case "Peserta/DetailPeserta":
                return <DetailPeserta />;
            case "Home":
                return <Home userData={auth} />;
            default:
                return null;
        }
    };
    return (
        <main className="app flex h-screen overflow-hidden">
            <Sidebar userData={auth} className="w-64 fixed h-full">
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
            <div className="flex-grow overflow-auto">
                <div className="sticky top-0 bg-white z-10">
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
                </div>
                {/* Content */}
                <div className="mt-4 p-4">
                    {getChildComponent(child) || <p>Loading...</p>}
                </div>
            </div>
        </main>
    );
}
