import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Convocatoria } from '../interfaces/convocatoria.interface';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriasService {

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

  agregarConvocatoria( convocatoria: Convocatoria ) {
    const url  = `${ this.baseUrl }/convocatoria/abrir`;
    return this.http.post( url, convocatoria, this.commonOptions);
  }
  
  obtenerConvocatorias(): Observable<Convocatoria[]> {
    const url  = `${ this.baseUrl }/convocatoria/listarPasadas`;
    return this.http.get<Convocatoria[]>( url, this.commonOptions );
  }

  obtenerConvocatoriasAbiertas(): Observable<Convocatoria> {
    const url  = `${ this.baseUrl }/convocatoria/abierta`;
    return this.http.get<Convocatoria>( url, this.commonOptions );
  }
  
  cerrarConvocatorias() {
    const url  = `${ this.baseUrl }/convocatoria/cerrar`;
    return this.http.get( url, this.commonOptions );
  }

  actualizarConvocatorias( convocatoria: Convocatoria ) {
    const url  = `${ this.baseUrl }/convocatoria/modificar`;
    return this.http.put( url, convocatoria, this.commonOptions );
  }
}
