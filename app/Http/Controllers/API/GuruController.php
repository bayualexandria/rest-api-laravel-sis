<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $guru = Guru::all();
        return response()->json(['data' => $guru, 'message' => `Data it's ok`, 'status' => 200], 200);
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
    public function show(string $nip)
    {
        $guru = Guru::where('nip', $nip)->first();
        if ($guru) {
            return response()->json(['data' => $nip, 'message' => 'Data guru dengan nip ' . $nip . ' berhasil ditampilkan', 'status' => 200], 200);
        }
        return response()->json(['message' => 'Data tidak ditemukan', 'status' => 403], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $nip)
    {
        return response()->json(['data' => $nip, 'message' => 'Data berhasil diubah', 'status' => 200], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
