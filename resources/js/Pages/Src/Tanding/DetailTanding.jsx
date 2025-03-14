import React from "react";
import { usePage } from "@inertiajs/react";
import moment from "moment";
import Field from "@/Components/Forms/Field";
import BackButton from "@/Components/Buttons/BackButton";

export default function DetailTanding() {
    const { tanding } = usePage().props;
    console.log(tanding);

    // Fungsi untuk memformat string kategori tanding
    const formatJenisTanding = (jenis) => {
        if (!jenis) return "";
        return jenis
            .toLowerCase() // Ubah ke huruf kecil semua
            .replace(/_/g, " ") // Ganti "_" dengan spasi
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Kapitalisasi setiap kata
    };

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
                            label="Umur"
                            value={`${tanding.atlet?.umur} Tahun`}
                        />
                        <Field
                            label="Kontingen"
                            value={tanding.kontingen?.name}
                        />
                        <Field
                            label="Tanggal Lahir"
                            value={moment(tanding.atlet?.tanggal_lahir).format(
                                "D MMM YYYY"
                            )}
                        />
                        <Field
                            label="Tempat Lahir"
                            value={tanding.atlet?.tempat_lahir}
                        />
                        <Field
                            label="Jenis Tanding"
                            value={formatJenisTanding(
                                tanding.kategori_tanding?.jenis
                            )}
                        />
                        <Field
                            label="Kelompok Tanding"
                            value={tanding.kategori_tanding?.kelompok_umur}
                        />
                        <Field
                            label="Juara Ke"
                            value={
                                tanding.juara
                                    ? `Juara ${tanding.juara}`
                                    : "Belum ada rekaman"
                            }
                            className={`${
                                tanding.juara ? "" : "text-yellow-600 italic"
                            }`}
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
                            value={formatJenisTanding(
                                tanding.kategori_tanding?.jenis
                            )}
                        />
                        <Field
                            label="Kelompok Tanding"
                            value={tanding.kategori_tanding?.kelompok_umur}
                        />
                        <Field
                            label="Juara Ke"
                            value={
                                tanding.juara
                                    ? `Juara ${tanding.juara}`
                                    : "Belum ada rekaman"
                            }
                            className={`${
                                tanding.juara ? "" : "text-yellow-600 italic"
                            }`}
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
                        <Field
                            label="Umur"
                            value={`${tanding.tim?.atlet_1.umur} Tahun`}
                        />
                        <Field
                            label="Tanggal Lahir"
                            value={moment(
                                tanding.tim?.atlet_1.tanggal_lahir
                            ).format("D MMM YYYY")}
                        />
                        <Field
                            label="Tempat Lahir"
                            value={tanding.tim?.atlet_1.tempat_lahir}
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
                        <Field
                            label="Umur"
                            value={`${tanding.tim?.atlet_2.umur} Tahun`}
                        />
                        <Field
                            label="Tanggal Lahir"
                            value={moment(
                                tanding.tim?.atlet_2.tanggal_lahir
                            ).format("D MMM YYYY")}
                        />
                        <Field
                            label="Tempat Lahir"
                            value={tanding.tim?.atlet_2.tempat_lahir}
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
