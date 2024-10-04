export function muchosAMuchos(diagContenido, tipoEnlaceSeleccionado, e) {
    //Lógica para la creacion de un diagrama de muchos a muchos

    if (tipoEnlaceSeleccionado === "MuchosAMuchos") {
        const link = e.subject;
        const newNodeData = {
            key: diagContenido.model.nodeDataArray[diagContenido.model.nodeDataArray.length - 1].key,
            nombre: "Intermedia",
            atributos: [],
            metodos: [],
        };
        diagContenido.model.addNodeData(newNodeData);

        const newLinkData = {
            //From label last label key:
            from: link.data.labelKeys[link.data.labelKeys.length - 1],
            to: newNodeData.key,
            category: "LinkToNewNode"
        };

        diagContenido.model.addLinkData(newLinkData);
    }
}