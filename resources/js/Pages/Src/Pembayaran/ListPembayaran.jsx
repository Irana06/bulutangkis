import FormatCapital from "@/Components/Utils/FormatCapital";
import TableItems from "@/Pages/Layouts/Table";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ListPembayaran() {
    const { tanding, kontingen } = usePage().props;
    console.log(kontingen);
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);

    const tandingColumns = [
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
            ),
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
    const kontingenColumns = [
        { key: "name", label: "Nama Kontingen" },
        { key: "alamat_lengkap", label: "Alamat Lengkap", hidden: true },
        { key: "penanggung_jawab", label: "Penanggung Jawab", hidden: true },
        { key: "no_hp_penanggung_jawab", label: "Nomor Hp", hidden: true },
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
            ),
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
    const tandingData = tanding.map((item) => ({
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

    const kontingenData = kontingen.map((item) => ({
        ...item,
        status_pembayaran: item.dibayar ? "Lunas" : "Menunggu",
    }));

    const handleBulkPayment = (selectedIds) => {
        if (selectedIds.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Tidak ada item terpilih",
                text: "Silakan pilih item yang ingin dibayar.",
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi Pembayaran",
            text: `Apakah Anda yakin ingin membayar ${selectedIds.length} item?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, bayar sekarang!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("pembayaran.showBulk"), { ids: selectedIds });
            }
        });
    };

    const CustomButton = ({ selectedIds }) => (
        <button
            type="submit"
            onClick={() => handleBulkPayment(selectedIds)}
            className="inline-block px-4 py-2 font-medium text-blue-600 bg-blue-500/20 hover:text-blue-500 duration-150 hover:bg-gray-50 md:text-sm rounded-lg"
        >
            Bayar Semua
        </button>
    );

    return (
        <>
            <TableItems
                title="Pembayaran Tanding"
                data={tandingData}
                columns={tandingColumns}
                hideAddButton
                showCheckbox
                dropdownOpenIndex={dropdownOpenIndex}
                setDropdownOpenIndex={setDropdownOpenIndex}
                CustomButton={CustomButton}
            />

            <hr className="my-10" />

            <TableItems
                title="Pembayaran Kontingen"
                data={kontingenData}
                columns={kontingenColumns}
                hideAddButton
                dropdownOpenIndex={dropdownOpenIndex}
                setDropdownOpenIndex={setDropdownOpenIndex}
            />
        </>
    );
}
