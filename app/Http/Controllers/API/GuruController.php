<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $guru = Guru::where('nip', $nip)->first();
        if ($request->hasFile('image_profile')) {
            if ($guru->image_profile == null) {
                // $image = $request->image_profile->store('public/assets/images/guru/' . $nip);
                $image = $request->file('image_profile');
                $image->storeAs('public/assets/images/guru/' . $nip . '/', $image->hashName());
            } else {
                // Storage::delete($guru->image_profile);
                // $image = $request->image_profile->store('public/assets/images/guru/' . $nip);
                $image = $request->file('image_profile');
                $image->storeAs('public/assets/images/guru/' . $nip . '/', $image->hashName());

                //delete old image
                Storage::delete('public/' . basename($guru->image_profile));
            }
        }

        $data = [
            'nip' => $nip,
            'nama' => $guru->nama
                ? $guru->nama
                : $request->nama,
            'jenis_kelamin' => $guru->jenis_kelamin
                ? $guru->jenis_kelamin
                : $request->jenis_kelamin,
            'no_hp' => $guru->no_hp
                ? $guru->no_hp
                : $request->no_hp,
            'image_profile' => 'assets/images/guru/' . $nip . '/' . $image->hashName(),
            'alamat' => $request->alamat
                ? $request->alamat
                : $guru->alamat
        ];

        $dataGuru = $guru->update($data);

        return response()->json(['data' => $data, 'process' => $dataGuru, 'message' => 'Data berhasil diubah', 'status' => 200], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
