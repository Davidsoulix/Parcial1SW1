<div class="col">
    <form method="POST" action="{{ route('invitar') }}">
        @csrf
        <div class="form-group mb-1">
            <label for="email"><b>Agregar Colaborador:</b></label>
            <div class="input-group mb-3">
                <input type="email" class="form-control" id="correo" name="correo" placeholder="Ingrese correo del Usuario" required>
                <input type="text" name="diagrama" value="{{$diagrama->id}}" hidden>
                <button type="submit" class="btn btn-primary">Agregar</button>
            </div>
        </div>
    </form>
</div>
