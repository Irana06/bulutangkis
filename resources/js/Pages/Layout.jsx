import { useState } from "react";

export default function Layout() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-dvw h-dvh bg-gray-200 grid grid-cols-7">
            {/* SideBar */}
            <div className="col-span-1 bg-white">
                <div className="p-2 h-full w-full flex flex-col bg-white border-r border-r-gray-200">
                    {/* Logo */}
                    <a href="#">
                        <div className="flex justify-center lg:justify-start items-center gap-2 py-4 px-0 md:px-2 lg:px-4 cursor-pointer">
                            <img
                                src="https://smkmuhpakem.sch.id/wp-content/uploads/2023/02/logo.png"
                                width={50}
                                height={50}
                                alt="logo"
                            />
                            <span className="font-semibold text-2xl">
                                Bulutangkis
                            </span>
                        </div>
                    </a>

                    <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden flex-grow pt-2 justify-between">
                        <div className="flex flex-col space-y-1 mx-1 lg:mt-1">
                            <div className="px-5 pt-4 hidden lg:block border-t border-gray-300">
                                <div className="flex flex-row items-center">
                                    <div className="text-xs font-bold tracking-wide text-gray-600 py-2">
                                        Menu
                                    </div>
                                </div>
                            </div>
                            <a
                                className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold text-gray-500 hover:text-indigo-400 duration-300 cursor-pointer"
                                href="/atlet"
                            >
                                <span className="inline-flex justify-center items-center ml-3.5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </span>
                                <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
                                    Peserta
                                </span>
                            </a>

                            {/* Dropdown Tanding */}
                            <div>
                                <button
                                    className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold text-gray-500 hover:text-indigo-400 duration-300 cursor-pointer"
                                    onClick={toggleDropdown}
                                >
                                    <span className="inline-flex justify-center items-center ml-3.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="lucide lucide-land-plot"
                                        >
                                            <path d="m12 8 6-3-6-3v10" />
                                            <path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12" />
                                            <path d="m6.49 12.85 11.02 6.3" />
                                            <path d="M17.51 12.85 6.5 19.15" />
                                        </svg>
                                    </span>
                                    <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize lg:block">
                                        Tanding
                                    </span>
                                </button>

                                <div
                                    className={`${
                                        isOpen ? "max-h-screen" : "max-h-0"
                                    } overflow-hidden transition-all duration-300`}
                                >
                                    <ul className="pl-4">
                                        <li>
                                            <a
                                                href="/tanding/tunggal"
                                                className="flex items-center gap-2 p-2 rounded-md text-gray-500 hover:text-indigo-400"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-4 h-4"
                                                >
                                                    <path d="m9 18 6-6-6-6" />
                                                </svg>
                                                Kategori Tunggal
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/tanding/ganda"
                                                className="flex items-center gap-2 p-2 rounded-md text-gray-500 hover:text-indigo-400"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-4 h-4"
                                                >
                                                    <path d="m9 18 6-6-6-6" />
                                                </svg>
                                                Kategori Ganda
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/tanding/campuran"
                                                className="flex items-center gap-2 p-2 rounded-md text-gray-500 hover:text-indigo-400"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-4 h-4"
                                                >
                                                    <path d="m9 18 6-6-6-6" />
                                                </svg>
                                                Kategori Campuran
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <a
                                    className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-gray-500 hover:text-indigo-400 duration-300 cursor-pointer "
                                    href="/atlet"
                                >
                                    <span className="inline-flex justify-center items-center ml-3.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-calendar-check"
                                        >
                                            <path d="M8 2v4" />
                                            <path d="M16 2v4" />
                                            <rect
                                                width="18"
                                                height="18"
                                                x="3"
                                                y="4"
                                                rx="2"
                                            />
                                            <path d="M3 10h18" />
                                            <path d="m9 16 2 2 4-4" />
                                        </svg>
                                    </span>
                                    <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
                                        Jadwal
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="px-1">
                        <a
                            className="flex flex-row items-center  justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5  lg:pr-6 font-semibold text-gray-500 hover:text-indigo-400 duration-300 cursor-pointer "
                            href="/app/settings"
                        >
                            <span className="inline-flex justify-center items-center ml-3.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1.25rem"
                                    height="1.25rem"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2 2 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.62 1.62 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.03 2.03 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361s-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a2 2 0 0 0-.399 1.479c.053.394.287.798.757 1.605s.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2 2 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a2 2 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361s.306-1.064.782-1.36c.324-.203.533-.364.682-.556a2 2 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605s-.704-1.21-1.022-1.453a2.03 2.03 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.62 1.62 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2 2 0 0 0-1.09-1.083"
                                        clip-rule="evenodd"
                                        opacity=".5"
                                    ></path>
                                    <path
                                        fill="currentColor"
                                        d="M15.523 12c0 1.657-1.354 3-3.023 3s-3.023-1.343-3.023-3S10.83 9 12.5 9s3.023 1.343 3.023 3"
                                    ></path>
                                </svg>
                            </span>
                            <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
                                Settings
                            </span>
                        </a>
                        <div className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold cursor-pointer text-red-400 hover:text-red-600 duration-300">
                            <span className="inline-flex justify-center items-center ml-3.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1.25rem"
                                    height="1.25rem"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M15 2h-1c-2.828 0-4.243 0-5.121.879C8 3.757 8 5.172 8 8v8c0 2.828 0 4.243.879 5.121C9.757 22 11.172 22 14 22h1c2.828 0 4.243 0 5.121-.879C21 20.243 21 18.828 21 16V8c0-2.828 0-4.243-.879-5.121C19.243 2 17.828 2 15 2"
                                        opacity=".6"
                                    ></path>
                                    <path
                                        fill="currentColor"
                                        d="M8 8c0-1.538 0-2.657.141-3.5H8c-2.357 0-3.536 0-4.268.732S3 7.143 3 9.5v5c0 2.357 0 3.535.732 4.268S5.643 19.5 8 19.5h.141C8 18.657 8 17.538 8 16z"
                                        opacity=".4"
                                    ></path>
                                    <path
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        d="M4.47 11.47a.75.75 0 0 0 0 1.06l2 2a.75.75 0 0 0 1.06-1.06l-.72-.72H14a.75.75 0 0 0 0-1.5H6.81l.72-.72a.75.75 0 1 0-1.06-1.06z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
                                Logout
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* View Content */}
            <div className="col-span-6 bg-white"></div>
        </div>
    );
}
