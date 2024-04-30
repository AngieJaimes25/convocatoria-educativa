import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Propuesta } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PropuestasService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor() { }

  private get commonOptions(): { headers: HttpHeaders } {
    const authToken = localStorage.getItem('token');
    console.log(authToken);
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }

  agregarPropuesta( data: any ) {
    
  }

  obtenerPropuestas(): Observable<Propuesta[]> {
    const url  = `${ this.baseUrl }/propuesta/listarAgrupadasPorTipo`;
    return this.http.get<Propuesta[]>( url, this.commonOptions );
  } 
}
