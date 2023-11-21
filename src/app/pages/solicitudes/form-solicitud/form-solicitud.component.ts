import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacante } from 'src/app/models/vacante';
import { SolicitudService } from 'src/app/service/solicitud.service';

@Component({
  selector: 'app-form-solicitud',
  templateUrl: './form-solicitud.component.html'
})
export class FormSolicitudComponent implements OnInit {

  vacante: Vacante = new Vacante();

  constructor(private _solicitudService: SolicitudService, private router: Router, private activatedRdoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarSolicitud();
  }

  cargarSolicitud(){
    this.activatedRdoute.paramMap.subscribe( params => {
      let id:number = +params.get('id');

      if(id){
        this._solicitudService.getSolicitud(id).subscribe( vacante => {
          this.vacante = vacante;
          console.log(vacante);
        });
      }
    });
  }

}
