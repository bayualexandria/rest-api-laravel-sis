<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class HistorySiswa extends Model
{
    use HasFactory;
    protected $table = 'history_siswa';
    protected $fillable = [
        'kelas_id',
        'siswa_id',
        'mapel_id',
    ];
}
