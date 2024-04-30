import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profesor } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

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

  obtenerProfesores(): Observable<Profesor[]> {
    const url  = `${ this.baseUrl }/profesor/listar`;
    return this.http.get<Profesor[]>( url, this.commonOptions );
  }

  agregarProfesor(profesor: Profesor) {
    const url = `${ this.baseUrl }/profesor/agregar`;
    return this.http.post( url, profesor, this.commonOptions );
  }
  
  modificarProfesor(id: number, profesor: Profesor) {
    const url = `${ this.baseUrl }/profesor/modificar?id=${id}`;
    return this.http.put( url, profesor, this.commonOptions );
  }
}
