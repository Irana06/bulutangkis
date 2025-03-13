import React, { useState } from "react";
import { CloudUpload } from "lucide-react";

const InputField = ({
    label,
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    options = [],
    className = "",
    required = false,
}) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        onChange && onChange(e);

        if (uploadedFile && uploadedFile.type.startsWith("image")) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(uploadedFile);
        } else {
            setPreview(null);
        }
    };

    return (
        <div className="mb-5">
            {label && (
                <label
                    htmlFor={name}
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    {label}{" "}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}

            {type === "select" ? (
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${className}`}
                >
                    <option value="" disabled>
                        {placeholder || "Pilih opsi"}
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : type === "file" ? (
                <div className="relative">
                    {/* Label tetap ada, tetapi preview tidak di dalamnya */}
                    <label
                        title="Click to upload"
                        htmlFor={name}
                        className="cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 hover:text-blue-500 duration-300"
                    >
                        <div className="w-max relative">
                            <CloudUpload className="w-12" size={40} />
                        </div>
                        <div className="relative">
                            <span className="block text-base font-semibold text-blue-900 group-hover:text-blue-500 duration-300">
                                {file ? file.name : "Upload a file"}
                            </span>
                            <span className="mt-0.5 block text-sm text-gray-500">
                                Max 2 MB
                            </span>
                        </div>
                    </label>

                    {/* Input tetap hidden */}
                    <input
                        hidden
                        type="file"
                        name={name}
                        id={name}
                        onChange={handleFileChange}
                        required={required}
                    />

                    {/* Preview Gambar */}
                    {preview && (
                        <div className="p-6 relative z-10">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-24 h-24 object-cover rounded-md"
                            />
                        </div>
                    )}
                </div>
            ) : (
                <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${className}`}
                />
            )}
        </div>
    );
};

export default InputField;
