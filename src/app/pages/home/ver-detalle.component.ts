import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vacante } from 'src/app/models/vacante';
import { AuthService } from 'src/app/service/auth.service';
import { HomeService } from 'src/app/service/home.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-ver-detalle',
  templateUrl: './ver-detalle.component.html',
  styleUrls: ['./ver-detalle.component.css']
})
export class VerDetalleComponent implements OnInit {

  vacante: Vacante;

  usuario: Usuario;

  constructor(private _homeService: HomeService, private activatedRoute: ActivatedRoute, public _authService: AuthService) { }

  ngOnInit(): void {
    this.cargarVacante();
  }

  cargarVacante(){
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
