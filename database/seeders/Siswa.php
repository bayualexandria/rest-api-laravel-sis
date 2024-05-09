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
            \DB::table('siswa')->insert(
                [
                    'nis' => $faker->randomDigit,
                    'nama' => $faker->name($gender),
                    'jenis_kelamin' => $gender,
                    'no_hp' => $faker->phoneNumber,
                    'image_profile' => 'default.png',
                    'alamat' => $faker->address
                ]
            );
        }
    }
}
