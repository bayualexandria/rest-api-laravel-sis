<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Siswa extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'siswa';

    protected $fillable = [
        'nis',
        'nama',
        'jenis_kelamin',
        'no_hp',
        'image_profile',
        'alamat',
        'status_id',
        'status_siswa_id',
    ];

    public function users(): HasOne
    {
        return $this->hasOne(User::class, 'username', 'nis');
    }

    public function historySiswa(): HasMany
    {
        return $this->hasMany(HistorySiswa::class, 'siswa_id', 'id');
    }
}
