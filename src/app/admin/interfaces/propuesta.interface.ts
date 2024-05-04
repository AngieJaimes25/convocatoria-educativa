import { Convocatoria } from './convocatoria.interface';
import { Materia } from './materia.interface';
import { Profesor } from './profesor.interface';
import { Proponente } from './proponente.interface';
import { Semillero } from './semillero.interface';

export interface Propuesta {
    id:           number;
    nombre:       string;
    convocatoria: Convocatoria;
    proponentes:  Proponente[];
    puntaje:      null;
    tipo:         string;
    materia:      Materia;
    semillero:    Semillero;
    profesor:     Profesor;
    archivo:      string;
}