<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

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
        $validation = Validator::make($request->all(), [
            'nip' => 'required|min:18|numeric|unique:guru',
            'nama' => 'required',
            'jenis_kelamin' => 'required',
            'no_hp' => 'required',
            'image_profile' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'alamat' => 'required'
        ], [
            'nip.required' => 'NIP harus diisi',
            'nip.min' => 'NIP minimal 18 karakter',
            'nip.unique' => 'NIP yang anda masukan sudah terdaftar',
            'nip.numeric' => 'Yang anda masukan bukan NIP',
            'nama.required' => 'Nama harus diisi',
            'jenis_kelamin.required' => 'Jenis kelamin harus diisi',
            'no_hp.required' => 'No. Handphone harus diisi',
            'image_profile.required' => 'Foto profile harus diisi',
            'image_profile.image' => 'Yang anda masukan bukan foto',
            'image_profile.mimes' => 'Format yang anda masukan bukan foto (jpeg,png,jg,gif)',
            'image_profile.max' => 'Maksimal kapasitas foto 2MB',
            'alamat.required' => 'Alamat harus diisi',
        ]);

        if ($validation->fails()) {
            return response()->json(['message' => $validation->errors(), 'status' => 403], 403);
        }

        if (User::where('username', $request->nip)->first()) {
            return response()->json([
                'message' => "Data guru dengan NIP {$request->nip} sudah terdaftar pada user lain!",
                'status' => 403,
            ], 403);
        }
        if (!User::where('username', $request->nip)->first()) {
            return response()->json([
                'message' => "Data yang diinputkan belum didaftarkan user login-nya!",
                'status' => 403,
            ], 403);
        }
        $image = $request->file('image_profile');
        $image->storeAs('public/assets/images/guru/' . $request->nip . '/', $image->hashName());
        $data = [
            'nip' => $request->nip,
            'nama' => $request->nama,
            'jenis_kelamin' => $request->jenis_kelamin,
            'no_hp' => $request->no_hp,
            'image_profile' => 'assets/images/guru/' . $request->nip . '/' . $image->hashName(),
            'alamat' => $request->alamat
        ];
        $guru = Guru::create($data);
        return response()->json([
            'data' => $guru,
            'message' => "User dengan nama {$request->nama} berhasil ditambahkan!",
            'status' => 201,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $nip)
    {
        $guru = Guru::where('nip', $nip)->first();
        if ($guru) {
            return response()->json(['data' => $guru, 'message' => 'Data guru dengan nip ' . $nip . ' berhasil ditampilkan', 'status' => 200], 200);
        }
        return response()->json(['message' => 'Data tidak ditemukan', 'status' => 403], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $nip)
    {
        $guru = Guru::where('nip', $nip)->first();
        if ($request->file('image_profile')) {
            if (!$guru->image_profile) {

                $image = $request->file('image_profile');
                $image->storeAs('public/assets/images/guru/' . $nip . '/', $image->hashName());
            }

            Storage::delete('public/' . $guru->image_profile);

            $image = $request->file('image_profile');
            $image->storeAs('public/assets/images/guru/' . $nip . '/', $image->hashName());
        }

        $data = [
            'nip' => $nip,
            'nama' => $request->nama
                ? $request->nama
                : $guru->nama,
            'jenis_kelamin' => $request->jenis_kelamin
                ? $request->jenis_kelamin
                : $guru->jenis_kelamin,
            'no_hp' => $request->no_hp
                ? $request->no_hp
                : $guru->no_hp,
            'image_profile' => $request->file('image_profile') ? 'assets/images/guru/' . $nip . '/' . $image->hashName() : $guru->image_profile,
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
    public function destroy(string $nip)
    {
        $guru = Guru::where('nip', $nip)->first();
        $user = User::where('username', $nip)->first();
        if (!$guru) {
            return response()->json(['message' => 'Data yang anda hapus tidak ada!', 'status' => 403], 403);
        }
        $guru->delete();
        $user->delete();
        return response()->json(['message' => "Data dengan NIP {$nip} berhasil dihapus!", 'status' => 200], 200);
    }
}
