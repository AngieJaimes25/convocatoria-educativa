import { Convocatoria } from './convocatoria.interface';
import { Materia } from './materia.interface';
import { Profesor } from './profesor.interface';
import { Proponente } from './proponente.interface';

export interface Propuesta {
    id:           number;
    nombre:       string;
    convocatoria: Convocatoria;
    proponentes:  Proponente[];
    puntaje:      null;
    tipo:         string;
    materia:      Materia;
    semillero:    null;
    profesor:     Profesor;
    archivo:      string;
}