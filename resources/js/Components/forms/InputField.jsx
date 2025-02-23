import React from "react";

const InputField = ({
    label,
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    className = "",
}) => {
    return (
        <div className="mb-5">
            {label && (
                <label
                    htmlFor={name}
                    className="mb-3 block text-base font-medium text-[#07074D]"
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${className}`}
            />
        </div>
    );
};

export default InputField;
