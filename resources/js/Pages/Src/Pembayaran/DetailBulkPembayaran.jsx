import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import BackButton from "@/Components/Buttons/BackButton";
import FormatCapital from "@/Components/Utils/FormatCapital";
import logo from "@/Storage/Img/logo.png";
import wa from "@/Storage/Img/wa_logo.png";
import qrCode from "@/Storage/Img/qris.png";
import moment from "moment";
import "moment/locale/id";
import { Copy } from "lucide-react";

export default function DetailBulkPembayaran() {
    const { tanding } = usePage().props;
    const currentDate = moment().format("dddd, MMMM YYYY");
    const [copied, setCopied] = useState(false);

    if (!tanding || tanding.length === 0) {
        return (
            <div className="text-center text-gray-600">
                Tidak ada data tanding.
            </div>
        );
    }

    // Hitung total biaya dari semua item
    const totalBiaya = tanding.reduce(
        (acc, item) => acc + (item.kategori_tanding?.biaya || 0),
        0
    );
    // Fungsi untuk menyalin semua ID
    const handleCopy = () => {
        const allIds = tanding.map((item) => item.id).join("\n");

        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(allIds)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch((err) => console.error("Gagal menyalin:", err));
        } else {
            // Fallback untuk browser yang tidak mendukung Clipboard API
            const textArea = document.createElement("textarea");
            textArea.value = allIds;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-2 text-gray-800">
            <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <img className="h-8 w-8 mr-2" src={logo} alt="Logo" />
                        <div className="hidden md:flex text-gray-700 font-semibold text-md">
                            LPO PDM Sleman
                        </div>
                    </div>
                    <div className="text-gray-700 text-right">
                        <div className="text-sm">Date: {currentDate}</div>
                    </div>
                </div>
                <div className="text-gray-700">
                    <div className="font-bold text-lg mb-2">Invoice ID</div>

                    {/* Invoice ID dengan efek Copy */}
                    <div className="text-xs flex items-center space-x-2">
                        <button
                            onClick={handleCopy}
                            className="text-gray-600 hover:text-cyan-600 transition flex items-center gap-2"
                        >
                            <span>
                                {tanding
                                    .map((item) => item.id.slice(0, 9))
                                    .join(", ")}
                            </span>
                            <Copy size={16} />
                        </button>
                    </div>

                    {/* Notifikasi Copy */}
                    {copied && (
                        <div className="text-green-600 text-xs mt-1">
                            ID berhasil disalin!
                        </div>
                    )}
                </div>

                <div className="border-b-2 border-gray-300 pb-8 mb-8"></div>

                <h2 className="text-2xl font-bold mb-4">Detail:</h2>

                {/* Wrapper untuk scroll di mobile */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left mb-6 border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="text-gray-700 font-bold py-2 px-4 border whitespace-nowrap">
                                    Peserta/Tim
                                </th>
                                <th className="text-gray-700 font-bold py-2 px-4 border whitespace-nowrap">
                                    Jenis
                                </th>
                                <th className="text-gray-700 font-bold py-2 px-4 border whitespace-nowrap">
                                    Biaya
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tanding.map((item, index) => (
                                <tr key={index} className="border">
                                    <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                                        {item.atlet?.name ??
                                            `${item.tim?.atlet_1.name} & ${item.tim?.atlet_2.name}`}
                                    </td>
                                    <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                                        {`${FormatCapital(
                                            item.kategori_tanding?.jenis
                                        )} ${
                                            item.kategori_tanding?.kelompok_umur
                                        }`}
                                    </td>
                                    <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(
                                            item.kategori_tanding?.biaya || 0
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Total Biaya */}
                <div className="flex justify-end mt-2 mb-8 pt-4">
                    <span className="text-lg font-bold text-gray-800">
                        Total:{" "}
                        {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(totalBiaya)}
                    </span>
                </div>

                <div className="border-t-2 border-gray-300 pt-8 mb-8">
                    <div className="font-semibold mb-6">
                        Bank BRI an. ROMADLON 3074-01016525-53
                    </div>
                    <div className="text-gray-700 mb-6">
                        Atau bisa menggunakan QRIS:
                        <img
                            src={qrCode}
                            alt="QR code"
                            className="h-full w-full rounded-lg"
                        />
                    </div>
                    <div className="text-gray-700 mb-6">
                        Pembayaran paling lambat tanggal 26 April 2025.
                        Pembayaran tidak diproses setelah batas lambat maka
                        peserta/tim tidak berhak untuk mengikuti perlombaan.
                    </div>
                    <div className="text-gray-700 mb-2">
                        Mohon konfirmasi pembayaran dan berikan Invoice ID yang
                        ada di atas ke:
                    </div>
                    <div className="text-gray-700">
                        <a
                            href="https://wa.me/6287839370573"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                            <img
                                src={wa}
                                alt="whatsapp logo"
                                className="w-4 h-4"
                            />
                            0878-3937-0573
                        </a>
                    </div>
                </div>

                <div className="mt-10">
                    <BackButton />
                </div>
            </div>
        </div>
    );
}
