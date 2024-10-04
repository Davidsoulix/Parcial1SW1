<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diagrama extends Model
{
    use HasFactory;
    protected $fillable = ['titulo', 'descripcion', 'datos', 'modificacion', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //Invitados:
    public function colaboradores()
    {
        return $this->belongsToMany(User::class);
    }
}
