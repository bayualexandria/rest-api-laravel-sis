<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GuruController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show($username)
    {
        $guru = Guru::where('nip', $username)->first();
        return response()->json(['data' => $guru, 'message' => 'Get data success', 'status' => 200], 200);
    }

    public function addDataGuru($nip, Request $request)
    {
        $validation = Validator::make($request->all(), [
            'nip' => 'required',
            'nama' => 'required',
            'jenis_kelamin' => 'required',
            'no_hp' => 'required|numeric|min:10',
            'image_profile' => 'required',
            'alamat' => 'required',
        ], [
            'nip.required' => 'NIP harus diisi',
            'nama.required' => 'Nama Lengkap harus diisi',
            'jenis_kelamin.required' => 'Jenis kelamin harus diisi',
            'no_hp.required' => 'No handphone harus diisi',
            'no_hp.numeric' => 'Yang anda masukan bukan no handphone',
            'no_hp.min' => 'Minimal 10 karakter',
            'image_profile.required' => 'Photo profile harus dimasukan',
            'alamat.required' => 'Alamat harus diisi',
        ]);
        if ($validation->fails()) {
            return response()->json(['message' => $validation->errors(), 'status' => 403], 403);
        }

        Guru::create([
            'nip' => $nip,
            'nama' => $request->nama
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Guru $guru)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Guru $guru)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guru $guru)
    {
        //
    }
}
