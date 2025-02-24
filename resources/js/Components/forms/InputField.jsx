import React from "react";

const FormInput = ({
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
    return (
        <div className="mb-5">
            {label && (
                <label
                    htmlFor={name}
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    {label} {required && <span className="text-red-500">*</span>}
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
                        <option key={option.value} value={option.value} className="">
                            {option.label}
                        </option>
                    ))}
                </select>
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

export default FormInput;
