import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndPoint: string = 'http://localhost:8090/api/categorias';

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

  getCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(() => e);
      })
    );
  }

  create(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.urlEndPoint, categoria, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(() => e);
      })
    );
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()})
      .pipe((catchError( e => {
        this.router.navigate(['/categorias'])
  
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

  update(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.urlEndPoint}/${categoria.id}`, categoria, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()})
      .pipe((catchError( e => {
        this.router.navigate(['/categorias'])
  
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
