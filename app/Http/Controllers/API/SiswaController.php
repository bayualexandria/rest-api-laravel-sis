<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Siswa::all();
        return response()->json(['data' => $user, 'message' => 'Success', 'status' => 200], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $nis)
    {
        $siswa = Siswa::where('nis', $nis)->first();
        if ($siswa) {
            return response()->json(['data' => $siswa, 'message' => 'Data siswa dengan nis ' . $nis . ' berhasil ditampilkan', 'status' => 200], 200);
        }
        return response()->json(['message' => 'Data tidak ditemukan', 'status' => 403], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $nis)
    {
        return response()->json(['data' => $request->nama, 'message' => 'Data Ok', 'status' => 200], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
