import FormatCapital from "@/Components/Utils/FormatCapital";
import TableItems from "@/Pages/Layouts/Table";
import { Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function ListTim() {
    const { tim } = usePage().props;
    console.log(tim);
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);

    const columns = [
        { key: "nama", label: "Nama Tim" },
        { key: "jenis", label: "Jenis Tim" },
        { key: "atlet1", label: "Peserta 1" },
        { key: "atlet2", label: "Peserta 2" },
        {
            key: "aksi",
            label: "Aksi",
            render: (value, item, index) => (
                <div
                    className={`${
                        dropdownOpenIndex === index ? "flex flex-col" : ""
                    } text-left  whitespace-nowrap`}
                >
                    <Link
                        href={`/tim/${item.id}/detail`}
                        className={`py-2 leading-none px-3 font-medium text-green-600 bg-green-500/20 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            dropdownOpenIndex === index ? "" : "ml-2"
                        } `}
                    >
                        Detail
                    </Link>
                    <Link
                        href={`/tim/${item.id}/edit`}
                        className={`py-2 leading-none mt-2 px-3 font-medium text-indigo-600 bg-indigo-500/20 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg ${
                            dropdownOpenIndex === index ? "" : "ml-2"
                        } `}
                    >
                        Edit
                    </Link>
                </div>
            ),
            hidden: true,
        },
    ];

    // Transformasi data agar sesuai dengan format tabel
    const tableData = tim.map((item) => ({
        id: item.id,
        nama: item.nama_tim,
        jenis: FormatCapital(item.jenis),
        atlet1: item.atlet_1?.name,
        atlet2: item.atlet_2?.name,

    }));

    return (
        <TableItems
            title="Tim"
            data={tableData}
            columns={columns}
            dropdownOpenIndex={dropdownOpenIndex}
            setDropdownOpenIndex={setDropdownOpenIndex}
        />
    );
}
