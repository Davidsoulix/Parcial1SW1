export function plantillaAsociacion(diagContenido) {

    const $ = go.GraphObject.make;

    //Plantilla del enlace
    diagContenido.linkTemplateMap.add("Asociacion",
        $(go.Link, {
            // routing: go.Routing.AvoidsNodes,
            curve: go.Curve.JumpOver,
            corner: 5,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
        }, $(go.Shape, { strokeWidth: 2, }),
            $(go.TextBlock, { width: 40, background: "lightblue", segmentIndex: NaN, segmentFraction: 0.1, editable: true },
                new go.Binding("text", "desde").makeTwoWay()
            ),
            $(go.TextBlock, { width: 40, background: "lightblue", segmentIndex: NaN, segmentFraction: 0.5, editable: true },
                new go.Binding("text", "mitad").makeTwoWay()
            ),
            $(go.TextBlock, { width: 40, background: "lightblue", segmentIndex: NaN, segmentFraction: 0.9, editable: true },
                new go.Binding("text", "hasta").makeTwoWay()
            )
        )
    );

    //Esto es para que si o si se creen las propiedades desde, mitad y hasta en el link al momento de crear el link
    // diagContenido.addDiagramListener("LinkDrawn", function (e) {
    //     var link = e.subject;
    //     // diagContenido.model.setDataProperty(link.data, "relacion", "Asociacion");
    //     console.log("Link creado:", link.data);

    // });



    //Esto es un listener para que cuando se edite el texto de un link, se actualice el valor correspondiente en el modelo
    // diagContenido.addDiagramListener("TextEdited", function(e) {
    //     var tb = e.subject;
    //     var link = tb.part;

    //     if (link instanceof go.Link) {
    //         var model = diagContenido.model;
    //         var newText = tb.text;

    //         // Actualiza manualmente el atributo correspondiente
    //         if (tb.text === link.data.desde) {
    //             model.setDataProperty(link.data, "desde", newText);
    //         } else if (tb.text === link.data.mid) {
    //             model.setDataProperty(link.data, "mitad", newText);
    //         } else if (tb.text === link.data.hasta) {
    //             model.setDataProperty(link.data, "hasta", newText);
    //         }
    //     }
    // });





}