<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryKelas extends Model
{
    use HasFactory;
    protected $table = 'history_kelas';
    protected $fillable = [
        'kelas_id',
        'wali_kelas',
        'semester_id'
    ];

    function kelas()
    {
        $this->hasMany(Kelas::class);
    }
}
