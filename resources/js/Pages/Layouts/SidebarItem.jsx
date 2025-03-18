import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import avatar from "@/Storage/Img/avatardefault.png";
import logo from "@/Storage/Img/logo.png";

const SidebarContext = createContext();

export default function Sidebar({ children, userData }) {
    const [expanded, setExpanded] = useState(true);

    // Handle screen size changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setExpanded(false);
            } else {
                setExpanded(true);
            }
        };

        // Set initial state based on screen size
        handleResize();

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const navsFooter = [
        {
            href: "/logout",
            name: "Logout",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-red-400"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                </svg>
            ),
        },
    ];

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <a href="/home" className="flex items-center gap-2">
                        {/* Logo */}
                        <img
                            src={logo}
                            className={`overflow-hidden transition-all py-4 ${
                                expanded ? "w-12" : "w-0"
                            }`}
                            alt="logo"
                        />

                        {/* Judul Sidebar */}
                        <span
                            className={`overflow-hidden transition-all text-lg font-extrabold text-green-400 tracking-wide drop-shadow-lg ${
                                expanded ? "block" : "hidden"
                            }`}
                        >
                            LPO PDM Sleman
                        </span>
                    </a>

                    {/* Tombol Toggle */}
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-white transition duration-300"
                    >
                        {expanded ? (
                            <ChevronFirst size={18} />
                        ) : (
                            <ChevronLast size={18} />
                        )}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                <ul className="px-4 pb-4 text-sm font-medium">
                    {navsFooter.map((item, idx) => (
                        <li key={idx} className="relative group">
                            {item.name === "Logout" ? (
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="mt-24 relative flex w-full items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group text-red-400 hover:bg-red-50"
                                >
                                    {item.icon}
                                    <span
                                        className={`overflow-hidden transition-all ${
                                            expanded ? "w-52 ml-3" : "w-0"
                                        }`}
                                    >
                                        {item.name}
                                    </span>
                                    {!expanded && (
                                        <div
                                            className="absolute left-full rounded-md px-2 py-1 ml-6 bg-red-100 text-red-400 text-sm
                                            invisible opacity-0 -translate-x-3 transition-all
                                            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
                                        >
                                            {item.name}
                                        </div>
                                    )}
                                </Link>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600"
                                >
                                    {item.icon}
                                    <span
                                        className={`overflow-hidden transition-all ${
                                            expanded ? "w-52 ml-3" : "w-0"
                                        }`}
                                    >
                                        {item.name}
                                    </span>
                                    {!expanded && (
                                        <div
                                            className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm
                                        invisible opacity-0 -translate-x-3 transition-all
                                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
                                        >
                                            {item.name}
                                        </div>
                                    )}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="border-t flex p-3">
                    <img
                        src={avatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-md"
                    />
                    <div
                        className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold">
                                {userData.user.name}
                            </h4>
                            <span className="text-xs text-gray-600">
                                {userData.user.email}
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, active, alert, child }) {
    const { expanded } = useContext(SidebarContext);
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        if (child && child.some((item) => url.includes(item.link))) {
            setIsOpen(true);
        }
    }, [url, child]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className="relative">
            <div
                className={`
                    flex items-center py-2 px-3 my-1
                    font-medium rounded-md cursor-pointer
                    transition-colors group
                    ${
                        active
                            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                            : "hover:bg-indigo-50 text-gray-600"
                    }
                `}
                onClick={toggleDropdown}
            >
                {icon}
                <span
                    className={`overflow-hidden transition-all ${
                        expanded ? "w-52 ml-3" : "w-0"
                    }`}
                >
                    {text}
                </span>
                {alert && (
                    <div
                        className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                            expanded ? "" : "top-2"
                        }`}
                    />
                )}
                {child && (
                    <MoreVertical
                        className={`ml-auto transition-transform ${
                            isOpen ? "rotate-90" : ""
                        }`}
                    />
                )}
                {!expanded && (
                    <div
                        className={`absolute left-full rounded-md px-2 py-1 ml-6
                            bg-indigo-100 text-indigo-800 text-sm
                            invisible opacity-20 -translate-x-3 transition-all
                            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                        `}
                    >
                        {text}
                    </div>
                )}
            </div>

            {/* Child menu handling based on expanded state */}
            {child && isOpen ? (
                !expanded ? (
                    // If expanded, show only icons and text on hover
                    <ul className="ml-6 mt-2 space-y-1">
                        {child.map((item, index) => (
                            <li key={index} className="relative group">
                                <Link
                                    href={item.link}
                                    className="flex items-center py-2 px-3 font-medium rounded-md cursor-pointer transition-colors hover:bg-indigo-50 text-gray-600"
                                >
                                    {item.icon}
                                </Link>
                                <div
                                    className={`absolute left-full ml-2 px-2 py-1 text-sm rounded-md bg-indigo-100 text-indigo-800
                                        invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100
                                    `}
                                >
                                    {item.text}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    // If not expanded, show normal child menu
                    <ul className="ml-6 mt-2 space-y-1">
                        {child.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.link}
                                    className="flex items-center py-2 px-3 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600"
                                >
                                    {item.icon}
                                    <span className="ml-3">{item.text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )
            ) : null}
        </li>
    );
}
