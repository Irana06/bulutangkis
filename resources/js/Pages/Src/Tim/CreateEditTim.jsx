import { useEffect } from "react";
import { FormContainer } from "@/Components/Forms/FormContainer";
import InputField from "@/Components/Forms/InputField";
import { Section } from "@/Components/Forms/Section";
import SelectField from "@/Components/Forms/SelectField";
import FormatCapital from "@/Components/Utils/FormatCapital";
import { usePage, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function CreateEditTim() {
    const { atlet, kategoriTanding } = usePage().props;

    const { data, setData, post, processing } = useForm({
        atlet_id_1: "",
        atlet_id_2: "",
        nama_tim: "",
        jenis: "",
    });

    // Opsi Atlet untuk SelectField
    const atletOptions = atlet.map((atlet) => ({
        value: atlet.id,
        label: `${atlet.name} - ${FormatCapital(atlet.jenis_kelamin)} (${atlet.umur} Tahun)`,
        umur: atlet.umur,
        jenis_kelamin: atlet.jenis_kelamin,
        img: atlet.foto_profile_url,
    }));

    // Opsi Atlet 2 berdasarkan aturan jenis tim
    const atletOptionsForAtlet2 = atletOptions.filter((option) => {
        if (option.value === data.atlet_id_1) return false; // Tidak bisa memilih atlet yang sama

        const selectedAtlet = atletOptions.find(a => a.value === data.atlet_id_1);
        if (!selectedAtlet) return true; // Jika belum memilih Atlet 1, semua tetap tersedia

        // Jika jenis tim adalah "CAMPURAN", tidak ada batasan
        if (data.jenis === "CAMPURAN") {
            return true;
        }

        // Pastikan kategoriTanding tersedia dan memiliki data sebelum find()
        if (!Array.isArray(kategoriTanding) || kategoriTanding.length === 0) {
            return false; // Jika kategoriTanding tidak ada, tidak bisa memilih atlet 2
        }

        // Cari kategori berdasarkan umur atlet 1
        const kategori = kategoriTanding.find(k =>
            selectedAtlet.umur >= k.min_umur && selectedAtlet.umur <= k.max_umur
        );

        if (!kategori) return false; // Jika tidak ada kategori yang cocok, tidak bisa memilih atlet 2

        // Atlet 2 harus dalam rentang umur kategori dan memiliki jenis kelamin yang sama
        return option.jenis_kelamin === selectedAtlet.jenis_kelamin &&
               option.umur >= kategori.min_umur &&
               option.umur <= kategori.max_umur;
    });

    // Reset Atlet 2 jika tidak valid setelah perubahan Atlet 1 atau Jenis
    useEffect(() => {
        if (data.atlet_id_1) {
            const isAtlet2Valid = atletOptionsForAtlet2.some(a => a.value === data.atlet_id_2);
            if (!isAtlet2Valid) {
                setData("atlet_id_2", ""); // Reset Atlet 2 jika tidak valid
            }
        } else {
            setData("atlet_id_2", ""); // Reset jika Atlet 1 dikosongkan
        }
    }, [data.atlet_id_1, data.jenis]);

    const jenisTimOptions = [
        { value: "GANDA", label: "Ganda" },
        { value: "CAMPURAN", label: "Campuran" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.atlet_id_1 || !data.atlet_id_2) {
            Swal.fire({
                icon: "error",
                title: "Form Tidak Lengkap",
                text: "Harap pilih dua atlet untuk membentuk tim.",
            });
            return;
        }

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Anda akan menyimpan data tim ini.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, simpan!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("tim.store"), {
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Tim berhasil disimpan.",
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
        <Section title="Buat Tim">
            <FormContainer onSubmit={handleSubmit} className="p-4">
                <InputField
                    label="Nama Tim"
                    name="nama_tim"
                    placeholder="Nama Tim"
                    value={data.nama_tim}
                    onChange={(e) => setData("nama_tim", e.target.value)}
                    required
                />
                <div className="grid grid-cols-1 gap-4">
                    {/* Pilihan Jenis Tim */}
                    <SelectField
                        value={data.jenis}
                        label="Jenis Tim"
                        options={jenisTimOptions}
                        onChange={(val) => setData("jenis", val)}
                        isRequired
                    />

                    {/* Pilihan Atlet 1 */}
                    <SelectField
                        value={data.atlet_id_1}
                        label="Atlet 1"
                        options={atletOptions}
                        onChange={(val) => setData("atlet_id_1", val)}
                        isRequired
                    />

                    {/* Pilihan Atlet 2 (berdasarkan aturan jenis tim) */}
                    <SelectField
                        value={data.atlet_id_2}
                        label="Atlet 2"
                        options={atletOptionsForAtlet2}
                        onChange={(val) => setData("atlet_id_2", val)}
                        disabled={!data.atlet_id_1}
                        isRequired
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
                </div>
            </FormContainer>
        </Section>
    );
}
