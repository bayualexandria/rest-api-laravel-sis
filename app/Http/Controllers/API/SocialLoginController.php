<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use App\Models\LinkedSocialAccount;
use App\Models\Siswa;
use App\Models\User;
use App\Notifications\EmailVerification;

class SocialLoginController extends Controller
{


    function socialMediaAdmin($email, $idGoogle, $nameGoogle)
    {

        $user = User::where('email', $email)->first();

        if ($user) {
            $guru = Guru::where('nip', $user->username)->first();
            if ($guru) {
                if ($user->email_verified_at) {

                    $linkedSocialAccount = LinkedSocialAccount::where('provider_id', $idGoogle)
                        ->first();

                    if ($linkedSocialAccount) {
                        $linkedSocialAccount->update([
                            'provider_id' => $idGoogle,
                            'provider_name' => $nameGoogle,
                        ]);
                        $tokenResult = $user->createToken('Personal Access Token');
                        $token = $tokenResult->plainTextToken;
                        return response()->json([
                            'user' => $user,
                            'accessToken' => $token,
                            'token_type' => 'Bearer',
                            'status' => 200
                        ], 200);
                    } else {
                        LinkedSocialAccount::create([
                            'user_id' => $user->id,
                            'provider_id' => $idGoogle,
                            'provider_name' => $nameGoogle,
                        ]);
                        $tokenResult = $user->createToken('Personal Access Token');
                        $token = $tokenResult->plainTextToken;
                        return response()->json([
                            'user' => $user,
                            'accessToken' => $token,
                            'token_type' => 'Bearer',
                            'status' => 200
                        ], 200);
                    }
                } else {
                    $user->notify(new EmailVerification($user));
                    return response()->json([
                        'message' => 'Akun belum terverifikasi! Silahkan cek email untuk verifikasi.',
                        'status' => 403
                    ], 403);
                }
            } else {
                return response()->json([
                    'message' => 'User ini bukan guru! Silahkan hubungi administrator sekolah.',
                    'status' => 403
                ], 403);
            }
        } else {
            return response()->json([
                'message' => 'User belum terdaftar! Silahkan hubungi administrator sekolah.',
                'status' => 403
            ], 403);
        }
    }

    function socialMedia($email, $idGoogle, $nameGoogle)
    {
        $user = User::where('email', $email)->first();

        if ($user) {
            $siswa = Siswa::where('nis', $user->username)->first();
            if ($siswa) {
                if ($user->email_verified_at) {
                    $linkedSocialAccount = LinkedSocialAccount::where('provider_id', $idGoogle)
                        ->first();
                    if ($linkedSocialAccount) {
                        $linkedSocialAccount->update([
                            'provider_id' => $idGoogle,
                            'provider_name' => $nameGoogle,
                        ]);
                        $tokenResult = $user->createToken('Personal Access Token');
                        $token = $tokenResult->plainTextToken;
                        return response()->json([
                            'user' => $user,
                            'accessToken' => $token,
                            'token_type' => 'Bearer',
                            'status' => 200
                        ], 200);
                    } else {
                        LinkedSocialAccount::create([
                            'user_id' => $user->id,
                            'provider_id' => $idGoogle,
                            'provider_name' => $nameGoogle,
                        ]);
                        $tokenResult = $user->createToken('Personal Access Token');
                        $token = $tokenResult->plainTextToken;
                        return response()->json([
                            'user' => $user,
                            'accessToken' => $token,
                            'token_type' => 'Bearer',
                            'status' => 200
                        ], 200);
                    }
                } else {
                    $user->notify(new EmailVerification($user));
                    return response()->json([
                        'message' => 'Akun belum terverifikasi! Silahkan cek email untuk verifikasi.',
                        'status' => 403
                    ], 403);
                }
            } else {
                return response()->json([
                    'message' => 'User ini bukan siswa! Silahkan hubungi administrator sekolah.',
                    'status' => 403
                ], 403);
            }
        } else {
            return response()->json([
                'message' => 'User belum terdaftar! Silahkan hubungi administrator sekolah.',
                'status' => 403
            ], 403);
        }
    }
}
