import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Semillero } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SemillerosService {

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

  agregarSemillero(semillero: Semillero) {
    const url  = `${ this.baseUrl }/semillero/agregar`;
    return this.http.post( url, semillero, this.commonOptions );
  }

  modificarSemillero(id: number, semillero: Semillero) {
    const url  = `${ this.baseUrl }/semillero/modificar?id=${id}`;
    return this.http.put( url, semillero, this.commonOptions );
  }

  obtenerSemilleros(): Observable<Semillero[]> {
    const url  = `${ this.baseUrl }/semillero/listar`;
    return this.http.get<Semillero[]>( url, this.commonOptions );
  }
}
