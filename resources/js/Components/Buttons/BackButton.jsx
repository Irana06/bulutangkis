import React from "react";

export default function BackButton() {
    return (
        <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 text-cyan-400 font-semibold border border-cyan-400 hover:bg-cyan-400 hover:text-white duration-200 rounded-md"
        >
            Kembali
        </button>
    );
}
