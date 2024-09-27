<?php

use App\Http\Controllers\API\{
    AuthenticationController,
    GuruController,
    KelasController,
    MapelController,
    SiswaController
};
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

        // Get All Users
        Route::get('user', function () {
            $users = User::all();
            return response()->json(['data' => $users, 'message' => 'Get data success', 'status' => 200], 200);
        });

        // Get By Id User
        Route::get('user/{username}', function ($username) {
            $user = User::where('username', $username)->first();
            if ($user) {
                return response()->json(['data' => $user, 'message' => 'Data berhasil ditampilkan', 'status' => 200], 200);
            }
            return response()->json(['message' => 'Data tidak ditemukan', 'status' => 404], 404);
        });

        // Start Guru
        Route::controller(GuruController::class)->prefix('guru')->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('restore', 'restoreDataGuru');
            Route::get('data-trash', 'showDeleteDataGuru');
            Route::delete('delete-permanent', 'deletePermanenDataGuru');
            Route::get('{nip}', 'show');
            Route::post('{nip}', 'update');
            Route::delete('{nip}', 'destroy');
            Route::delete('delete/{nip}', 'deletePermanenDataGuruById');
            Route::get('restore/{nip}', 'restoreDataGuruById');
        });
        // End Guru

        // Start Mapel
        Route::controller(MapelController::class)->prefix('mapel')->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('{id}', 'show');
            Route::put('{id}', 'update');
            Route::delete('{id}', 'destroy');
        });
        // End Mapel

        // Start Kelas
        Route::controller(KelasController::class)->prefix('kelas')->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('{id}', 'show');
            Route::put('{id}', 'update');
            Route::delete('{id}', 'destroy');
        });
        // End Kelas

        Route::get('user/{username}/guru', function ($username) {
            $user = User::where('username', $username)->first();
            return response()->json([
                'data' => [
                    'name' => $user->name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'status_id' => $user->status_id,
                    'guru' => [
                        'nip' => $user->guru->nip,
                        'nama' => $user->guru->nama,
                        'jenis_kelamin' => $user->guru->jenis_kelamin,
                        'no_hp' => $user->guru->no_hp,
                        'alamat' => $user->guru->alamat,
                        'image_profile' => $user->guru->image_profile
                    ]
                ],
                'message' => 'Get data success',
                'status' => 200
            ], 200);
        });
    });

    // Start Siswa
    Route::controller(SiswaController::class)->prefix('siswa')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('restore', 'restoreDataSiswa');
        Route::get('data-trash', 'showDeleteDataSiswa');
        Route::delete('delete-permanent', 'deletePermanenDataSiswa');
        Route::get('{nis}', 'show');
        Route::post('{nis}', 'update');
        Route::delete('{nis}', 'destroy');
        Route::delete('delete/{nis}', 'deletePermanenDataSiswaById');
        Route::get('restore/{nis}', 'restoreDataSiswaById');
    });
    // End Siswa

    Route::get('user/{username}/siswa', function ($username) {
        $user = User::where('username', $username)->first();
        return response()->json([
            'data' => [
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'siswa' => [
                    'nis' => $user->siswa->nis,
                    'nama' => $user->siswa->nama,
                    'jenis_kelamin' => $user->siswa->jenis_kelamin,
                    'no_hp' => $user->siswa->no_hp,
                    'alamat' => $user->siswa->alamat,
                    'image_profile' => $user->siswa->image_profile,
                ]
            ],
            'message' => 'Get data success',
            'status' => 200
        ], 200);
    });

    Route::get('logout', [AuthenticationController::class, 'logout']);
});
