<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('table_status_siswa')->insert(['status_siswa' => 'Lulus']);
        DB::table('table_status_siswa')->insert(['status_siswa' => 'Aktif']);
        DB::table('table_status_siswa')->insert(['status_siswa' => 'Non Aktif']);
        DB::table('table_status_siswa')->insert(['status_siswa' => 'Keluar']);
    }
}
