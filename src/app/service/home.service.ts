import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacante } from '../models/vacante';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private urlEndPoint: string = 'http://localhost:8090';

  constructor(private http: HttpClient) { }

  getVacantes(status: string, destacado: number): Observable<Vacante[]>{
    return this.http.get<Vacante[]>(`${this.urlEndPoint}/home/${status}/${destacado}`);
  }

}
