import { Component, OnInit } from '@angular/core';
import { VacanteService } from '../../../service/vacante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacante } from 'src/app/models/vacante';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
  styleUrls: ['./subir-foto.component.css']
})
export class SubirFotoComponent implements OnInit {

  vacante: Vacante;

  fotoSeleccionada: File;

  constructor(private router: Router, private _vacanteService: VacanteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get("id");

      if(id){
        this._vacanteService.getVacante(id).subscribe(vacante => {
          this.vacante = vacante;
        })
      }
    })
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      Swal.fire({
        title: 'Error al seleccionar la imagen',
        text: 'El archivo de ser de tipo imagen',
        icon: 'error'
      });
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      Swal.fire({
        title: 'Error',
        text: `Debe seleccionar una foto`,
        icon: 'error'
      });
    }else{
      this._vacanteService.subirFoto(this.fotoSeleccionada, this.vacante.id).subscribe(vacante => {
        this.vacante = vacante;
        Swal.fire({
          title: 'La foto se ha subido correctamente',
          text: `La foto ${this.vacante.imagen} se ha subido con éxito`,
          icon: 'success'
        });
        this.router.navigate(['/vacantes'])
      })
    }
    
  }
}
