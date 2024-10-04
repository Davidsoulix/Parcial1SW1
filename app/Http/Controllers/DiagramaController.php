<?php

namespace App\Http\Controllers;

use App\Events\DiagramaActualizado;
use App\Events\DiagramaCreado;
use App\Models\Diagrama;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\Invitar;

class DiagramaController extends Controller
{
    public function index()
    {
        return view('diagramas.index');
    }

    public function create()
    {
        return view('diagramas.create');
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $diagrama = new Diagrama();
        $diagrama->titulo = $request->titulo;
        $diagrama->descripcion = $request->descripcion;
        $diagrama->datos = ""; //TODO: Cambiar por los datos reales
        $diagrama->user_id = $user->id;
        $diagrama->save();

        //broadcast(new DiagramaCreado($diagrama))->toOthers();

        return redirect()->route('diagramas.index');
    }

    public function show(Diagrama $diagrama)
    {
        //
    }

    public function edit(Diagrama $diagrama)
    {
        $idUsuario = Auth::user()->id;
        return view('diagramas.edit', compact('diagrama', 'idUsuario'));
    }

    public function update(Request $request, Diagrama $diagrama)
    {
        $diagrama->datos = $request->datos;
        $diagrama->save();
        return redirect()->route('diagramas.index'); 
    }
    
    public function destroy(Diagrama $diagrama)
    {
        //
    }

    public function updateModificacion(Request $request, Diagrama $diagrama)
    {
        $modificador = Auth::user()->id;
        $modificacion = $request->modificacion;
        $datos = $request->datos;

        $diagrama->modificacion = $modificacion;
        $diagrama->datos = $datos;
        $diagrama->save();

        broadcast(new DiagramaActualizado($modificacion, $modificador, $datos))->toOthers();
        
        return response()->json(['mensaje' => 'Modificación actualizada correctamente']);
    }

    public function invitar(Request $request)
    {   
        Mail::to($request->correo)->send(new Invitar($request->correo, $request->diagrama));
        return redirect()->route('diagramas.edit', $request->diagrama)
            ->with('mensaje', 'Invitacion enviada');
    }
}
