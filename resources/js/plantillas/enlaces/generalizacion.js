export function plantillaGeneralizacion(diagContenido) {

    const $ = go.GraphObject.make;

    //Plantilla del enlace
    diagContenido.linkTemplateMap.add("Generalizacion",
        $(go.Link, {
            // routing: go.Routing.AvoidsNodes,
            curve: go.Curve.JumpOver,
            corner: 5,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
        }, $(go.Shape, { strokeWidth: 2, }),
            $(go.Shape, { toArrow: "Triangle", fill: "white", scale: 2 }),
            $(go.TextBlock, { width: 40, background: "lightblue", segmentIndex: NaN, segmentFraction: 0.1, editable: true },
                new go.Binding("text", "desde").makeTwoWay()
            ),
            $(go.TextBlock, { width: 40, background: "lightblue", segmentIndex: NaN, segmentFraction: 0.5, editable: true },
                new go.Binding("text", "mitad").makeTwoWay()
            ),
            $(go.TextBlock, { width: 40, background: "lightblue", segmentIndex: NaN, segmentFraction: 0.85, editable: true },
                new go.Binding("text", "hasta").makeTwoWay()
            ),
        )
    );


}