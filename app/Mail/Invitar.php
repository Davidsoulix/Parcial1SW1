<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Invitar extends Mailable
{
    use Queueable, SerializesModels;
    public $correo;
    public $diagrama;

    /**
     * Create a new message instance.
     */
    public function __construct($correo, $diagrama)
    {
        $this->correo = $correo;
        $this->diagrama = $diagrama;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Invitacion diseño de diagramas',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'correo',
        );
    }

    public function build()
    {
        return $this->view('correo')
            ->with('diagrama', $this->diagrama);
    }
}
