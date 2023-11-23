<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!-- Meta Information -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

        <title>Crex</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="theme-color" content="#FFFFFF">
        <meta name="title" content="Crex">

        <link rel="icon" href="/images/og/tapp-android.png" type="image/png">
        <link href="/css/app.css" rel="stylesheet">
    </head>
    <body class="bg-white">
      <div id="crex">
        <main-shell></main-shell>
      </div>

      <script src="{{ mix('/js/app.js') }}"></script>
    </body>
</html>
