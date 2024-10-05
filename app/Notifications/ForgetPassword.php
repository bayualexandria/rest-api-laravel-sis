<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ForgetPassword extends Notification
{
    use Queueable;
    public $user;
    public $token;

    /**
     * Create a new notification instance.
     */
    public function __construct(User $user, $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Forget Password | Sistem Informasi Siswa')
            ->line("Apa kabar, {$this->user->name}")
            ->line("Silahkan klik tombol Reset password dibawah ini untuk melakukan mengubah password akunmu yang telah kamu daftarkan")
            ->action('Reset password', url("/api/auth/reset/{$this->user->email}/{$this->token}"))
            ->line('Terima Kasih!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
