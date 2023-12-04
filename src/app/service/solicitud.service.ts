import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { Solicitud } from '../models/solicitud';
import { Observable, catchError, throwError } from 'rxjs';
import { Vacante } from '../models/vacante';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private urlEndPoint: string = 'http://localhost:8090/api/solicitudes';

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient, private router: Router, private _authService: AuthService) { }

  private agregarAuthorizationHeader(){
    let token = this._authService.token;

    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(error): boolean{
    if(error.status == 401){

      if(this._authService.isAuthenticated){
        this._authService.logout();
      }

      this.router.navigate(['/login']);
      return true;
    }

    if(error.status == 403){
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

  getSolicitudes(): Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(() => e);
      })
    );
  }

  getSolicitud(id: number): Observable<Vacante> {
    return this.http.get<Vacante>(`${this.urlEndPoint}/vacante/${id}`, {headers: this.agregarAuthorizationHeader()})
      .pipe((catchError( e => {
        this.router.navigate(['/home'])
  
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

  create(solicitud: Solicitud, idVacante: number): Observable<Solicitud>{
    return this.http.post<Solicitud>(`${this.urlEndPoint}/${idVacante}`, solicitud, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(() => e);
      })
    );
  }

  createArchivo(solicitud: Solicitud, archivo: File, idVacante: number){
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("comentarios", solicitud.comentarios);

    let httpHeaders = new HttpHeaders();
    let token = this._authService.token;

    if(token != null){
      httpHeaders =  httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    return this.http.post<Solicitud>(`${this.urlEndPoint}/archivo/${idVacante}`, formData, {
      reportProgress: true,
      headers: httpHeaders
    })
    .pipe(
      catchError( e => {

        if(this.isNoAutorizado(e)){
          return throwError(() => e);
        }

        Swal.fire({
          title: e.error.mensaje,
          text: e.error.error,
          icon: 'error'
        });
        return throwError(() => e);
      })
    )
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()})
      .pipe((catchError( e => {
        this.router.navigate(['/solicitudes'])
  
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
}
