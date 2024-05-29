<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Siswa extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create('id_ID');
        $gender = $faker->randomElement(['Laki-laki', 'Perempuan']);
        for ($i = 1; $i <= 50; $i++) {
            $nik = $faker->nik;
            $nama = $faker->name($gender);
            \DB::table('siswa')->insert(
                [
                    'nis' => $nik,
                    'nama' => $nama,
                    'jenis_kelamin' => $gender,
                    'no_hp' => $faker->phoneNumber,
                    'image_profile' => 'default.png',
                    'alamat' => $faker->address
                ]
            );
            \DB::table('users')->insert([
                'username' => $nik,
                'email' => $faker->email,
                'name' => $nama,
                'password' => bcrypt('admin123'),
                'email_verified_at' => date('Y-m-d H:i:s', time()),
                'status_id' => 3
            ]);
        }
    }
}
