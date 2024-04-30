import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Propuesta } from 'src/app/admin/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropuestasService {

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

  agregarPropuesta( data: any ) {
    
  }

  obtenerPropuestas(): Observable<Propuesta[]> {
    const url  = `${ this.baseUrl }/propuesta/buscarRegistradas`;
    return this.http.get<Propuesta[]>( url, this.commonOptions );
  } 

  subirArchivo(data: any) {
    const url  = `${ this.baseUrl }/propuesta/guardarArchivo`;
    return this.http.post( url, data, this.commonOptions );
  }
}
