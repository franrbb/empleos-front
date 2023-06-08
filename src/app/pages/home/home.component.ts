import { Component, OnInit } from '@angular/core';
import { Vacante } from 'src/app/models/vacante';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  vacantes: Vacante[];

  status: string = "aprobada";
  destacado: number = 1;

  constructor(private _homeService: HomeService) { }

  ngOnInit() {
    this._homeService.getVacantes(this.status, this.destacado).subscribe(vacantes =>
      this.vacantes = vacantes
    );
  }

}
