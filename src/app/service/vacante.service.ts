import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Vacante } from '../models/vacante';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VacanteService {

  private urlEndPoint: string = 'http://localhost:8090/api/vacantes';

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
    if(e.status == 401 || e.status == 403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  getVacantes(): Observable<Vacante[]>{
    return this.http.get<Vacante[]>(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(() => e);
      })
    );
  }

  getVacantesPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      map( (resp:any) => {
        (resp.content as Vacante[]).map(vacante => {
          return vacante;
        });
        return resp;
      }), 
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(() => e);
      }));
  }

  create(vacante: Vacante): Observable<Vacante>{
    return this.http.post<Vacante>(this.urlEndPoint, vacante, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(() => e);
      })
    );
  }

  getVacante(id: number): Observable<Vacante> {
    return this.http.get<Vacante>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()})
      .pipe((catchError( e => {
        this.router.navigate(['/vacantes'])
  
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

  update(vacante: Vacante): Observable<Vacante> {
    return this.http.put<Vacante>(`${this.urlEndPoint}/${vacante.id}`, vacante, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()})
      .pipe((catchError( e => {
        this.router.navigate(['/vacantes'])
  
          if(e.status == 500){
            return throwError(e);
          }

          if(this.isNoAutorizado(e)){
            return throwError(() => e);
          }
  
          Swal.fire({
            title: e.error.mensaje,
            text: e.error.error,
            icon: 'error'
          });
        
        return throwError(e);
         
    })));
  }

  subirFoto(archivo: File, id): Observable<Vacante>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this._authService.token;

    if(token != null){
      httpHeaders =  httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    return this.http.post<Vacante>(`${this.urlEndPoint}/upload`, formData, {
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

}
