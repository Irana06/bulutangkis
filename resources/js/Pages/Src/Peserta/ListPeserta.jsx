import TableItems from "@/Pages/Layouts/Table";
import { usePage } from "@inertiajs/react";

export default function ListPeserta() {
    const { atlet } = usePage().props;
    console.log(atlet)

    // Ubah format jenis_kelamin menjadi "Laki-Laki" / "Perempuan"
    const formattedAtlet = atlet.map((item) => ({
        ...item,
        jenis_kelamin:
            item.jenis_kelamin === "LAKI_LAKI"
                ? "Laki-Laki"
                : item.jenis_kelamin === "PEREMPUAN"
                ? "Perempuan"
                : item.jenis_kelamin,
    }));

    const columns = [
        { key: "name", label: "Nama" },
        { key: "jenis_kelamin", label: "Jenis Kelamin" },
        { key: "tanggal_lahir", label: "Tanggal Lahir" },
        { key: "nik", label: "NIK" },
        { key: "no_kk", label: "KK" },
        { key: "berat_badan", label: "Berat Badan (kg)" },
        { key: "tinggi_badan", label: "Tinggi Badan (cm)" },
    ];

    return <TableItems title="Peserta" data={formattedAtlet} columns={columns} />;
}
