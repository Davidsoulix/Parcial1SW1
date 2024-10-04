// import { plantillaClase } from './plantillas/clase.js'; //NOTA ASI SE PODRIA ORDENAR LAS PLANTILLAS, EN UN DIRECTORIO APARTE ESPECIFICO
import { plantillaClase } from './nodos/clase.js';
import { plantillaAsociacion } from './enlaces/asociacion.js';
import { plantillaAgregacion } from './enlaces/agregacion.js';
import { plantillaComposicion } from './enlaces/composicion.js';
import { plantillaGeneralizacion } from './enlaces/generalizacion.js';
import { plantillaLabelNode } from './plantillaLabelNode.js';

export function cargarPlantillas(diagContenido) {
    plantillaClase(diagContenido);
    plantillaAsociacion(diagContenido);
    plantillaAgregacion(diagContenido);
    plantillaComposicion(diagContenido);
    plantillaGeneralizacion(diagContenido);
    plantillaLabelNode(diagContenido);
}
