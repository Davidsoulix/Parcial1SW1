<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Pizarra del diagrama') }}
        </h2>
    </x-slot>
                
    <div class="bg-emerald-500 py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <br>
        @if (Auth::user()->id == $diagrama->user_id)
        @include('form-invitar')
        @endif
            <div class="bg-violet-700 overflow-hidden shadow-xl sm:rounded-lg p-5">

                <br>

                @include('diagrama')

                <br>

            </div>
            <div class="row" >
                <ul class="col list-group list-group">
                    <li class="list-group-item"> <b>Título:</b> {{ $diagrama->titulo }}</li>
                    <li class="list-group-item"> <b>Descripcion:</b> {{ $diagrama->descripcion }}</li>
                    <li class="list-group-item"> <b>Autor:</b> {{ $diagrama->user->name }}</li>
                </ul>
            </div>
        </div>
    </div>
</x-app-layout>
