@vite(['resources/js/diagrama.js'])

<div style="display: flex;" class="m-4 mt-0">
    <div id="diag_menu" style="width: 20%; height: 85vh; border: 1px solid black;"></div>
    <div id="diag_contenido" style="width: 80%; height: 85vh; border: 1px solid black;"></div>
</div>

<div>

    <script>
        //Aqui se guardan los datos obtenidos desde la base de datos
        let datos = @json($diagrama->datos);
        let idUsuario = @json($idUsuario);
        let idDiagrama = @json($diagrama->id);
    </script>

    <script>
        const updateUrl = "{{ route('diagramas.updateModificacion', ['diagrama' => ':diagrama']) }}";
    </script>
<br>

<div>
    <label class="text-white" for="tipoEnlace"><b>Relacion:</b></label>
    <select id="tipoEnlace">
        <option value="Asociacion">Asociación</option>
        <option value="Composicion">Composición</option>
        <option value="Agregacion">Agregación</option>
        <option value="Generalizacion">Generalización</option>
        <option value="MuchosAMuchos">Muchos a muchos</option>
    </select>
</div>
<br>

    <div class="col">
        <form method="POST" action="{{ route('diagramas.update', $diagrama) }}">
            @csrf @method('PUT')
            <textarea class="form-control" name="datos" id="ta_datos_diagrama">{{ old('datos', $diagrama->datos) }}</textarea><!-- hidden-->
            <br>
            <button type="submit" id="guardar" class="btn btn-primary">Guardar Diagrama</button>
        </form>
    </div>

</div>
