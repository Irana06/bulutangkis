import Sidebar, { SidebarItem } from "@/Pages/Layouts/SidebarItem";
import {
    CalendarCheck,
    Dot,
    Headset,
    LayoutDashboard,
    UserRoundCog,
    Users,
    Wallet,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import ListPeserta from "@/Pages/Src/Peserta/ListPeserta";
import CreateEditPeserta from "@/Pages/Src/Peserta/CreateEditPeserta";
import DetailPeserta from "@/Pages/Src/Peserta/DetailPeserta";
import Home from "@/Pages/Home";
import ListTanding from "@/Pages/Src/Tanding/ListTanding";
import DetailTanding from "@/Pages/Src/Tanding/DetailTanding";
import CreateEditTanding from "@/Pages/Src/Tanding/CreateEditTanding";
import ListTim from "@/Pages/Src/Tim/ListTim";
import CreateEditTim from "@/Pages/Src/Tim/CreateEditTim";
import ListPembayaran from "@/Pages/Src/Pembayaran/ListPembayaran";
import DetailPembayaran from "@/Pages/Src/Pembayaran/DetailPembayaran";

// Mapping string ke komponen

export default function Dashboard({ auth, child, childText }) {
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
            case "Tim/ListTim":
                return <ListTim />;
            case "Tim/CreateEditTim":
                return <CreateEditTim />;
            case "Tanding/ListTanding":
                return <ListTanding childText={childText} />;
            case "Tanding/DetailTanding":
                return <DetailTanding />;
            case "Tanding/CreateEditTanding":
                return <CreateEditTanding />;
            case "Pembayaran/ListPembayaran":
                return <ListPembayaran />;
            case "Pembayaran/DetailPembayaran":
                return <DetailPembayaran />;
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
                <Link href="/tim">
                    <SidebarItem icon={<UserRoundCog size={20} />} text="Tim" />
                </Link>
                <SidebarItem
                    icon={<LayoutDashboard size={20} />}
                    text="Tanding"
                    child={[
                        {
                            icon: <Dot size={20} />,
                            text: "Tanding",
                            link: "/tanding",
                        },
                        {
                            icon: <Dot size={20} />,
                            text: "Tunggal",
                            link: "/tanding?tunggal=true",
                        },
                        {
                            icon: <Dot size={20} />,
                            text: "Ganda",
                            link: "/tanding?ganda=true",
                        },
                    ]}
                />
                <Link href="/pembayaran">
                    <SidebarItem
                        icon={<Wallet size={20} />}
                        text="Pembayaran"
                    />
                </Link>
                <Link href="/jadwal">
                    <SidebarItem
                        icon={<CalendarCheck size={20} />}
                        text="Live Jadwal"
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
                <div className="mt-4 p-4 relative">
                    {getChildComponent(child) || <p>Loading...</p>}

                    {/* Customer Service Button */}
                    <div className="fixed bottom-4 right-4 flex items-center space-x-2">
                        {/* Chat bubble */}
                        <span className="bg-indigo-800/80 text-white text-sm px-3 py-2 rounded-lg shadow-lg">
                            Butuh bantuan?
                        </span>

                        {/* Customer Service Icon */}
                        <a
                            href="https://wa.me/6285725841667"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center"
                        >
                            <Headset size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
