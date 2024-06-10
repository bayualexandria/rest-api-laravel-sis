<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Mapel;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $siswa = Siswa::where('nis', $nis)->first();
        if ($request->file('image_profile')) {
            if (!$siswa->image_profile) {

                $image = $request->file('image_profile');
                $image->storeAs('public/assets/images/nis/' . $nis . '/', $image->hashName());
            }

            Storage::delete('public/' . $siswa->image_profile);

            $image = $request->file('image_profile');
            $image->storeAs('public/assets/images/siswa/' . $nis . '/', $image->hashName());
        }

        $data = [
            'nis' => $nis,
            'nama' => $request->nama
                ? $request->nama
                : $siswa->nama,
            'jenis_kelamin' => $request->jenis_kelamin
                ? $request->jenis_kelamin
                : $siswa->jenis_kelamin,
            'no_hp' => $request->no_hp
                ? $request->no_hp
                : $siswa->no_hp,
            'image_profile' => $request->file('image_profile') ? 'assets/images/siswa/' . $nis . '/' . $image->hashName() : $siswa->image_profile,
            'alamat' => $request->alamat
                ? $request->alamat
                : $siswa->alamat
        ];

        $dataSiswa = $siswa->update($data);

        return response()->json(['data' => $data, 'process' => $dataSiswa, 'message' => 'Data berhasil diubah', 'status' => 200], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $nis)
    {
        $siswa = Siswa::where('nis', $nis)->first();
        $user = User::where('username', $nis)->first();
        if (!$siswa) {
            return response()->json(['message' => 'Data yang anda hapus tidak ada!', 'status' => 403], 403);
        }
        $siswa->delete();
        $user->delete();
        return response()->json(['message' => "Data dengan NIS {$nis} berhasil dihapus!", 'status' => 200], 200);
    }
}
