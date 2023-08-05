import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vacante } from 'src/app/models/vacante';
import { VacanteService } from 'src/app/service/vacante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vacante',
  templateUrl: './vacante.component.html'
})
export class VacanteComponent implements OnInit {

  vacantes: Vacante[];
  paginador: any;

  constructor(private _vacanteService: VacanteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');

      if(!page){
        page = 0;
      }
      
      this._vacanteService.getVacantesPage(page).subscribe(resp => {
        this.vacantes = resp.content as Vacante[];
        this.paginador = resp;
      });
    })

    /*this._vacanteService.getVacantes().subscribe(vacantes =>
      this.vacantes = vacantes
    );*/
  }

  delete(vacante: Vacante){
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar la vacante ${vacante.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this._vacanteService.delete(vacante.id).subscribe(resp => {
          this.vacantes = this.vacantes.filter(cli => cli !== vacante);
          Swal.fire(
            'Vacante eliminada!',
            `Vacante ${vacante.nombre} eliminada con éxito`,
            'success'
          );
        }); 
      }
    });
  }

}
