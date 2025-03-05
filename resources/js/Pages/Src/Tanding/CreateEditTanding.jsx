import SelectField from "@/Components/Forms/SelectField";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function CreateEditTanding() {
    const { kategoriTanding } = usePage().props;
    const [selectedKategori, setSelectedKategori] = useState("");

    const options = kategoriTanding.map((kategori) => ({
        value: kategori.id,
        label: kategori.jenis,
    }));

    return (
        <div>
            <SelectField
                value={selectedKategori}
                label="Kategori Tanding"
                isRequired
                options={options}
                onChange={setSelectedKategori}
            />
        </div>
    );
}
