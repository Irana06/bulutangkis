import React from "react";
import { usePage } from "@inertiajs/react";
import moment from "moment";
import Field from "@/Components/Forms/Field";
import BackButton from "@/Components/Buttons/BackButton";
import FormatCapital from "@/Components/Utils/FormatCapital";

export default function DetailPembayaran() {
    const { tanding } = usePage().props;

    return (
        <div className="max-w-3xl mx-auto p-2 text-gray-800">
            {/* Foto Profil */}
            {tanding.atlet ? (
                <div className="mb-10">
                    <img
                        src={
                            tanding.atlet?.foto_profile_url ??
                            `https://ui-avatars.com/api/?name=${tanding.atlet?.name}`
                        }
                        alt="Foto Profil"
                        className="w-32 h-32 object-cover rounded-full shadow-lg"
                    />
                </div>
            ) : null}

            {/* Informasi Peserta & Tim */}
            {tanding.atlet ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <>
                        <Field label="Nama" value={tanding.atlet?.name} />
                        <Field
                            label="Jenis Kelamin"
                            value={
                                tanding.atlet?.jenis_kelamin === "LAKI_LAKI"
                                    ? "Laki-Laki"
                                    : "Perempuan"
                            }
                        />
                        <Field
                            label="Jenis Tanding"
                            value={FormatCapital(
                                tanding.kategori_tanding?.jenis
                            )}
                        />
                        <Field
                            label="Kelompok Tanding"
                            value={tanding.kategori_tanding?.kelompok_umur}
                        />
                        <Field
                            label="Biaya IWP"
                            value={
                                <span className="text-green-600 font-semibold">
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(tanding.kategori_tanding?.biaya)}
                                </span>
                            }
                        />
                        <Field
                            label="Status Pembayaran"
                            value={
                                <span
                                    className={
                                        tanding.dibayar
                                            ? "text-green-600"
                                            : "italic text-yellow-500"
                                    }
                                >
                                    {tanding.dibayar ? "Lunas" : "menunggu"}
                                </span>
                            }
                        />
                    </>
                </div>
            ) : (
                <>
                    <h1 className="font-semibold text-xl mb-5">Tim:</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Nama Tim" value={tanding.tim?.nama_tim} />
                        <Field
                            label="Kontingen"
                            value={tanding.kontingen?.name}
                        />
                        <Field
                            label="Jenis Tanding"
                            value={FormatCapital(
                                tanding.kategori_tanding?.jenis
                            )}
                        />
                        <Field
                            label="Kelompok Tanding"
                            value={tanding.kategori_tanding?.kelompok_umur}
                        />
                        <Field
                            label="Biaya IWP"
                            value={
                                <span className="text-green-600 font-semibold">
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(tanding.kategori_tanding?.biaya)}
                                </span>
                            }
                        />
                        <Field
                            label="Status Pembayaran"
                            value={
                                <span
                                    className={
                                        tanding.dibayar
                                            ? "text-green-600"
                                            : "italic text-yellow-500"
                                    }
                                >
                                    {tanding.dibayar ? "Lunas" : "menunggu"}
                                </span>
                            }
                        />
                    </div>

                    <hr className="my-3 mt-10 mb-10" />

                    <h1 className="font-semibold text-xl mb-5">Peserta 1:</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Nama" value={tanding.tim?.atlet_1.name} />
                        <Field
                            label="Jenis Kelamin"
                            value={
                                tanding.tim?.atlet_1.jenis_kelamin ===
                                "LAKI_LAKI"
                                    ? "Laki-Laki"
                                    : "Perempuan"
                            }
                        />
                    </div>

                    <hr className="my-3 mt-5 mb-10" />

                    <h1 className="font-semibold text-xl mb-5">Peserta 1:</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Nama" value={tanding.tim?.atlet_2.name} />
                        <Field
                            label="Jenis Kelamin"
                            value={
                                tanding.tim?.atlet_2.jenis_kelamin ===
                                "LAKI_LAKI"
                                    ? "Laki-Laki"
                                    : "Perempuan"
                            }
                        />
                    </div>
                </>
            )}
            {/* Button Kembali */}
            <div className="mt-10">
                <BackButton />
            </div>
        </div>
    );
}
