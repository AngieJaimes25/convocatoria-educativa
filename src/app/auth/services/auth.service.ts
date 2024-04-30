import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthStatus } from '../interfaces/auth-status.enum';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<Usuario|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  //! Al mundo exterior
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );


  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: Usuario, token:string): Usuario {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);
    return user;
  }

  login( codigo: string, email: string, contrasenia: string ): Observable<Usuario> {
    const url  = `${ this.baseUrl }/login`;
    const body = { codigo, email, contrasenia };
    return this.http.post<LoginResponse>(url, body)
    .pipe(
      map(({ Username, Rol, token }) => this.setAuthentication({ email: Username, rol: Rol }, token)),
      catchError(err => {
        console.error('Error en la solicitud:', err);  // Log del error en la consola
        return throwError(() => err.error.Message);
      })
    );
  }

  registerEvualador( codigo: string, email: string, contraseniaDesencriptada: string ) {
    const url  = `${ this.baseUrl }/usuario/guardarEvaluador`;
    const body = { codigo, email, contraseniaDesencriptada };
    return this.http.post( url, body )
  }

  registerProponente( codigo: string, email: string, contraseniaDesencriptada: string ) {
    const url  = `${ this.baseUrl }/usuario/guardarProponente`;
    const body = { codigo, email, contraseniaDesencriptada };
    return this.http.post( url, body );
  }

  resetPassword( email: String ):Observable<any> {
    const url  = `${ this.baseUrl }/usuario/reestablecerContrasenia?email=${email}`;
    return this.http.post<LoginResponse>(url, null);
  }

  checkAuthStatus():Observable<boolean> {
    const token = localStorage.getItem('token');
    if ( !token ) {
      this.logout();
      return of(false);
    }
    // Falta verificar token en el backend
    return of(true);
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
  }
}
