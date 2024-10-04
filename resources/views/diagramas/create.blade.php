<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Crear nuevo diagrama') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-5">

                <form method="POST" action="{{ route('diagramas.store') }}">
                    @csrf
                    <div class="mb-4">
                        <label for="titulo" class="block text-gray-700 text-sm font-bold mb-2">Titulo:</label>
                        <input type="text" name="titulo" id="titulo" class="form-input rounded-md shadow-sm mt-1 block w-full" value="{{ old('titulo') }}" />
                    </div>
                    <div class="mb-4">
                        <label for="descripcion" class="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
                        <textarea name="descripcion" id="descripcion" class="form-input rounded-md shadow-sm mt-1 block w-full">{{ old('descripcion') }}</textarea>
                    </div>
                    
                    <div class="flex items-center justify-end mt-4">
                        <x-button class="ml-4">
                            {{ __('Guardar') }}
                        </x-button>
                    </div>
                </form>                
                
            </div>
        </div>
    </div>
</x-app-layout>
