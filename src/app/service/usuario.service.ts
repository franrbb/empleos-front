import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8090/api/usuarios';

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient, private router: Router, private _authService: AuthService) { }

  private agregarAuthorizationHeader(){
    let token = this._authService.token;

    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean{
    if(e.status == 401){

      if(this._authService.isAuthenticated){
        this._authService.logout();
      }

      this.router.navigate(['/login']);
      return true;
    }

    if(e.status == 403){
      this.router.navigate(['/home']);
      Swal.fire(
        'Acceso denegado',
        `Hola ${this._authService.usuario.username}, no tienes acceso a este recurso`,
        'warning'
      );
      
      return true;
    }

    return false;
  }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(() => e);
      })
    );
  }

  create(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint, usuario, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()})
      .pipe((catchError( e => {
        this.router.navigate(['/usuarios'])
  
          if(e.status == 500){
            return throwError(() => e);
          }

          if(this.isNoAutorizado(e)){
            return throwError(() => e);
          }
  
          Swal.fire({
            title: e.error.mensaje,
            text: e.error.error,
            icon: 'error'
          });
        
        return throwError(() => e);
         
    })));
  }

  bloquearUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/lock/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(() => e);
      })
    );
  }

  desbloquearUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/unlock/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(() => e);
      })
    );
  }

}
