import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import BackButton from "@/Components/Buttons/BackButton";
import FormatCapital from "@/Components/Utils/FormatCapital";
import logo from "@/Storage/Img/logo.png";
import wa from "@/Storage/Img/wa_logo.png";
import moment from "moment";
import "moment/locale/id";
import { Copy } from "lucide-react";

export default function CheckoutPembayaran() {
    const { tanding } = usePage().props;
    const currentDate = moment().format("dddd, MMMM YYYY");
    const [copied, setCopied] = useState(false);

    // Fungsi untuk menyalin ID
    const handleCopy = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            // Menggunakan Clipboard API jika tersedia
            navigator.clipboard
                .writeText(tanding.id)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch((err) => console.error("Gagal menyalin:", err));
        } else {
            // Fallback untuk browser yang lebih lama
            const textArea = document.createElement("textarea");
            textArea.value = tanding.id;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Gagal menyalin:", err);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <div class="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                {/* Logo & Tulisan */}
                <div className="flex items-center">
                    <img className="h-8 w-8 mr-2" src={logo} alt="Logo" />
                    <div className="hidden md:flex text-gray-700 font-semibold text-md">
                        LPO PDM Sleman
                    </div>
                </div>

                <div className="text-gray-700 text-right">
                    <div className="font-bold text-lg mb-2">INVOICE</div>
                    <div className="text-xs">Date: {currentDate}</div>

                    {/* Invoice ID dengan efek potong & Copy */}
                    <div className="text-xs flex items-center justify-end space-x-2">
                        {/* Potong ID */}
                        <button
                            onClick={handleCopy}
                            className="text-gray-600 hover:text-gray-800 transition flex items-center gap-2"
                        >
                            <span>Invoice ID: {tanding.id.slice(0, 9)}...</span>{" "}
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
            </div>
            <div class="border-b-2 border-gray-300 pb-8 mb-8">
                <h2 class="text-2xl font-bold mb-4">Detail:</h2>
                <div class="text-gray-700 mb-2">
                    <span className="font-semibold">Jenis:</span>{" "}
                    {FormatCapital(tanding.kategori_tanding?.jenis)}
                </div>
                <div className="text-gray-700 mb-2">
                    <span className="font-semibold">Kelompok umur:</span>{" "}
                    {`${tanding.kategori_tanding?.kelompok_umur} (${
                        tanding.kategori_tanding?.min_umur
                    }${
                        tanding.kategori_tanding?.max_umur === null
                            ? ">"
                            : ` - ${tanding.kategori_tanding?.max_umur}`
                    } Tahun)`}
                </div>

                <div class="text-gray-700 mb-2">
                    <span className="font-semibold">Peserta/Tim:</span>{" "}
                    {tanding.atlet?.name ?? tanding.tim?.nama_tim}
                </div>
            </div>
            <table class="w-full text-left mb-12">
                <thead>
                    <tr>
                        <th class="text-gray-700 font-bold uppercase py-2">
                            Deskripsi
                        </th>
                        <th class="text-gray-700 font-bold uppercase py-2">
                            Harga
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="py-4 text-gray-700">
                            Biaya Infak Wajib Peserta
                        </td>
                        <td class="py-4 text-gray-700">
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(tanding.kategori_tanding?.biaya)}
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* <div class="flex justify-end mb-8">
                <div class="text-gray-700 mr-2">Subtotal:</div>
                <div class="text-gray-700">$425.00</div>
            </div>
            <div class="text-right mb-8">
                <div class="text-gray-700 mr-2">Tax:</div>
                <div class="text-gray-700">$25.50</div>
            </div> */}
            <div class="flex justify-end mb-8">
                <div class="text-gray-700 mr-2">Total:</div>
                <div class="text-gray-700 font-semibold text-lg">
                    {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    }).format(tanding.kategori_tanding?.biaya)}
                </div>
            </div>
            <div class="border-t-2 border-gray-300 pt-8 mb-8">
                <div class="text-gray-700 mb-6">
                    Pembayaran paling lambat tanggal 26 April 2025. Pembayaran
                    tidak diproses setelah batas lambat maka peserta/tim tidak
                    berhak untuk mengikuti perlombaan.
                </div>
                <div class="text-gray-700 mb-2">
                    Mohon konfirmasi pembayaran ke:
                </div>
                <div className="text-gray-700">
                    <a
                        href="https://wa.me/6287839370573"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                        <img src={wa} alt="whatsapp logo" className="w-4 h-4" />
                        0878-3937-0573
                    </a>
                </div>
            </div>
            <div className="mt-10">
                <BackButton />
            </div>
        </div>
    );
}
