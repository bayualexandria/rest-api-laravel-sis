<?php


use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;


Route::get('/', function () {
    return view('welcome');
});

// Route::get('/{route?}', function () {
//     return view('index');
// });


// Route::get('{any}', function () {
//     return view('index'); // or wherever your React app is bootstrapped.
// })->where('any', '.*');

URL::forceScheme('https');
