<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="{{ asset('storage/img/logo.png') }}">
    <title>PDM Sleman Bulutangkis</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />

    @vite([
        'resources/css/app.css',
        'resources/js/app.jsx',
    ])
</head>
<body>
    <div id="app" data-page="{{ json_encode($page) }}"></div>

    @viteReactRefresh
</body>
</html>
