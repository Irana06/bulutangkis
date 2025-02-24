import { Menu, X } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function TableItems({
    title = "Data",
    data = [],
    columns = [],
    dropdownOpenIndex,
    setDropdownOpenIndex,
}) {
    const toggleDropdown = (index) => {
        setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
    };

    return (
        <div className="max-w-screen mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Daftar {title}
                    </h3>
                </div>
                <div className="mt-3 md:mt-0">
                    <Link href={`/${title.toLowerCase()}/create`} className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm">
                        Tambah {title}
                    </Link>
                </div>
            </div>
            <div className="mt-6 shadow-sm border rounded-lg overflow-visible">
                <table className="w-full table-auto text-sm text-left relative">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className={`py-3 px-6 ${col.hidden ? "hidden md:table-cell" : ""}`}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                {columns.map((col, index) => (
                                    <td key={index} className={`px-6 py-4 whitespace-nowrap ${col.hidden ? "hidden md:table-cell" : ""}`}>
                                        {col.render ? col.render(item[col.key], item, idx) : item[col.key]}
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap md:hidden relative">
                                    <button className="text-gray-600 hover:text-gray-900" onClick={() => toggleDropdown(idx)}>
                                        {dropdownOpenIndex === idx ? <X size={20} /> : <Menu size={20} />}
                                    </button>
                                    <div className={`absolute right-0 mt-2 bg-white rounded-lg transition-transform duration-200 ease-in-out transform origin-top-right z-50 w-auto min-w-[50px] md:min-w-[200px] max-w-xs ${
                                        dropdownOpenIndex === idx ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                                    }`}>
                                        <div className="flex flex-col whitespace-nowrap">
                                            {columns.find((col) => col.key === "aksi").render(null, item, idx)}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
