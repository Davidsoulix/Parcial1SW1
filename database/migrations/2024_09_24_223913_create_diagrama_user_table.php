<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('diagrama_user', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('diagrama_id');
            $table->unsignedBigInteger('user_id');

            $table->foreign('diagrama_id')->references('id')->on('diagramas')
                ->onDelete('cascade')->onUpdate('cascade');

            $table->foreign('user_id')->references('id')->on('users')
                ->onDelete('cascade')->onUpdate('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('diagrama_user');
    }
};
