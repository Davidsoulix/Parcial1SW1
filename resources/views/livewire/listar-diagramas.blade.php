<div class="container text-center">
    <div class="container">
        <div class="row mb-3">
            <div class="col-sm-3 col-md-3">
                <input class="form-control" type="search" placeholder="Buscar" wire:model.live.debounce.500ms="buscar">
            </div>
            <div class="col-sm-7"></div>
        </div>
    </div>

    <div class="col-md-12 table-responsive">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Descripcion</th>
                    <th>Datos</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($diagramas as $diagrama)
                    <tr>
                        <td>{{ $diagrama->titulo }}</td>
                        <td>{{ $diagrama->descripcion }}</td>
                        <td>Datos</td>
                        <td>
                            <!--Botón para editar el diagrama:-->
                            <a href="{{ route('diagramas.edit', $diagrama->id) }}" class="btn btn-warning">Trabajar Diagrama</a>
                            <!--Botón para eliminar el diagrama:-->
                            <form action="{{ route('diagramas.destroy', $diagrama->id) }}" method="POST"
                                class="d-inline">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    {{ $diagramas->links() }}
</div>
