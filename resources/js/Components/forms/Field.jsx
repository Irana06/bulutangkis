export default function Field({ label, value, className }) {
    return (
        <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-500">{label}</span>
            <span className={`text-lg font-medium text-gray-800 ${className}`}>
                {value || "-"}
            </span>
        </div>
    );
}
