<?php

use App\Http\Controllers\API\{AuthenticationController, GuruController, SiswaController};
use App\Http\Middleware\IsAdmin;
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

        
    });

    Route::controller(SiswaController::class)->group(function () {
        Route::get('siswa', 'index');
        Route::get('siswa/{nis}', 'show');
    });

    Route::get('siswa/{nis}', [SiswaController::class, 'show']);
    Route::get('guru/{nip}', [GuruController::class, 'show']);
    Route::post('guru/{nip}', [GuruController::class, 'addDataGuru']);

    Route::get('user/{username}', function ($username) {
        $user = User::where('username', $username)->first();
        return response()->json(['data' => $user, 'message' => 'Get data success', 'status' => 200], 200);
    });

    Route::get('logout', [AuthenticationController::class, 'logout']);
});
