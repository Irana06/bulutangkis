import TableItems from "@/Pages/Layouts/Table";
import { usePage, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ListPeserta() {
    const { atlet } = usePage().props;
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
    const { delete: destroy } = useForm();

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
                destroy(route("peserta.destroy", id), {
                    onSuccess: () => {
                        Swal.fire(
                            "Terhapus!",
                            "Data atlet telah dihapus.",
                            "success"
                        );
                    },
                });
            }
        });
    };

    const formattedAtlet = atlet.map((item) => ({
        ...item,
        jenis_kelamin:
            item.jenis_kelamin === "LAKI_LAKI"
                ? "Laki-Laki"
                : item.jenis_kelamin === "PEREMPUAN"
                ? "Perempuan"
                : item.jenis_kelamin,
    }));

    const columns = [
        {
            key: "foto_profile",
            label: "Avatar",
            render: (value, item) => (
                <img
                    src={item.foto_profile_url || `https://ui-avatars.com/api/?name=${item.name}`}
                    alt={item.name}
                    className="w-10 h-10 rounded-full"
                />
            ),
        },
        { key: "name", label: "Nama" },
        { key: "jenis_kelamin", label: "Jenis Kelamin", hidden: true },
        { key: "tanggal_lahir", label: "Tanggal Lahir", hidden: true },
        { key: "nik", label: "NIK", hidden: true },
        { key: "no_kk", label: "KK", hidden: true },
        { key: "umur_update", label: "Umur (Tahun)", hidden: true },
        { key: "tinggi_badan", label: "Tinggi Badan (cm)", hidden: true },
        {
            key: "aksi",
            label: "Aksi",
            render: (value, item, index) => (
                <div className={`${dropdownOpenIndex === index ? "flex flex-col" : ""} text-left  whitespace-nowrap`}>
                    <Link href={`/peserta/${item.id}/detail`} className={`py-2 leading-none px-3 font-medium text-green-600 bg-green-500/20 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg ${dropdownOpenIndex === index ? "" : "ml-2"} `}>
                        Detail
                    </Link>
                    <Link href={`/peserta/${item.id}/edit`} className={`py-2 leading-none mt-2 px-3 font-medium text-indigo-600 bg-indigo-500/20 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg ${dropdownOpenIndex === index ? "" : "ml-2"} `}>
                        Edit
                    </Link>
                    <Link onClick={() => handleDelete(item.id)} className={`py-2 leading-none mt-2 px-3 font-medium text-red-600 bg-red-500/20 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg ${dropdownOpenIndex === index ? "" : "ml-2"} `}>
                        Delete
                    </Link>
                </div>
            ),
            hidden: true,
        },
    ];

    return (
        <TableItems
            title="Peserta"
            data={formattedAtlet}
            columns={columns}
            dropdownOpenIndex={dropdownOpenIndex}
            setDropdownOpenIndex={setDropdownOpenIndex}
        />
    );
}
