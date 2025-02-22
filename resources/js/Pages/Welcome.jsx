import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import logo from "@/Storage/Img/logo.png";
import background from "@/Storage/Img/bg2.avif";

export default function Welcome() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Fungsi untuk menutup menu dropdown mobile saat collapse navbar ditekan
    const handleCollapseToggle = () => {
        setIsCollapsed(!isCollapsed);
        if (isOpen) {
            setIsOpen(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen gap-y-4">
            <header
                className={`fixed inset-x-0 top-4 z-30 mx-auto w-full max-w-screen-lg border border-gray-100 bg-white/80 shadow-lg backdrop-blur-lg transition-all duration-500 ease-in-out py-2 ${
                    isCollapsed
                        ? "rounded-b-3xl h-12 w-1/3 opacity-90"
                        : "rounded-3xl h-20 w-4/5 opacity-100"
                }`}
                style={{
                    transform: isCollapsed
                        ? "translateY(-70%)"
                        : "translateY(0)",
                }}
            >
                <div
                    className={`px-6 py-2 flex items-center justify-between transition-all duration-500 ${
                        isCollapsed
                            ? "opacity-0 scale-90 overflow-hidden"
                            : "opacity-100 scale-100"
                    }`}
                >
                    {/* Logo */}
                    <div className="flex shrink-0">
                        <a
                            aria-current="page"
                            className="flex items-center"
                            href="/"
                        >
                            <img
                                className={`transition-all duration-300 ${
                                    isCollapsed
                                        ? "h-0 opacity-0"
                                        : "h-12 w-auto opacity-100"
                                }`}
                                src={logo}
                                alt="logo"
                            />
                            <span className="ml-2 font-extrabold text-2xl  text-green-500 transition-colors">LPO PDM Sleman</span>
                        </a>
                    </div>

                    {/* Tombol Menu (Mobile) */}
                    <button
                        className="md:hidden p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>

                    {/* Menu Utama (Desktop) */}
                    <div
                        className={`hidden md:flex md:items-center md:gap-5 transition-all duration-300 ${
                            isCollapsed
                                ? "opacity-0 scale-90 overflow-hidden"
                                : "opacity-100 scale-100"
                        }`}
                    >
                        <a
                            className="rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100"
                            href="/home"
                        >
                            Home
                        </a>
                        <a
                            className="rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100"
                            href="/cek-data"
                        >
                            Cek Data
                        </a>
                    </div>

                    {/* Tombol Login & Registrasi */}
                    <div
                        className={`hidden md:flex items-center gap-3 transition-all duration-300 ${
                            isCollapsed
                                ? "opacity-0 scale-90 overflow-hidden"
                                : "opacity-100 scale-100"
                        }`}
                    >
                        <a
                            className="hidden sm:inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-200"
                            href="/register"
                        >
                            Registrasi
                        </a>
                        <a
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                            href="/login"
                        >
                            Masuk
                        </a>
                    </div>
                </div>

                {/* Tombol Collapse Navbar */}
                <button
                    className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 bg-gray-200 text-gray-900 rounded-full p-1 shadow-md hover:bg-gray-300 transition-all"
                    onClick={handleCollapseToggle} // Menutup atau membuka navbar
                >
                    {isCollapsed ? (
                        <ChevronDown className="h-5 w-5" />
                    ) : (
                        <ChevronUp className="h-5 w-5" />
                    )}
                </button>

                {/* Menu Dropdown (Mobile) */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${
                        isOpen
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                >
                    {isOpen && (
                        <div className="flex flex-col items-center gap-3 bg-white shadow-lg py-4 mt-2 rounded-lg">
                            <a
                                className="block px-4 py-2 text-gray-900 hover:bg-gray-100 w-full text-center"
                                href="/home"
                            >
                                Home
                            </a>
                            <a
                                className="block px-4 py-2 text-gray-900 hover:bg-gray-100 w-full text-center"
                                href="/cek-data"
                            >
                                Cek Data
                            </a>
                            <a
                                className="block px-4 py-2 text-blue-600 font-semibold hover:bg-gray-100 w-full text-center"
                                href="/register"
                            >
                                Registrasi
                            </a>
                            <a
                                className="block px-4 py-2 bg-blue-600 text-white font-semibold rounded-md w-4/5 text-center hover:bg-blue-500"
                                href="/login"
                            >
                                Masuk
                            </a>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-grow min-h-screen relative">
                <div className="flex-1 bg-black text-white flex items-center justify-center pb-6">
                    <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
                        <img
                            src={background}
                            alt="Background Image"
                            className="object-cover object-center w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                    </div>
                    <div className="video-overlay absolute top-0 left-0 w-full flex-1 h-full text-center">
                        <div className="video-content space-y-2 relative z-10 flex flex-col justify-center items-center h-full text-center">
                            <h1 className="text-5xl font-bold leading-tight mb-4">
                                Lorem ipsum dolor sit amet.
                            </h1>
                            <p className="text-lg text-gray-300 mb-8">
                                Molestias assumenda provident doloribus quos
                                officiis.
                            </p>
                            <a
                                href="/register"
                                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                            >
                                Daftar Sekarang!
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <footer class="bg-white/80 py-4 text-center w-full">
                <a
                    href="https://pdmsleman.or.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex flex-col sm:flex-row items-center justify-center mb-3 text-lg sm:text-xl font-semibold text-gray-900"
                >
                    <img
                        src={logo}
                        class="h-10 sm:h-8 mr-0 sm:mr-3"
                        alt="smkmupa"
                    />
                    <span class="text-sm sm:text-base">
                        LPO PDM Sleman
                    </span>
                </a>

                <span class="text-xs sm:text-sm text-gray-600">
                    © 2025 LPO PDM Sleman. All rights reserved.
                </span>
            </footer>
        </div>
    );
}
