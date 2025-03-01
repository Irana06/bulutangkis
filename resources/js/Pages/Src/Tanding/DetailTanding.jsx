import React from "react";
import { usePage } from "@inertiajs/react";
import moment from "moment";
import Field from "@/Components/Forms/Field";
import BackButton from "@/Components/Buttons/BackButton";

export default function DetailTanding() {
    const { tanding } = usePage().props;

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

            {/* Informasi Peserta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Nama" value={tanding.atlet?.name} />
                <Field
                    label="Jenis Kelamin"
                    value={
                        tanding.atlet?.jenis_kelamin === "LAKI_LAKI"
                            ? "Laki-Laki"
                            : "Perempuan"
                    }
                />
                <Field label="Umur" value={`${tanding.atlet?.umur} Tahun`} />
                <Field label="Kontingen" value={tanding.kontingen?.name} />
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
                    value={formatJenisTanding(tanding.kategori_tanding?.jenis)}
                />
                <Field
                    label="Tingkat Tanding"
                    value={tanding.kategori_tanding?.tingkat}
                />
                <Field
                    label="Kelompok Tanding"
                    value={tanding.kategori_tanding?.kelompok_umur}
                />
                <Field
                    label="Juara Ke"
                    value={tanding.juara ? `Juara ${tanding.juara}` : "Belum ada rekaman"}
                    className={`${
                        tanding.juara ? "" : "text-yellow-600 italic"
                    }`}
                />
            </div>
            {/* Button Kembali */}
            <div className="mt-10">
                <BackButton />
            </div>
        </div>
    );
}
