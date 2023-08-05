import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndPoint: string = 'http://localhost:8090/api/categorias';

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlEndPoint);
  }

  create(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.urlEndPoint, categoria, {headers: this.httpHeaders});
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`)
      .pipe((catchError( e => {
        this.router.navigate(['/categorias'])
  
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

  update(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.urlEndPoint}/${categoria.id}`, categoria, { headers: this.httpHeaders });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`)
      .pipe((catchError( e => {
        this.router.navigate(['/categorias'])
  
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

}
