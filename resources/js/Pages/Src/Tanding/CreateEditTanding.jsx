import { FormContainer } from "@/Components/Forms/FormContainer";
import SelectField from "@/Components/Forms/SelectField";
import FormatCapital from "@/Components/Utils/FormatCapital";
import { usePage, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function CreateEditTanding() {
    const { kategoriTanding, atlet, tim } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        atlet_id: "",
        tim_id: "",
        kategori_tanding_id: "",
    });

    const options = kategoriTanding.map((kategori) => ({
        value: kategori.id,
        label: `${kategori.tingkat} - ${FormatCapital(kategori.jenis)} (${
            kategori.min_umur
        } - ${kategori.max_umur} Tahun)`,
    }));

    const atletOptions = atlet.map((atlet) => ({
        value: atlet.id,
        label: `${atlet.name} - ${FormatCapital(atlet.jenis_kelamin)} (${
            atlet.umur
        } Tahun)`,
        img: atlet.foto_profile_url,
    }));

    const timOptions = tim.map((tim) => ({
        value: tim.id,
        label: `${tim.nama_tim}`,
    }));

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
        <FormContainer onSubmit={handleSubmit} className="p-4">
            <SelectField
                value={data.kategori_tanding_id}
                label="Kategori Tanding"
                isRequired
                options={options}
                onChange={(val) => setData("kategori_tanding_id", val)}
            />
            <SelectField
                value={data.atlet_id}
                label="Atlet"
                options={atletOptions}
                onChange={(val) => setData("atlet_id", val)}
            />
            <SelectField
                value={data.tim_id}
                label="Tim"
                options={timOptions}
                onChange={(val) => setData("tim_id", val)}
            />
            <div className="mt-6 flex justify-between">
                <button
                    type="submit"
                    className="px-4 py-2 text-white font-semibold bg-green-500/60 hover:bg-green-500 duration-200 rounded-md"
                    disabled={processing}
                >
                    {processing ? "Menyimpan..." : "Simpan"}
                </button>
                {/* <BackButton /> */}
            </div>
        </FormContainer>
    );
}
