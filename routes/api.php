<?php

use App\Http\Controllers\API\{AuthenticationController, GuruController, SiswaController};
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Authentication verification email and reset password
Route::controller(AuthenticationController::class)->prefix('auth')->group(function () {
    // Login Portal Siswa
    Route::post('login', 'login');
    // Login Portal Admin
    Route::post('login-admin', 'admin');
    Route::post('register', 'register');
    Route::get('verify/{email}', 'emailVerify');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::middleware(['isAdmin'])->group(function () {

        Route::get('user', function () {
            $users = User::all();
            return response()->json(['data' => $users, 'message' => 'Get data success', 'status' => 200], 200);
        });

        Route::controller(GuruController::class)->prefix('guru')->group(function () {
            Route::get('/', 'index');
            Route::get('{nip}', 'show');
        });
    });


    Route::controller(SiswaController::class)->prefix('siswa')->group(function () {
        Route::get('/', 'index');
        Route::get('{nis}', 'show');
    });

    Route::get('user/{username}', function ($username) {
        $user = User::where('username', $username)->first();
        return response()->json(['data' => $user, 'message' => 'Get data success', 'status' => 200], 200);
    });

    Route::get('logout', [AuthenticationController::class, 'logout']);
});
