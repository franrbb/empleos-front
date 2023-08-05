import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Vacante } from '../models/vacante';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class VacanteService {

  private urlEndPoint: string = 'http://localhost:8090/api/vacantes';

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getVacantes(): Observable<Vacante[]>{
    return this.http.get<Vacante[]>(this.urlEndPoint);
  }

  create(vacante: Vacante): Observable<Vacante>{
    return this.http.post<Vacante>(this.urlEndPoint, vacante, {headers: this.httpHeaders});
  }

  getVacante(id: number): Observable<Vacante> {
    return this.http.get<Vacante>(`${this.urlEndPoint}/${id}`)
      .pipe((catchError( e => {
        this.router.navigate(['/vacantes'])
  
          if(e.status == 500){
            return throwError(e);
          }
  
          Swal.fire({
            title: e.error.mensaje,
            text: e.error.error,
            icon: 'error'
          });
        
        return throwError(e);
  
    })));
  }

  update(vacante: Vacante): Observable<Vacante> {
    return this.http.put<Vacante>(`${this.urlEndPoint}/${vacante.id}`, vacante, { headers: this.httpHeaders });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`)
      .pipe((catchError( e => {
        this.router.navigate(['/vacantes'])
  
          if(e.status == 500){
            return throwError(e);
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

    return this.http.post<Vacante>(`${this.urlEndPoint}/upload`, formData)
    .pipe(
      catchError( e => {
        Swal.fire({
          title: e.error.mensaje,
          text: e.error.error,
          icon: 'error'
        });
        return throwError(e);
      })
    )
  }

}
