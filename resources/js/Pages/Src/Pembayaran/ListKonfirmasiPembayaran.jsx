import FormatCapital from "@/Components/Utils/FormatCapital";
import TableItems from "@/Pages/Layouts/Table";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function ListKonfirmasiPembayaran() {
    const { tanding, kontingen, flash } = usePage().props;
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (flash?.error) {
            setVisible(true); // Munculkan flash message
            const timer = setTimeout(() => setVisible(false), 5000); // Hilangkan setelah 5 detik
            return () => clearTimeout(timer); // Bersihkan timer jika komponen di-unmount
        }
    }, [flash?.error]);

    const confirmSubmit = (id, type) => {
        Swal.fire({
            title: "Konfirmasi Pembayaran",
            text: "Apakah Anda yakin ingin mengkonfirmasi pembayaran ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, konfirmasi!",
        }).then((result) => {
            if (result.isConfirmed) {
                const payload =
                    type === "tanding"
                        ? { tanding_id: id }
                        : { kontingen_id: id };
                axios
                    .post(route("pembayaran.confirmPayment"), payload)
                    .then(() => {
                        Swal.fire(
                            "Berhasil!",
                            "Pembayaran telah dikonfirmasi.",
                            "success"
                        ).then(() => {
                            window.location.reload();
                        });
                    })
                    .catch((error) => {
                        console.error(
                            "Error saat mengkonfirmasi pembayaran:",
                            error
                        );
                        Swal.fire(
                            "Error",
                            "Terjadi kesalahan dalam mengkonfirmasi pembayaran.",
                            "error"
                        );
                    });
            }
        });
    };

    const TandingColumns = [
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
            hidden: true,
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
                        href={`/pembayaran/${item.tanding_id}/detail`}
                        className={`py-2 leading-none px-3 font-medium text-green-600 bg-green-500/20 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            dropdownOpenIndex === index ? "" : "ml-2"
                        }`}
                    >
                        Detail
                    </Link>
                    <button
                        onClick={() =>
                            confirmSubmit(item.tanding_id, "tanding")
                        }
                        className={`py-2 leading-none mt-2 px-3 font-medium text-blue-600 bg-blue-500/20 hover:text-blue-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            dropdownOpenIndex === index ? "" : "ml-2"
                        }`}
                    >
                        Konfirmasi
                    </button>
                </div>
            ),
            hidden: true,
        },
    ];

    const kontingenColumns = [
        { key: "nama", label: "Nama Kontingen" },
        { key: "penanggung", label: "Penanggung Jawab", hidden: true },
        { key: "no_hp", label: "Nomor HP", hidden: true },
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
            hidden: true,
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
                        href={`/pembayaran/${item.kontingen_id}/detail`}
                        className={`py-2 leading-none px-3 font-medium text-green-600 bg-green-500/20 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            dropdownOpenIndex === index ? "" : "ml-2"
                        }`}
                    >
                        Detail
                    </Link>
                    <button
                        onClick={() =>
                            confirmSubmit(item.kontingen_id, "kontingen")
                        }
                        className={`py-2 leading-none mt-2 px-3 font-medium text-blue-600 bg-blue-500/20 hover:text-blue-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            dropdownOpenIndex === index ? "" : "ml-2"
                        }`}
                    >
                        Konfirmasi
                    </button>
                </div>
            ),
            hidden: true,
        },
    ];

    // Transformasi data agar sesuai dengan format tabel
    const tandingData = tanding.map((item) => ({
        tanding_id: item.id,
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
        kontingen_id: item.id,
        nama: item.name,
        penanggung: item.penanggung_jawab,
        no_hp: item.no_hp_penanggung_jawab,
        status_pembayaran: item.dibayar ? "Lunas" : "Menunggu",
    }));

    return (
        <>
            {/* Flash Error dengan Timer */}
            {flash?.error && visible && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4">
                    {flash.error}
                </div>
            )}
            <TableItems
                url="konfirmasi-pembayaran"
                title="Konfirmasi Pembayaran Tanding"
                data={tandingData}
                columns={TandingColumns}
                hideAddButton
                dropdownOpenIndex={dropdownOpenIndex}
                setDropdownOpenIndex={setDropdownOpenIndex}
                searchQuery={{
                    key: "tanding_id",
                    placeholder: "Cari ID Tanding",
                }}
            />

            <hr className="my-10" />
            <TableItems
                url="konfirmasi-pembayaran"
                title="Konfirmasi Pembayaran Kontingen"
                data={kontingenData}
                columns={kontingenColumns}
                hideAddButton
                dropdownOpenIndex={dropdownOpenIndex}
                setDropdownOpenIndex={setDropdownOpenIndex}
                searchQuery={{
                    key: "kontingen_id",
                    placeholder: "Cari ID Kontingen",
                }}
            />
        </>
    );
}
