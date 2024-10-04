<?php

use App\Http\Controllers\DiagramaController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth:sanctum',config('jetstream.auth_session'),'verified',])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::resource('diagramas', DiagramaController::class);
    
    Route::put('/diagramasModificacion/{diagrama}', [DiagramaController::class, 'updateModificacion'])->name('diagramas.updateModificacion');

    Route::post('invitar', [DiagramaController::class, 'invitar'])->name('invitar');

});
