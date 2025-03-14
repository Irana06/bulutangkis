import FormatCapital from "@/Components/Utils/FormatCapital";
import TableItems from "@/Pages/Layouts/Table";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function ListPembayaran() {
    const { tanding } = usePage().props;
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);

    const columns = [
        { key: "nama", label: "Nama" },
        { key: "kontingen_nama", label: "Kontingen", hidden: true },
        { key: "jenis_tanding", label: "Jenis Tanding", hidden: true },
        { key: "kelompok_tanding", label: "Kelompok Tanding", hidden: true },
        { key: "umur", label: "Umur (Tahun)", hidden: true },
        {
            key: "status_pembayaran",
            label: "Status Pembayaran",
            render: (value) => (
                <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        value === "Lunas"
                            ? "bg-green-500/20 text-green-600"
                            : "bg-yellow-500/20 text-yellow-600"
                    }`}
                >
                    {value}
                </span>
            )
        },
        {
            key: "aksi",
            label: "Aksi",
            render: (value, item, index) => (
                <div
                    className={`${
                        dropdownOpenIndex === index ? "flex flex-col" : ""
                    } text-left whitespace-nowrap`}
                >
                    <Link
                        href={`/pembayaran/${item.id}/detail`}
                        className={`py-2 leading-none px-3 font-medium text-green-600 bg-green-500/20 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            dropdownOpenIndex === index ? "" : "ml-2"
                        }`}
                    >
                        Detail
                    </Link>
                    <Link
                        href={`/pembayaran/${item.id}/checkout`}
                        className={`py-2 leading-none mt-2 px-3 font-medium text-blue-600 bg-blue-500/20 hover:text-blue-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            dropdownOpenIndex === index ? "" : "ml-2"
                        }`}
                    >
                        Bayar
                    </Link>
                </div>
            ),
            hidden: true,
        },
    ];

    // Transformasi data agar sesuai dengan format tabel
    const tableData = tanding.map((item) => ({
        id: item.id,
        nama: item.atlet?.name ?? item.tim?.nama_tim,
        kontingen_nama: item.kontingen?.name,
        jenis_tanding: FormatCapital(item.kategori_tanding.jenis),
        kelompok_tanding: item.kategori_tanding.kelompok_umur,
        umur:
            item.atlet?.umur ??
            `(${item.kategori_tanding?.min_umur} - ${item.kategori_tanding?.max_umur})`,
        status_pembayaran: item.dibayar ? "Lunas" : "Menunggu",
    }));

    return (
        <TableItems
            title="Pembayaran"
            data={tableData}
            columns={columns}
            dropdownOpenIndex={dropdownOpenIndex}
            setDropdownOpenIndex={setDropdownOpenIndex}
        />
    );
}
