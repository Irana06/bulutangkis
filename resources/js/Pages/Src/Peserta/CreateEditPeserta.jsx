import { FormContainer } from "@/Components/forms/FormContainer";
import InputField from "@/Components/forms/InputField";
import { Section } from "@/Components/forms/Section";
import { useForm as useInertiaForm } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { usePage } from "@inertiajs/react";

export default function CreateEditPeserta() {
    const { atlet } = usePage().props;

    const form = useForm();

    // Inertia useForm untuk data form
    const { data, setData, post, put, processing, errors } = useInertiaForm({
        name: atlet?.name || "",
        jenis_kelamin: atlet?.jenis_kelamin || "",
        nik: atlet?.nik || "",
        no_kk: atlet?.no_kk || "",
        tanggal_lahir: atlet?.tanggal_lahir || "",
        tempat_lahir: atlet?.tempat_lahir || "",
        berat_badan: atlet?.berat_badan || "",
        tinggi_badan: atlet?.tinggi_badan || "",
        avatar: atlet?.foto_profile_url || null,
    });

    const handleSubmit = (formData) => {
        // Validasi form kosong kecuali berat badan dan tinggi badan
        if (
            !data.name ||
            !data.jenis_kelamin ||
            !data.nik ||
            !data.no_kk ||
            !data.tanggal_lahir ||
            !data.tempat_lahir
        ) {
            Swal.fire({
                icon: "error",
                title: "Form Tidak Lengkap",
                text: "Harap isi semua field yang wajib (*) sebelum menyimpan.",
            });
            return;
        }

        // Hapus field berat_badan dan tinggi_badan jika kosong
        const submitData = { ...data };
        if (!submitData.berat_badan) {
            delete submitData.berat_badan;
        }
        if (!submitData.tinggi_badan) {
            delete submitData.tinggi_badan;
        }

        if (atlet) {
            put(route("peserta.update", atlet.id), {
                data: submitData,
                onError: (errors) => {
                    // Tangkap pesan error dari backend dan tampilkan menggunakan SweetAlert2
                    const errorMessages = Object.values(errors).flat().join('<br>');
                    Swal.fire({
                        icon: "error",
                        title: "Kesalahan Validasi",
                        html: errorMessages,
                    });
                },
            });
        } else {
            post(route("peserta.store"), {
                data: submitData,
                onError: (errors) => {
                    // Tangkap pesan error dari backend dan tampilkan menggunakan SweetAlert2
                    const errorMessages = Object.values(errors).flat().join('<br>');
                    Swal.fire({
                        icon: "error",
                        title: "Kesalahan Validasi",
                        html: errorMessages,
                    });
                },
            });
        }
    };

    return (
        <Section title={atlet ? "Edit Atlet" : "Tambah Atlet"}>
            <FormContainer form={form} onSubmit={handleSubmit} className="p-4">
                {/* Wrapper untuk grid layout */}
                {atlet?.foto_profile_url ? (
                    <div className="mb-4">
                        <img
                            src={atlet.foto_profile_url}
                            alt="Foto Profile"
                            className="w-24 h-24 rounded-full"
                        />
                    </div>
                ) : null}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Nama"
                        name="name"
                        placeholder="Nama Peserta"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                        required
                    />
                    <InputField
                        label="Jenis Kelamin"
                        name="jenis_kelamin"
                        placeholder="Jenis Kelamin"
                        type="select"
                        options={[
                            { value: "LAKI_LAKI", label: "Laki-Laki" },
                            { value: "PEREMPUAN", label: "Perempuan" },
                        ]}
                        value={data.jenis_kelamin}
                        onChange={(e) => setData("jenis_kelamin", e.target.value)}
                        error={errors.jenis_kelamin}
                        required
                    />
                    <InputField
                        label="NIK"
                        name="nik"
                        placeholder="16 digit NIK"
                        value={data.nik}
                        onChange={(e) => setData("nik", e.target.value)}
                        error={errors.nik}
                        required
                    />
                    <InputField
                        label="No KK"
                        name="no_kk"
                        placeholder="16 digit No KK"
                        value={data.no_kk}
                        onChange={(e) => setData("no_kk", e.target.value)}
                        error={errors.no_kk}
                        required
                    />
                    <InputField
                        label="Tanggal Lahir"
                        name="tanggal_lahir"
                        type="date"
                        value={data.tanggal_lahir}
                        onChange={(e) => setData("tanggal_lahir", e.target.value)}
                        error={errors.tanggal_lahir}
                        required
                    />
                    <InputField
                        label="Tempat Lahir"
                        name="tempat_lahir"
                        placeholder="Tempat Lahir"
                        value={data.tempat_lahir}
                        onChange={(e) => setData("tempat_lahir", e.target.value)}
                        error={errors.tempat_lahir}
                        required
                    />
                    <InputField
                        label="Berat Badan (kg)"
                        name="berat_badan"
                        type="number"
                        step="0.1"
                        placeholder="Berat Badan"
                        value={data.berat_badan}
                        onChange={(e) => setData("berat_badan", e.target.value)}
                        error={errors.berat_badan}
                    />
                    <InputField
                        label="Tinggi Badan (cm)"
                        name="tinggi_badan"
                        type="number"
                        step="0.1"
                        placeholder="Tinggi Badan"
                        value={data.tinggi_badan}
                        onChange={(e) => setData("tinggi_badan", e.target.value)}
                        error={errors.tinggi_badan}
                    />
                    <InputField
                        label="Foto Profile"
                        name="foto_profile"
                        type="file"
                        onChange={(e) => setData("foto_profile", e.target.files[0])}
                        error={errors.foto_profile}
                    />
                </div>
                {/* Tombol submit di bawah form */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 text-white font-semibold bg-cyan-500/60 hover:bg-cyan-500 duration-200 rounded-md"
                        disabled={processing}
                    >
                        {processing ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </FormContainer>
        </Section>
    );
}
