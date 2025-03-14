import React from "react";
import { usePage } from "@inertiajs/react";
import moment from "moment";
import Field from "@/Components/Forms/Field";
import BackButton from "@/Components/Buttons/BackButton";

export default function DetailPeserta() {
    const { atlet } = usePage().props;

    return (
        <div className="max-w-3xl mx-auto p-2 text-gray-800">
            {/* Foto Profil */}
            <div className="mb-10">
                <img
                    src={
                        atlet.foto_profile_url ??
                        `https://ui-avatars.com/api/?name=${atlet.name}`
                    }
                    alt="Foto Profil"
                    className="w-32 h-32 object-cover rounded-full shadow-lg"
                />
            </div>

            {/* Informasi Peserta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Nama" value={atlet.name} />
                <Field
                    label="Jenis Kelamin"
                    value={
                        atlet.jenis_kelamin === "LAKI_LAKI"
                            ? "Laki-Laki"
                            : "Perempuan"
                    }
                />
                <Field label="Umur" value={`${atlet.umur_update} Tahun`} />
                <Field label="Kontingen" value={atlet.kontingen.name} />
                <Field label="NIK" value={atlet.nik} />
                <Field label="No KK" value={atlet.no_kk} />
                <Field
                    label="Tanggal Lahir"
                    value={moment(atlet.tanggal_lahir).format("D MMM YYYY")}
                />
                <Field label="Tempat Lahir" value={atlet.tempat_lahir} />
                <Field
                    label="Berat Badan"
                    value={
                        atlet.berat_badan
                            ? `${atlet.berat_badan} kg`
                            : "data tidak ada"
                    }
                    className={`${
                        atlet.berat_badan ? "" : "text-yellow-600 italic"
                    }`}
                />
                <Field
                    label="Tinggi Badan"
                    value={
                        atlet.tinggi_badan
                            ? `${atlet.tinggi_badan} cm`
                            : "data tidak ada"
                    }
                    className={`${
                        atlet.tinggi_badan ? "" : "text-yellow-600 italic"
                    }`}
                />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-500">
                        Foto KK
                    </span>
                    <span
                        className={`text-lg font-medium text-gray-800`}
                    >
                        {atlet.kk_photo_url? (
                            <img
                                src={atlet.kk_photo_url}
                                alt="Foto KK"
                                className="w-full h-auto object-contain"
                            />
                        ) : (
                            <span className="text-yellow-600 italic">data tidak ada</span>
                        )}
                    </span>
                </div>
            </div>

            {/* Button Kembali */}
            <div className="mt-10">
                <BackButton />
            </div>
        </div>
    );
}
