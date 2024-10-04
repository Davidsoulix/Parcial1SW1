<?php

namespace App\Livewire;

use App\Models\Diagrama;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\On;
use Livewire\Component;
use Livewire\WithPagination;

class ListarDiagramas extends Component
{
    use WithPagination;

    public $buscar, $nombre = 'titulo';
    

    #[On('echo:diagrama-creado,DiagramaCreado')]
    public function render()
    {
        $user = Auth::user();
        $diagramas = $this->buscar === null ?
            Diagrama::where('user_id', $user->id)
                ->orWhereHas('colaboradores', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->orderBy('id', 'desc')
                ->paginate(10) :
            Diagrama::where('user_id', $user->id)
                ->orWhereHas('colaboradores', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->where($this->nombre, 'like', '%' . $this->buscar . '%')
                ->orderBy('id', 'desc')
                ->paginate(10);
            
        return view('livewire/listar-diagramas', ['diagramas' => $diagramas]);
    }

    
    

}
