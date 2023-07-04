import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Vacante } from '../models/vacante';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private urlEndPoint: string = 'http://localhost:8090/api/vacantes';

  constructor(private http: HttpClient, private router: Router) { }

  getVacantes(status: string, destacado: number): Observable<Vacante[]>{
    return this.http.get<Vacante[]>(`${this.urlEndPoint}/home/${status}/${destacado}`);
  }

  getDetalle(id: number) :Observable<Vacante>{
    return this.http.get<Vacante>(`${this.urlEndPoint}/home/verDetalle/${id}`)
    .pipe(catchError(e => {
      this.router.navigate(['/home'])
      Swal.fire({
        title: 'Error al recuperar vacante',
        text: e.error.mensaje,
        icon: 'error'
      })
      return throwError (e);
    }))
  }

}
