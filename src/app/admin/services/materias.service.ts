import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Materia } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor() { }

  private get commonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }

  agregarMateria(materia: Materia) {
    const url  = `${ this.baseUrl }/materia/agregar`;
    return this.http.post( url, materia, this.commonOptions );
  }

  modificarMateria(id: number, materia: Materia) {
    const url  = `${ this.baseUrl }/materia/modificar?id=${id}`;
    return this.http.put( url, materia, this.commonOptions );
  }

  obtenerMaterias(): Observable<Materia[]> {
    const url  = `${ this.baseUrl }/materia/listar`;
    return this.http.get<Materia[]>( url, this.commonOptions );
  }
}
