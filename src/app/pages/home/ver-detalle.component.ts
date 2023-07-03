import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vacante } from 'src/app/models/vacante';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-ver-detalle',
  templateUrl: './ver-detalle.component.html',
  styleUrls: ['./ver-detalle.component.css']
})
export class VerDetalleComponent implements OnInit {

  vacante: Vacante;

  constructor(private _homeService: HomeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let id:number = +params.get('id');

      if(id){
        this._homeService.getDetalle(id).subscribe( resp => {
          this.vacante = resp;
          console.log(resp);
        });
      }
    });
  }
}
