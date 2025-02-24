import { Menu, X } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function TableItems({
    title = "Data",
    data = [],
    columns = [],
    dropdownOpenIndex,
    setDropdownOpenIndex,
    itemsPerPage = 10, // Jumlah item per halaman
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const toggleDropdown = (index) => {
        setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="max-w-screen mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Daftar {title}
                    </h3>
                </div>
                <div className="mt-3 md:mt-0">
                    <Link
                        href={`/${title.toLowerCase()}/create`}
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Tambah {title}
                    </Link>
                </div>
            </div>

            {/* Jika data kosong, tampilkan pesan */}
            {data.length === 0 ? (
                <div className="mt-6 p-4 border border-gray-300 bg-gray-50 text-gray-600 text-center rounded-lg">
                    Data {title} tidak ada
                </div>
            ) : (
                <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto relative">
                    <table className="w-full min-w-full table-auto text-sm text-left relative">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                {columns.map((col, index) => (
                                    <th
                                        key={index}
                                        className={`py-3 px-6 ${
                                            col.key === "aksi"
                                                ? ""
                                                : col.hidden
                                                ? "hidden md:table-cell"
                                                : ""
                                        }`}
                                    >
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {paginatedData.map((item, idx) => (
                                <tr key={idx}>
                                    {columns.map((col, index) => (
                                        <td
                                            key={index}
                                            className={`px-6 py-4 whitespace-nowrap ${
                                                col.hidden
                                                    ? "hidden md:table-cell"
                                                    : ""
                                            } ${
                                                item[col.key] === null ||
                                                item[col.key] === ""
                                                    ? "text-yellow-600 italic"
                                                    : ""
                                            }`}
                                        >
                                            {col.render
                                                ? col.render(
                                                      item[col.key],
                                                      item,
                                                      idx
                                                  )
                                                : item[col.key] === 0
                                                ? "0"
                                                : item[col.key] ||
                                                  "Data tidak ada"}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 whitespace-nowrap md:hidden relative">
                                        <button
                                            className="text-gray-600 hover:text-gray-900"
                                            onClick={() => toggleDropdown(idx)}
                                        >
                                            {dropdownOpenIndex === idx ? (
                                                <X size={20} />
                                            ) : (
                                                <Menu size={20} />
                                            )}
                                        </button>
                                        <div
                                            className={`absolute right-0 mt-2 bg-white rounded-lg z-50 w-auto min-w-[100px] md:min-w-[200px] max-w-xs ${
                                                dropdownOpenIndex === idx
                                                    ? "opacity-100 scale-100 visible"
                                                    : "opacity-0 scale-95 invisible"
                                            } transition-transform duration-200 ease-in-out`}
                                        >
                                            <div className="flex flex-col whitespace-nowrap">
                                                {columns
                                                    .find(
                                                        (col) =>
                                                            col.key === "aksi"
                                                    )
                                                    .render(null, item, idx)}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="max-w-screen-xl mx-auto mt-6 px-4 text-gray-600 md:px-8">
                <div
                    className="hidden items-center justify-between sm:flex"
                    aria-label="Pagination"
                >
                    <a
                        href="javascript:void(0)"
                        className={`hover:text-indigo-600 flex items-center gap-x-2 ${
                            currentPage === 1
                                ? "pointer-events-none text-gray-400"
                                : ""
                        }`}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Halaman Sebelumnya
                    </a>
                    <ul className="flex items-center gap-1">
                        {Array.from(
                            { length: totalPages },
                            (_, idx) => idx + 1
                        ).map((item) => (
                            <li key={item} className="text-sm">
                                <a
                                    href="javascript:void(0)"
                                    aria-current={
                                        currentPage === item ? "page" : false
                                    }
                                    className={`px-3 py-2 rounded-lg duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${
                                        currentPage === item
                                            ? "bg-indigo-50 text-indigo-600 font-medium"
                                            : ""
                                    }`}
                                    onClick={() => handlePageChange(item)}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a
                        href="javascript:void(0)"
                        className={`hover:text-indigo-600 flex items-center gap-x-2 ${
                            currentPage === totalPages
                                ? "pointer-events-none text-gray-400"
                                : ""
                        }`}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Halaman Selanjutnya
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>
                {/* On mobile version */}
                <div className="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden">
                    <a
                        href="javascript:void(0)"
                        className={`px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50 ${
                            currentPage === 1
                                ? "pointer-events-none text-gray-400"
                                : ""
                        }`}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Sebelumnya
                    </a>
                    <div className="font-medium">
                        Page {currentPage} of {totalPages}
                    </div>
                    <a
                        href="javascript:void(0)"
                        className={`px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50 ${
                            currentPage === totalPages
                                ? "pointer-events-none text-gray-400"
                                : ""
                        }`}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Selanjutnya
                    </a>
                </div>
            </div>
        </div>
    );
}
