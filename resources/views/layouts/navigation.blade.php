""<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    @vite('resources/css/app.css')
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"/>
</head>

<body class="antialiased">
    <header x-data="{ isOpen: false, isCollapsed: false }"
        :class="isCollapsed ? 'rounded-b-3xl h-12 w-1/3 opacity-90' : 'rounded-3xl h-20 w-4/5 opacity-100'"
        class="fixed inset-x-0 top-4 z-30 mx-auto w-full max-w-screen-lg border border-gray-100 bg-white/80 shadow-lg backdrop-blur-lg transition-all duration-500 ease-in-out py-2"
        :style="isCollapsed ? 'transform: translateY(-70%)' : 'transform: translateY(0)'">

        <div class="px-6 py-2 flex items-center justify-between transition-all duration-500"
            :class="isCollapsed ? 'opacity-0 scale-90 overflow-hidden' : 'opacity-100 scale-100'">

            <!-- Logo -->
            <div class="flex shrink-0">
                <a aria-current="page" class="flex items-center" href="/">
                    <img :class="isCollapsed ? 'h-0 opacity-0' : 'h-12 w-auto opacity-100'"
                        src="{{ asset('storage/img/logo.png') }}" alt="smkmupa" class="transition-all duration-300">
                    <p class="sr-only">Website Title</p>
                </a>
            </div>

            <!-- Tombol Menu (Mobile) -->
            <button @click="isOpen = !isOpen"
                class="md:hidden p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all">
                <template x-if="!isOpen">
                    <i class="fa-solid fa-bars text-xl"></i>
                </template>
                <template x-if="isOpen">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </template>
            </button>

            <!-- Menu Utama (Desktop) -->
            <div class="hidden md:flex md:items-center md:gap-5 transition-all duration-300"
                :class="isCollapsed ? 'opacity-0 scale-90 overflow-hidden' : 'opacity-100 scale-100'">
                <a class="rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100" href="#">Home</a>
                <a class="rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100" href="#">Cek Data</a>
            </div>

            <!-- Tombol Login & Registrasi -->
            <div class="hidden md:flex items-center gap-3 transition-all duration-300"
                :class="isCollapsed ? 'opacity-0 scale-90 overflow-hidden' : 'opacity-100 scale-100'">
                <a class="hidden sm:inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-200"
                    href="/login">Registrasi</a>
                <a class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                    href="/login">Masuk</a>
            </div>
        </div>

        <!-- Tombol Collapse Navbar -->
        <button @click="isCollapsed = !isCollapsed; isOpen = false"
            class="absolute bottom-[-14px] left-1/2 -translate-x-1/2 bg-gray-200 text-gray-900 rounded-full p-1 shadow-md hover:bg-gray-300 transition-all">
            <template x-if="!isCollapsed">
                <i class="fa-solid fa-angles-up"></i>
            </template>
            <template x-if="isCollapsed">
                <i class="fa-solid fa-angles-down"></i>
            </template>
        </button>

        <!-- Menu Dropdown (Mobile) -->
        <div x-show="isOpen" x-transition class="md:hidden bg-white shadow-lg py-4 mt-2 rounded-lg overflow-hidden">
            <a class="block px-4 py-2 text-gray-900 hover:bg-gray-100 w-full text-center" href="#">Home</a>
            <a class="block px-4 py-2 text-gray-900 hover:bg-gray-100 w-full text-center" href="#">Cek Data</a>
            <a class="block px-4 py-2 text-blue-600 font-semibold hover:bg-gray-100 w-full text-center" href="/login">Registrasi</a>
            <a class="block px-4 py-2 bg-blue-600 text-white font-semibold rounded-md w-4/5 text-center hover:bg-blue-500" href="/login">Masuk</a>
        </div>
    </header>
</body>

</html>
