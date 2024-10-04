import * as go from 'gojs';
import { cargarPlantillas } from './plantillas/cargarPlantillas';
import { muchosAMuchos } from './plantillas/muchosAMuchos';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

function init() {
    const $ = go.GraphObject.make;

    const diagContenido = $(go.Diagram, "diag_contenido", {
        "undoManager.isEnabled": true,  // habilita deshacer/rehacer
        "linkingTool.archetypeLinkData": { category: "Asociacion" } // Por defecto
    });

    //Cargar las plantilas de nodos y enlaces
    cargarPlantillas(diagContenido);

    // Actualiza el tipo de enlace cuando se selecciona una opción del select
    let tipoEnlaceSeleccionado = 'Asociacion'; // Por defecto
    document.getElementById('tipoEnlace').addEventListener('change', function () {
        tipoEnlaceSeleccionado = this.value; // Obtener el tipo de enlace seleccionado
        diagContenido.toolManager.linkingTool.archetypeLinkData = { category: tipoEnlaceSeleccionado };

    });

    //Habilita la creacion de "nodos" en los enlaces (links labels)
    diagContenido.model = new go.GraphLinksModel({ linkLabelKeysProperty: 'labelKeys' });
    //Nodo en los enlaces:
    diagContenido.toolManager.linkingTool.archetypeLabelNodeData = { category: 'LinkLabel' };
    //Cuando se traza un enlace ver si es de muchos a muchos:
    diagContenido.addDiagramListener("LinkDrawn", function (e) {
        muchosAMuchos(diagContenido, tipoEnlaceSeleccionado, e);
    });

    //Configurar la paleta de formas:
    let diagMenu = $(go.Palette, "diag_menu");
    diagMenu.nodeTemplateMap = diagContenido.nodeTemplateMap; // Usa las mismas plantillas que el diagrama de contenido

    diagMenu.model = new go.GraphLinksModel(
        [//nodeDataArray
            {//Nodo de clase
                key: 1,
                nombre: "Clase",
                atributos: [
                    { visibilidad: "-", nombre: "atributo", tipo: "int" },
                ],
                metodos: [
                    { visibilidad: "+", nombre: "metodo", tipo: "void" },
                ]
            },

        ],
        [//linkDataArray
            {
                from: 0, to: 0, desde: "", mitad: "", hasta: "", category: ""
            }
        ]

    );

    diagContenido.allowDrop = true;
    diagContenido.addModelChangedListener(function (e) {
        if (e.isTransactionFinished) {
            // console.log(diagContenido.model.toJson());
            let diagrama = diagContenido.model.toJson();
            document.getElementById('ta_datos_diagrama').value = diagrama;
        }
    });

    /*Al momento de soltar un nodo en el diagrama, se clonan los atributos y métodos de cada nodo en el diagrama
     para evitar que se modifiquen todos los nodos al modificar uno*/
    diagContenido.addDiagramListener("ExternalObjectsDropped", function (e) {
        diagContenido.selection.each(function (part) {
            if (part instanceof go.Node) {
                var data = part.data;
                var model = diagContenido.model;

                // Clonar atributos y métodos si existen
                if (data.atributos) {
                    model.setDataProperty(data, "atributos", data.atributos.map(attr => ({ ...attr })));
                }
                if (data.metodos) {
                    model.setDataProperty(data, "metodos", data.metodos.map(met => ({ ...met })));
                }
            }
        });
    });

    // window.guardar = function() {
    //     document.getElementById('ta_datos_diagrama').value = diagContenido.model.toJson();
    //     console.log("guardado")
    // };



    window.cargar = function () {
        // diagContenido.model = go.Model.fromJson(document.getElementById('ta_datos_diagrama').value);
        diagContenido.model = go.Model.fromJson(datos);
        console.log("cargado")
    };

    //Cargar el diagrama si hay datos:
    if (datos) {
        diagContenido.model = go.Model.fromJson(datos);
        //Poner todos los atributos "lockedBy" en null:
        diagContenido.model.nodeDataArray.forEach(n => {
            n.lockedBy = null;
        });
    }


    //BLOQUEAR NODOS:
    diagContenido.addDiagramListener("ChangedSelection", function (e) {
        // console.log("clickeado");
        var selectedPart = e.diagram.selection.first();

        if (selectedPart !== null) {
            e.diagram.model.startTransaction("lock node");
            e.diagram.model.setDataProperty(selectedPart.data, "lockedBy", idUsuario); // Bloquea el nodo para otros usuarios
            e.diagram.model.commitTransaction("lock node");
            // console.log(selectedPart.data);

        } else if (selectedPart === null || selectedPart.data.lockedBy === idUsuario) {
            // Desbloquea todos los nodos que están bloqueados por el usuario actual
            e.diagram.nodes.each(function (node) {
                if (node.data && node.data.lockedBy === idUsuario) {
                    e.diagram.model.startTransaction("unlock node");
                    e.diagram.model.setDataProperty(node.data, "lockedBy", null); // Desbloquea el nodo
                    e.diagram.model.commitTransaction("unlock node");
                }
            });
        }
    });

    //Guardando en la bd:

    let aplicandoCambios = false;

    diagContenido.addModelChangedListener(e => {
        if (aplicandoCambios) return; // Si estamos aplicando cambios, salir.

        if (e.isTransactionFinished) {
            let modificacion = e.model.toIncrementalJson(e);
            let datosDiagrama = e.model.toJson();
            // console.log("Datos del diagrama: " + datosDiagrama);
            // console.log(modificacion);

            const finalUrl = updateUrl.replace(':diagrama', idDiagrama);

            fetch(finalUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    modificacion: modificacion,
                    datos: datosDiagrama,
                })
            })
                .then(response => response.json())
                .then(data => {
                    // console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    });


    window.Echo = new Echo({
        broadcaster: 'reverb',
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT,
        wssPort: import.meta.env.VITE_REVERB_PORT,
        forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
        enabledTransports: ['ws', 'wss'],
    });

    window.Echo.channel('diagrama-actualizado')
        .listen('DiagramaActualizado', (e) => {
            var parteRecibida = e.modificacion;
            let modificador = e.modificador;
            let datosDiagrama = e.datos;
            

            if(modificador == idUsuario){
                console.log("Modificación realizada por el usuario actual");
                return;
            }else{
                console.log("Cambios realizados por otro usuario");
                aplicandoCambios = true;

                if(diagContenido.nodes.count == 0){
                    diagContenido.model = go.Model.fromJson(datosDiagrama);
                    // console.log(diagContenido.model.toJson());
                    return;
                }else{
                    // Aplicar los cambios incrementales recibidos
                    // console.log("Si hay nodos en el diagrama");
                    diagContenido.model.applyIncrementalJson(parteRecibida);
                    // diagContenido.model = go.Model.fromJson(datosDiagrama);
                }

                // diagContenido.model.applyIncrementalJson(parteRecibida);
                aplicandoCambios = false;
            }

            //aplicandoCambios = true;
            //diagContenido.model.applyIncrementalJson(parteRecibida);
            //aplicandoCambios = false

        });





}


window.addEventListener('DOMContentLoaded', init);