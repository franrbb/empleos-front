import { Component, OnInit } from '@angular/core';
import { Vacante } from 'src/app/models/vacante';
import { VacanteService } from 'src/app/service/vacante.service';

@Component({
  selector: 'app-vacante',
  templateUrl: './vacante.component.html'
})
export class VacanteComponent implements OnInit {

  vacantes: Vacante[];

  constructor(private _vacanteService: VacanteService) { }

  ngOnInit() {
    this._vacanteService.getVacantes().subscribe(vacantes =>
      this.vacantes = vacantes
    );
  }

}
