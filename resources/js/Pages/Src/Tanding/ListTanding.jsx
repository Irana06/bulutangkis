import TableItems from "@/Pages/Layouts/Table";
import { Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function ListTanding() {
    const { tanding } = usePage().props;
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);

    const columns = [
        {
            key: "foto_profile",
            label: "Avatar",
            render: (item) => (
                <img src={item} className="w-10 h-10 rounded-full" />
            ),
        },
        { key: "atlet_nama", label: "Nama Peserta" },
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
                        href={`/peserta/${item.id}/detail`}
                        className={`py-2 leading-none px-3 font-medium text-green-600 bg-green-500/20 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            dropdownOpenIndex === index ? "" : "ml-2"
                        } `}
                    >
                        Detail
                    </Link>
                    <Link
                        href={`/peserta/${item.id}/edit`}
                        className={`py-2 leading-none mt-2 px-3 font-medium text-indigo-600 bg-indigo-500/20 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            dropdownOpenIndex === index ? "" : "ml-2"
                        } `}
                    >
                        Edit
                    </Link>
                    <Link
                        onClick={() => handleDelete(item.id)}
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
        atlet_nama: item.atlet?.name,
        kontingen_nama: item.kontingen?.name,
        kategori_tanding_tingkat: item.kategori_tanding.tingkat,
        jenis_tanding: formatJenisTanding(item.kategori_tanding.jenis),
        kelompok_tanding: item.kategori_tanding.kelompok_umur,
        umur: item.atlet?.umur,
        foto_profile:
            item.atlet?.foto_profile_url ??
            `https://ui-avatars.com/api/?name=${item.atlet?.name}`,
    }));

    return (
        <TableItems
            title="Tanding"
            data={tableData}
            columns={columns}
            dropdownOpenIndex={dropdownOpenIndex}
            setDropdownOpenIndex={setDropdownOpenIndex}
        />
    );
}
