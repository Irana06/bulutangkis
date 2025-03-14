import TableItems from "@/Pages/Layouts/Table";
import { Link } from "@inertiajs/inertia-react";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ListTanding() {
    const { tanding, childText } = usePage().props;
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
                router.delete(route("tanding.destroy", id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire(
                            "Terhapus!",
                            "Data tanding telah dihapus.",
                            "success"
                        );
                    },
                });
            }
        });
    };

    const columns = [
        {
            key: "foto_profile",
            label: "Avatar",
            render: (item) => (
                <img src={item} className="w-10 h-10 rounded-full" />
            ),
        },
        { key: "atlet_nama", label: "Nama Peserta/Tim" },
        { key: "kontingen_nama", label: "Kontingen", hidden: true },
        { key: "kategori_tanding_tingkat", label: "Tingkat", hidden: true },
        { key: "jenis_tanding", label: "Jenis Tanding", hidden: true },
        { key: "kelompok_tanding", label: "Kelompok Tanding", hidden: true },
        { key: "umur", label: "Umur (Tahun)", hidden: true },
        { key: "juara", label: "Juara ke", hidden: true },
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
                        href={`/tanding/${item.id}/detail`}
                        className={`py-2 leading-none px-3 font-medium text-green-600 bg-green-500/20 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            dropdownOpenIndex === index ? "" : "ml-2"
                        } `}
                    >
                        Detail
                    </Link>
                    <Link
                        href={`/tanding/${item.id}/edit`}
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

    // Fungsi untuk memformat string kategori tanding
    const formatJenisTanding = (jenis) => {
        if (!jenis) return "";
        return jenis
            .toLowerCase() // Ubah ke huruf kecil semua
            .replace(/_/g, " ") // Ganti "_" dengan spasi
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Kapitalisasi setiap kata
    };

    // Transformasi data agar sesuai dengan format tabel
    const tableData = tanding.map((item) => ({
        id: item.id,
        atlet_nama: item.atlet?.name ?? item.tim?.nama_tim,
        kontingen_nama: item.kontingen?.name,
        kategori_tanding_tingkat: item.kategori_tanding.tingkat,
        jenis_tanding: formatJenisTanding(item.kategori_tanding.jenis),
        kelompok_tanding: item.kategori_tanding.kelompok_umur,
        umur:
            item.atlet?.umur ??
            `(${item.kategori_tanding?.min_umur} - ${item.kategori_tanding?.max_umur})`,
        foto_profile:
            item.atlet?.foto_profile_url ??
            `https://ui-avatars.com/api/?name=${item.atlet?.name}`,
    }));

    return (
        <TableItems
            title={`Tanding ${childText}`}
            data={tableData}
            columns={columns}
            dropdownOpenIndex={dropdownOpenIndex}
            setDropdownOpenIndex={setDropdownOpenIndex}
        />
    );
}
