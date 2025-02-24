import TableItems from "@/Pages/Layouts/Table";
import { usePage, Link } from "@inertiajs/react";

export default function ListPeserta() {
    const { atlet } = usePage().props;

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
        {
            key: "avatar",
            label: "Avatar",
            render: (value, item) => (
                <img
                    src={item.avatar || `https://ui-avatars.com/api/?name=${item.name}`}
                    alt={item.name}
                    className="w-10 h-10 rounded-full"
                />
            ),
        },
        { key: "name", label: "Nama" },
        { key: "jenis_kelamin", label: "Jenis Kelamin" },
        { key: "tanggal_lahir", label: "Tanggal Lahir" },
        { key: "nik", label: "NIK" },
        { key: "no_kk", label: "KK" },
        { key: "berat_badan", label: "Berat Badan (kg)" },
        { key: "tinggi_badan", label: "Tinggi Badan (cm)" },
        {
            key: "aksi",
            label: "Aksi",
            render: (value, item) => (
                <div className="text-left whitespace-nowrap">
                    <Link href={`/peserta/${item.id}`} className="py-2 leading-none px-3 font-medium text-green-600 bg-green-500/20 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg">
                        Detail
                    </Link>
                    <Link href={`/peserta/${item.id}/edit`} className="py-2 leading-none ml-2 px-3 font-medium text-indigo-600 bg-indigo-500/20 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                        Edit
                    </Link>
                    <Link href={`/peserta/${item.id}/delete`} className="py-2 leading-none ml-2 px-3 font-medium text-red-600 bg-red-500/20 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                        Delete
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <TableItems title="Peserta" data={formattedAtlet} columns={columns} />
    );
}
