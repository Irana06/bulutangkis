@extends('layouts.navigation')

@section('content')
    <div class="flex-1 bg-black text-white flex items-center justify-center pb-6">
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
            <img src="{{ asset('storage/img/background.jpg') }}" class="object-cover object-center w-full h-full"
                alt="img">
            <div class="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div class="absolute top-0 left-0 w-full flex-1 h-full text-center">
            <div class="space-y-4 relative z-10 flex flex-col justify-center items-center h-full text-center">
                <h1 class="text-5xl font-bold leading-tight mb-4">
                    Lorem ipsum dolor sit amet.
                </h1>
                <p class="text-lg text-gray-300 mb-6">
                    Molestias assumenda provident doloribus quos officiis.
                </p>
                <!-- Tombol Daftar Sekarang -->
                <button id="openModal"
                    class="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer">
                    Daftar Sekarang!
                </button>
            </div>
        </div>
    </div>

    <!-- Modal Registrasi -->
    <div id="modalRegistrasi"
        class="fixed inset-0 z-50 w-screen h-screen bg-black/60 flex items-center justify-center opacity-0 invisible pointer-events-none transition-opacity duration-300">
        <div class="relative bg-white rounded-3xl p-10 px-10 shadow-2xl w-full max-w-4xl">

            <!-- Tombol Close -->
            <button id="closeModal"
                class="absolute top-4 right-6 text-red-400 hover:text-red-700 transition-colors scale-120 text-xl cursor-pointer">
                &times;
            </button>

            <h2 class="text-xl font-semibold text-center mb-6">Registrasi Kontingen</h2>

            <form class="space-y-6">
                <!-- Row pertama -->
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <label for="namaKontingen" class="block text-left text-sm font-medium text-gray-600">Nama
                            Kontingen</label>
                        <input id="namaKontingen" name="namaKontingen" type="text" placeholder="Masukkan nama kontingen"
                            class="w-full h-12 px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    </div>
                    <div>
                        <label for="emailKontingen" class="block text-left text-sm font-medium text-gray-600">Email
                            Kontingen</label>
                        <input id="emailKontingen" name="emailKontingen" type="email"
                            placeholder="Masukkan email kontingen"
                            class="w-full h-12 px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    </div>
                </div>

                <!-- Row kedua -->
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <label for="password" class="block text-left text-sm font-medium text-gray-600">Password</label>
                        <input id="password" name="password" type="password" placeholder="Masukkan password"
                            class="w-full h-12 px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    </div>
                    <div>
                        <label for="retypePassword" class="block text-left text-sm font-medium text-gray-600">Retype
                            Password</label>
                        <input id="retypePassword" name="retypePassword" type="password" placeholder="Ulangi password"
                            class="w-full h-12 px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    </div>
                </div>

                <!-- Row ketiga -->
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="penanggungJawab" class="block text-left text-sm font-medium text-gray-600">
                            Nama Penanggung Jawab
                        </label>
                        <input id="penanggungJawab" name="penanggungJawab" type="text"
                            placeholder="Masukkan nama penanggung jawab"
                            class="w-full h-12 px-4 py-3 mt-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="noTelepon" class="block text-left text-sm font-medium text-gray-600">
                            Nomor Telepon Penanggung Jawab
                        </label>
                        <input id="noTelepon" name="noTelepon" type="tel" placeholder="Masukkan nomor telepon"
                            class="w-full h-12 px-4 py-3 mt-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                </div>

                <!-- Row keempat -->
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="asalKontingen" class="block text-left text-sm font-medium text-gray-600">
                            Asal Kontingen
                        </label>
                        <select id="asalKontingen" name="asalKontingen"
                            class="w-full h-12 px-4 py-3 mt-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="dalamNegeri">Dalam Negeri</option>
                            <option value="luarNegeri">Luar Negeri</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="negara" class="block text-left text-sm font-medium text-gray-600">
                            Negara
                        </label>
                        <select id="negara" name="negara"
                            class="w-full h-12 px-4 py-3 mt-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="indonesia">Indonesia</option>
                            <option value="singapura">Singapura</option>
                        </select>
                    </div>
                </div>

                <!-- Row kelima -->
                <div>
                    <label htmlFor="alamat" class="block text-left text-sm font-medium text-gray-600">
                        Alamat Lengkap
                    </label>
                    <input id="alamat" name="alamat" type="text" placeholder="Masukkan alamat lengkap"
                        class="w-full h-12 px-4 py-3 mt-2 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <!-- Tombol Registrasi -->
                <button type="submit"
                    class="w-full h-12 bg-gradient-to-b from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:scale-105 hover:from-blue-800 hover:to-indigo-900 transition duration-500 cursor-pointer">
                    Daftar
                </button>
            </form>

            <p class="text-sm text-black mt-4 text-center">
                Sudah punya akun?
                <a href="/login" class="text-indigo-600 hover:text-indigo-700">Masuk sekarang</a>
            </p>
        </div>
    </div>

    <!-- Script untuk Modal -->
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const modal = document.getElementById("modalRegistrasi");
            const openModal = document.getElementById("openModal");
            const closeModal = document.getElementById("closeModal");
            const modalContent = modal.querySelector(".relative.bg-white");

            openModal.addEventListener("click", function() {
                modal.classList.remove("opacity-0", "invisible", "pointer-events-none");
            });

            closeModal.addEventListener("click", function() {
                modal.classList.add("opacity-0", "invisible", "pointer-events-none");
            });

            window.addEventListener("click", function(event) {
                if (event.target === modal) {
                    modal.classList.add("opacity-0", "invisible", "pointer-events-none");
                }
            });

            modal.addEventListener("click", function(event) {
                if (!modalContent.contains(event.target)) {
                    event.stopPropagation(); // Mencegah event bubbling
                }
            });
        });
    </script>
@endsection
