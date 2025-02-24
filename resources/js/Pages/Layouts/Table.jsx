export default function TableItems({ title = "Data", data = [], columns = [] }) {
    return (
        <div className="max-w-screen mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Daftar {title}
                    </h3>
                </div>
                <div className="mt-3 md:mt-0">
                    <button
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Tambah {title}
                    </button>
                </div>
            </div>
            <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} className="py-3 px-6">{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                {columns.map((col, index) => (
                                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                                        {col.render ? col.render(item[col.key], item) : item[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
