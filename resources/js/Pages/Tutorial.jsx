import React from "react";
import { Link } from "@inertiajs/react";
import { UserPlus, Users, ClipboardList, Wallet } from "lucide-react";

export default function Tutorial() {
    return (
        <div className="bg-white">
            {/* Halaman Step */}
            <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between text-center">
                <p className="mt-4 text-sm leading-7 text-gray-500 font-regular">
                    Tutorial
                </p>
                <h3 className="text-3xl sm:text-2xl leading-normal font-extrabold tracking-tight text-gray-900">
                    Bagaimana cara{" "}
                    <span className="text-indigo-600">berpartisipasi?</span>
                </h3>
            </div>

            <div className="mt-20">
                <ul>
                    {[
                        {
                            title: "Daftar Peserta",
                            description:
                                "Silahkan daftarkan peserta Anda dengan mengisi formulir dan melengkapi data peserta.",
                            icon: <UserPlus size={24} />,
                            link: "/peserta/create",
                        },
                        {
                            title: "Daftar Kategori Ganda",
                            description:
                                "Jika Peserta Anda ingin bermain dalam kategori ganda, pastikan mendaftarkan kelompok pasangan terlebih dahulu.",
                            icon: <Users size={24} />,
                            link: "/tim/create",
                        },
                        {
                            title: "Pilih Kategori Tanding",
                            description:
                                "Peserta/Kelompok Ganda Anda sudah siap bertanding? Pilih kategori tanding yang sesuai dengan daftar Kategori Tanding yang telah disediakan.",
                            icon: <ClipboardList size={24} />,
                            link: "/tanding/create",
                        },
                        {
                            title: "Pembayaran Infak Wajib",
                            description:
                                "Lakukan pembayaran biaya Infak Wajib pendaftaran melalui transfer bank/QRIS.",
                            icon: <Wallet size={24} />,
                            link: "/pembayaran",
                        },
                    ].map((step, index) => (
                        <li key={index} className="text-left mb-10">
                            <div className="flex flex-row items-start">
                                <div className="flex flex-col items-center justify-center mr-5">
                                    <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                                        {index + 1}
                                    </div>
                                    <span className="text-gray-500">STEP</span>
                                </div>
                                <div className="bg-gray-100 p-5 pb-10 flex-1">
                                    <h4 className="text-lg leading-6 font-semibold text-gray-900 flex items-center gap-x-2">
                                        <span className="w-6 h-6 flex-shrink-0">
                                            {step.icon}
                                        </span>
                                        <span>{step.title}</span>
                                    </h4>
                                    <p className="mt-2 text-base leading-6 text-gray-500">
                                        {step.description}
                                    </p>
                                    <Link
                                        href={step.link}
                                        className="mt-4 inline-block text-indigo-600 hover:underline"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
