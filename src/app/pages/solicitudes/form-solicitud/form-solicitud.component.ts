import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Solicitud } from 'src/app/models/solicitud';
import { Vacante } from 'src/app/models/vacante';
import { SolicitudService } from 'src/app/service/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-solicitud',
  templateUrl: './form-solicitud.component.html'
})
export class FormSolicitudComponent implements OnInit {

  vacante: Vacante = new Vacante();

  solicitud: Solicitud = new Solicitud();

  fotoSeleccionada: File;

  errores: string[];

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

  create() {
    this._solicitudService.create(this.solicitud, this.vacante.id).subscribe( categoria => {
      console.log(categoria);
      /*Swal.fire({
        title: 'Nueva categoría',
        text: `La categoría ${categoria.nombre} ha sido creada con éxito`,
        icon: 'success'
      });
      this.router.navigate(['/categorias'])
    },err => {
      this.errores = err.error.errors as string[];
      console.log("Código de error desde el backend: " + err.status);
      console.log(this.errores);*/
    });
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    
    if(this.fotoSeleccionada.type.indexOf('pdf') < 0){
      Swal.fire({
        title: 'Error al seleccionar el documento',
        text: 'El archivo de ser de tipo PDF',
        icon: 'error'
      });
      this.fotoSeleccionada = null;
    }
  }

  createArchivo() {
    if(!this.fotoSeleccionada){
      Swal.fire({
        title: 'Error',
        text: `Debe seleccionar un archivo`,
        icon: 'error'
      });
    }else{
      this._solicitudService.createArchivo(this.solicitud, this.fotoSeleccionada, this.vacante.id).subscribe( solicitud => {
        console.log(solicitud);
        Swal.fire({
          title: 'solicitud enviada',
          text: `su CV ${solicitud.archivo} ha sido enviado con éxito`,
          icon: 'success'
        });
        this.router.navigate(['/home'])
      })
    }
  }

}
