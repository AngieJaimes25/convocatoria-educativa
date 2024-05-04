import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/auth/interfaces/usuario.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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

  obtenerEvaluadores(): Observable<Usuario[]> {
    const url  = `${ this.baseUrl }/usuario/listarEvaluadores`;
    return this.http.get<Usuario[]>( url, this.commonOptions );
  }
}
