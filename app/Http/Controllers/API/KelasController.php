<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KelasController extends Controller
{


    public function index()
    {

        $kelas = DB::table('history_kelas')
            ->join('kelas', 'kelas_id', 'kelas.id')
            ->join('guru', 'wali_kelas', 'guru.id')
            ->join('semester', 'semester_id', 'semester.id')
            ->select('kelas.nama_kelas as kelas', 'kelas.jurusan', 'guru.nama as wali_kelas', 'semester.semester', 'semester.tahun_pelajaran')
            ->get();

        return response()->json([
            'data' => $kelas,
            'message' => 'Data kelas berhasil ditampilkan',
            'status' => 200
        ], 200);
    }
}
