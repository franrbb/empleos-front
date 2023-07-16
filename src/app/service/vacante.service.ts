import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacante } from '../models/vacante';

@Injectable({
  providedIn: 'root'
})
export class VacanteService {

  private urlEndPoint: string = 'http://localhost:8090/api/vacantes';

  constructor(private http: HttpClient) { }

  getVacantes(): Observable<Vacante[]>{
    return this.http.get<Vacante[]>(this.urlEndPoint);
  }
}
