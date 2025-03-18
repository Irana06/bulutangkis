import FormatCapital from "@/Components/Utils/FormatCapital";
import TableItems from "@/Pages/Layouts/Table";
import { Link } from "@inertiajs/inertia-react";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ListTim() {
    const { tim } = usePage().props;
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data ini akan dihapus secara permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("tim.destroy", id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire(
                            "Terhapus!",
                            "Data tim telah dihapus.",
                            "success"
                        );
                    },
                });
            }
        });
    };

    const columns = [
        { key: "nama", label: "Nama Tim" },
        { key: "jenis", label: "Jenis Tim" },
        { key: "atlet1", label: "Peserta 1" },
        { key: "atlet2", label: "Peserta 2" },
        {
            key: "aksi",
            label: "Aksi",
            render: (value, item, index) => (
                <div
                    className={`${
                        dropdownOpenIndex === index ? "flex flex-col" : ""
                    } text-left  whitespace-nowrap`}
                >
                    <Link
                        href={`/tim/${item.id}/detail`}
                        className={`py-2 leading-none px-3 font-medium text-green-600 bg-green-500/20 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            dropdownOpenIndex === index ? "" : "ml-2"
                        } `}
                    >
                        Detail
                    </Link>
                    <Link
                        href={`/tim/${item.id}/edit`}
                        className={`py-2 leading-none mt-2 px-3 font-medium text-indigo-600 bg-indigo-500/20 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            dropdownOpenIndex === index ? "" : "ml-2"
                        } `}
                    >
                        Edit
                    </Link>
                    <Link
                        href="#"
                        onClick={(e) => {
                            e.preventDefault(); // Mencegah fetch otomatis
                            handleDelete(item.id);
                        }}
                        className={`py-2 leading-none mt-2 px-3 font-medium text-red-600 bg-red-500/20 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            dropdownOpenIndex === index ? "" : "ml-2"
                        } `}
                    >
                        Delete
                    </Link>
                </div>
            ),
            hidden: true,
        },
    ];

    // Transformasi data agar sesuai dengan format tabel
    const tableData = tim.map((item) => ({
        id: item.id,
        nama: item.nama_tim,
        jenis: FormatCapital(item.jenis),
        atlet1: item.atlet_1?.name,
        atlet2: item.atlet_2?.name,
    }));

    return (
        <TableItems
            title="Tim Ganda"
            data={tableData}
            columns={columns}
            dropdownOpenIndex={dropdownOpenIndex}
            setDropdownOpenIndex={setDropdownOpenIndex}
        />
    );
}
