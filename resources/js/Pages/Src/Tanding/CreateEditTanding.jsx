import { useState, useEffect } from "react";
import { FormContainer } from "@/Components/Forms/FormContainer";
import { Section } from "@/Components/Forms/Section";
import SelectField from "@/Components/Forms/SelectField";
import FormatCapital from "@/Components/Utils/FormatCapital";
import { usePage, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import BackButton from "@/Components/Buttons/BackButton";

export default function CreateEditTanding() {
    const { kategoriTanding, atlet, tim } = usePage().props;
    const [filteredKategoriTanding, setFilteredKategoriTanding] = useState([]);

    const { data, setData, post, processing, errors } = useForm({
        atlet_id: "",
        tim_id: "",
        kategori_tanding_id: "",
    });

    // Opsi Atlet
    const atletOptions = atlet.map((atlet) => ({
        value: atlet.id,
        label: `${atlet.name} - ${FormatCapital(atlet.jenis_kelamin)} (${
            atlet.umur
        } Tahun)`,
        umur: atlet.umur,
        jenis_kelamin: atlet.jenis_kelamin,
        img: atlet.foto_profile_url,
    }));

    // Opsi Tim
    const timOptions = tim.map((tim) => {
        // Menentukan jenis kelamin tim
        let jenisKelaminTim = "Campuran";
        if (tim.atlet_1?.jenis_kelamin === tim.atlet_2?.jenis_kelamin) {
            jenisKelaminTim = tim.atlet_1?.jenis_kelamin || "Campuran";
        }

        return {
            value: tim.id,
            label: `${tim.nama_tim} - ${FormatCapital(jenisKelaminTim)} (${
                tim.atlet_1?.name
            } & ${tim.atlet_2?.name})`,
            umur: tim.atlet_1?.umur || 0,
            jenis_kelamin: jenisKelaminTim,
        };
    });

    useEffect(() => {
        let selectedUmur = null;
        let selectedJenisKelamin = null;
        let kategoriFiltered = [];

        if (data.atlet_id) {
            // Jika atlet dipilih, hanya kategori tunggal yang boleh muncul
            const selectedAtlet = atlet.find((a) => a.id === data.atlet_id);
            if (!selectedAtlet) return;
            selectedUmur = selectedAtlet.umur;
            selectedJenisKelamin = selectedAtlet.jenis_kelamin;

            const genderMapping = {
                LAKI_LAKI: "TUNGGAL_PUTRA",
                PEREMPUAN: "TUNGGAL_PUTRI",
            };

            kategoriFiltered = kategoriTanding.filter(
                (kategori) =>
                    selectedUmur >= kategori.min_umur &&
                    (kategori.max_umur === null ||
                        selectedUmur <= kategori.max_umur) &&
                    kategori.jenis === genderMapping[selectedJenisKelamin] // Hanya kategori tunggal
            );
        } else if (data.tim_id) {
            // Jika tim dipilih, hanya kategori ganda yang boleh muncul
            const selectedTim = tim.find((t) => t.id === data.tim_id);
            if (!selectedTim || !selectedTim.atlet_1) return;
            selectedUmur = selectedTim.atlet_1.umur;
            selectedJenisKelamin = timOptions.find(
                (t) => t.value === data.tim_id
            )?.jenis_kelamin;

            // Jika jenis tim adalah "CAMPURAN", hanya tampilkan kategori "GANDA_CAMPURAN"
            if (selectedJenisKelamin === "Campuran") {
                kategoriFiltered = kategoriTanding.filter(
                    (kategori) => kategori.jenis === "GANDA_CAMPURAN"
                );
            } else {
                const genderMapping = {
                    LAKI_LAKI: "GANDA_PUTRA",
                    PEREMPUAN: "GANDA_PUTRI",
                };

                kategoriFiltered = kategoriTanding.filter(
                    (kategori) =>
                        selectedUmur >= kategori.min_umur &&
                        (kategori.max_umur === null ||
                            selectedUmur <= kategori.max_umur) &&
                        kategori.jenis === genderMapping[selectedJenisKelamin] // Hanya kategori ganda
                );
            }
        }

        setFilteredKategoriTanding(kategoriFiltered);
    }, [data.atlet_id, data.tim_id]);

    const kategoriTandingOptions = filteredKategoriTanding.map((kategori) => {
        let umurLabel = "Tanpa batasan umur";

        if (kategori.min_umur !== null && kategori.max_umur !== null) {
            umurLabel = `${kategori.min_umur} - ${kategori.max_umur} Tahun`;
        } else if (kategori.min_umur !== null && kategori.max_umur === null) {
            umurLabel = `${kategori.min_umur}> Tahun`; // Contoh: "18> Tahun" (lebih dari 18 tahun)
        }

        return {
            value: kategori.id,
            label: `${FormatCapital(kategori.jenis)} - ${
                kategori.kelompok_umur
            } (${umurLabel})`,
        };
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.kategori_tanding_id || (!data.atlet_id && !data.tim_id)) {
            Swal.fire({
                icon: "error",
                title: "Form Tidak Lengkap",
                text: "Harap pilih kategori tanding dan minimal satu peserta (atlet atau tim).",
            });
            return;
        }
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Anda akan menyimpan data pertandingan ini.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, simpan!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("tanding.store"), {
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Pertandingan berhasil disimpan.",
                        });
                    },
                    onError: (errors) => {
                        Swal.fire({
                            icon: "error",
                            title: "Kesalahan Validasi",
                            text: Object.values(errors).join("\n"),
                        });
                    },
                });
            }
        });
    };

    return (
        <Section title="Daftar Tanding">
            <FormContainer onSubmit={handleSubmit} className="p-4">
                <div className="grid grid-cols-1 gap-4">
                    {/* Pilihan Atlet */}
                    <SelectField
                        value={data.atlet_id}
                        label="Atlet"
                        options={atletOptions}
                        onChange={(val) => setData("atlet_id", val)}
                        disabled={!!data.tim_id}
                    />

                    {/* Pilihan Tim */}
                    <SelectField
                        value={data.tim_id}
                        label="Tim"
                        options={timOptions}
                        onChange={(val) => setData("tim_id", val)}
                        disabled={!!data.atlet_id}
                    />

                    {/* Pilihan Kategori Tanding */}
                    <SelectField
                        value={data.kategori_tanding_id}
                        label="Kategori Tanding"
                        isRequired
                        options={kategoriTandingOptions}
                        onChange={(val) => setData("kategori_tanding_id", val)}
                        disabled={!data.atlet_id && !data.tim_id}
                    />
                </div>
                <div className="mt-6 flex justify-between">
                    <button
                        type="submit"
                        className="px-4 py-2 text-white font-semibold bg-green-500/60 hover:bg-green-500 duration-200 rounded-md"
                        disabled={processing}
                    >
                        {processing ? "Menyimpan..." : "Simpan"}
                    </button>
                    <BackButton />
                </div>
            </FormContainer>
        </Section>
    );
}
