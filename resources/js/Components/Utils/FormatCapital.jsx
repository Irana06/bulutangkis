export default function FormatCapital(text) {
    return text
        .toLowerCase()
        .replace(/_/g, " ") // Ganti underscore dengan spasi
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Kapitalisasi setiap kata
}
