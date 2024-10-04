export function plantillaLabelNode(diagContenido) {

  diagContenido.nodeTemplateMap.add(
    'LinkLabel',
    new go.Node({
      selectable: false,
      avoidable: false,
      layerName: 'Foreground'
    }) // always have link label nodes in front of Links
      .add(
        new go.Shape('Ellipse', {
          width: 5,
          height: 5,
          stroke: null,
          fill: null, // Set fill to null to make the shape invisible
          fromLinkable: false,
          toLinkable: false,
        })
      )
  );

  // Add a link template for the links from the label node to the new node

  diagContenido.linkTemplateMap.add(
    'MuchosAMuchos',
    new go.Link({
    })
      .add(
        new go.Shape({
        }) // the link shape
      )
  );

  // Add the new link template to the linkTemplateMap
  diagContenido.linkTemplateMap.add(
    'LinkToNewNode',
    new go.Link({
    })
      .add(
        new go.Shape({
          strokeWidth: 2,
          strokeDashArray: [4, 2]
        }) // the link shape
      )
  );


}