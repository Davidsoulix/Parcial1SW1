// const { Stretch } = require("gojs");

export function plantillaClase(diagContenido) {
    const $ = go.GraphObject.make;

    // Define la plantilla de nodos (clase UML)
    diagContenido.nodeTemplate = $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),

        new go.Binding("selectable", "lockedBy", function(lockedBy) {
            // const idUsuario = document.getElementById('idUsuario').value;
            return lockedBy === null || lockedBy === idUsuario;
          }),
          

        $(go.Shape, "Rectangle", // El cuadro que envuelve todo el nodo
            {
                fill: "white",
                stroke: "black",
                strokeWidth: 2,
                fromLinkable: true, toLinkable: true,
                cursor: "pointer",
                portId: "",
                // fromLinkableSelfNode: true,
                // toLinkableSelfNode: true,

            }),
        $(go.Panel, "Table",
            { defaultRowSeparatorStroke: "black" }, // líneas entre filas

            // Sección del nombre de la clase
            $(go.TextBlock,
                {
                    row: 0, margin: 5, font: "bold 14px sans-serif",
                    editable: true, // El nombre de la clase es editable
                    isMultiline: false,// Solo una línea
                    textAlign: "center",
                    stretch: go.Stretch.Fill
                },
                new go.Binding("text", "nombre").makeTwoWay()), // Vincula con el modelo y la vista al mismo tiempo (lo hace bidireccional)

            // Sección de los atributos
            $(go.Panel, "Vertical",
                { row: 1, margin: 5 },
                new go.Binding("itemArray", "atributos").makeTwoWay(),
                {
                    itemTemplate: $(go.Panel, "Horizontal",
                        $(go.TextBlock,  // Casilla de visibilidad
                            { width: 30, editable: true, isMultiline: false, margin: new go.Margin(0, 2, 0, 2), font: "italic 12px sans-serif" },
                            new go.Binding("text", "visibilidad").makeTwoWay()),
                        $(go.TextBlock,  // Casilla del nombre del atributo
                            { width: 80, editable: true, isMultiline: false, margin: new go.Margin(0, 2, 0, 2), font: "italic 12px sans-serif" },
                            new go.Binding("text", "nombre").makeTwoWay()),
                        $(go.TextBlock,  // Casilla del tipo de dato
                            { width: 80, editable: true, isMultiline: false, margin: new go.Margin(0, 2, 0, 2), font: "italic 12px sans-serif" },
                            new go.Binding("text", "tipo").makeTwoWay()),
                        $("Button",  // Botón para eliminar el atributo
                            { click: eliminarAtributo },
                            $(go.TextBlock, "x")
                        )

                    )
                }
            ),

            // Botón para agregar un nuevo atributo:
            $(go.Panel, "Horizontal",
                { row: 2, margin: new go.Margin(5, 0, 0, 0) }, // margen para separar el botón de los atributos
                $("Button",
                    { click: agregarAtributo },
                    $(go.TextBlock, "Agregar atributo")
                )
            ),

            // Sección de los métodos
            $(go.Panel, "Vertical",
                { row: 3, margin: 5 },
                new go.Binding("itemArray", "metodos").makeTwoWay(),
                {
                    itemTemplate: $(go.Panel, "Horizontal",
                        $(go.TextBlock,  // Casilla de visibilidad
                            { width: 30, editable: true, margin: new go.Margin(0, 2, 0, 2), font: "italic 12px sans-serif" },
                            new go.Binding("text", "visibilidad").makeTwoWay()),
                        $(go.TextBlock,  // Casilla del nombre del método
                            { width: 80, editable: true, margin: new go.Margin(0, 2, 0, 2), font: "italic 12px sans-serif" },
                            new go.Binding("text", "nombre").makeTwoWay()),
                        $(go.TextBlock,  // Casilla del tipo de retorno
                            { width: 80, editable: true, margin: new go.Margin(0, 2, 0, 2), font: "italic 12px sans-serif" },
                            new go.Binding("text", "tipo").makeTwoWay()),
                        $("Button",  // Botón para eliminar el atributo
                            { click: eliminarMetodo },
                            $(go.TextBlock, "x")
                        )
                    )
                }
            ),

            // Botón para agregar un nuevo método:
            $(go.Panel, "Horizontal",
                { row: 4, margin: new go.Margin(5, 0, 0, 0) }, // margen para separar el botón de los métodos
                $("Button",
                    { click: agregarMetodo }, // acción al hacer clic
                    $(go.TextBlock, "Agregar método")   // texto del botón
                )
            )
        )
    )// Fin de la plantilla del nodo clase UML

    function agregarAtributo(e, obj) {
        var nodeData = obj.part.data;  // obtén el nodo al que pertenece el botón
        var model = diagContenido.model;
        model.startTransaction("add attribute");
        model.addArrayItem(nodeData.atributos, { visibilidad: "-", nombre: "nuevoAtributo", tipo: "" });
        model.commitTransaction("add attribute");
    }

    function agregarMetodo(e, obj) {
        var nodeData = obj.part.data;  // Obtén los datos del nodo donde se hizo clic
        var model = diagContenido.model;
        model.startTransaction("agregarMetodo");

        // Asegúrate de que 'metodos' esté definido para este nodo
        if (!nodeData.metodos) {
            model.setDataProperty(nodeData, "metodos", []);  // Si no hay métodos, crea el array
        }

        // Hacer una copia del array de métodos para evitar cambios en todos los nodos
        var nuevosMetodos = nodeData.metodos.slice();
        nuevosMetodos.push({ visibilidad: "+", nombre: "nuevoMetodo", tipo: "" });

        // Modifica solo los métodos del nodo actual
        model.setDataProperty(nodeData, "metodos", nuevosMetodos);

        model.commitTransaction("agregarMetodo");
    }

    function eliminarAtributo(e, obj) {
        var nodeData = obj.part.data;  // Datos del nodo en el que se hizo clic
        var model = diagContenido.model;

        var itemPanel = obj.panel; // Obtiene el panel que contiene el botón
        // console.log(itemPanel.xd); // xd es el indice del objeto seleccionado en el arreglo
        var atributo = obj.part.data.atributos[itemPanel.xd]; // Obtiene el atributo seleccionado
        // console.log(atributo); 

        model.startTransaction("eliminarAtributo");
        model.removeArrayItem(nodeData.atributos, nodeData.atributos.indexOf(atributo));
        model.commitTransaction("eliminarAtributo");
    }

    function eliminarMetodo(e, obj) {
        var nodeData = obj.part.data;  // Datos del nodo en el que se hizo clic
        var model = diagContenido.model;

        var itemPanel = obj.panel; // Obtiene el panel que contiene el botón
        var metodo = obj.part.data.metodos[itemPanel.xd]; // Obtiene el método seleccionado

        model.startTransaction("eliminarMetodo");
        model.removeArrayItem(nodeData.metodos, nodeData.metodos.indexOf(metodo));
        model.commitTransaction("eliminarMetodo");
    }


}