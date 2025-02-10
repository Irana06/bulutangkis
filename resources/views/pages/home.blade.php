@extends('layouts.navigation')

@section('content')
    <div class="flex-1 bg-black text-white flex items-center justify-center pb-6">
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
            <img src="{{ asset('storage/img/background.jpg') }}" class="object-cover object-center w-full h-full"
                alt="img">
            <div class="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div class="absolute top-0 left-0 w-full flex-1 h-full text-center">
            <div class="space-y-2 relative z-10 flex flex-col justify-center items-center h-full text-center">
                <h1 class="text-5xl font-bold leading-tight mb-4">
                    Lorem ipsum dolor sit amet.
                </h1>
                <p class="text-lg text-gray-300 mb-8">
                    Molestias assumenda provident doloribus quos officiis.
                </p>
            </div>
        </div>
    </div>
@endsection
