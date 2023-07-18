import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Vacante } from 'src/app/models/vacante';
import { CategoriaService } from 'src/app/service/categoria.service';
import { VacanteService } from 'src/app/service/vacante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-vacante',
  templateUrl: './form-vacante.component.html'
})
export class FormVacanteComponent implements OnInit {

  vacante: Vacante = new Vacante();
  categorias: Categoria[];

  constructor(private _vacanteService: VacanteService, private _categoriaService: CategoriaService, private router: Router, private activatedRdoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarVacante();
    this._categoriaService.getCategorias().subscribe( categorias => {
      this.categorias = categorias;
      console.log(categorias);
    });
  }

  create() {
    this._vacanteService.create(this.vacante).subscribe( vacante => {
      console.log(vacante);
      Swal.fire({
        title: 'Nueva vacante',
        text: `La vacante ${vacante.nombre} ha sido creada con éxito`,
        icon: 'success'
      });
      this.router.navigate(['/vacantes'])
    });
  }

  cargarVacante(){
    this.activatedRdoute.paramMap.subscribe( params => {
      let id:number = +params.get('id');

      if(id){
        this._vacanteService.getVacante(id).subscribe( resp => {
          this.vacante = resp;
          console.log(resp);
        });
      }
    });
  }

  update() {
    this._vacanteService.update(this.vacante).subscribe(vacante => {
      console.log(vacante);
      Swal.fire({
        title: 'Vacante modificada',
        text: `La vacante ${vacante.nombre} ha sido modificada con éxito`,
        icon: 'success'
      });
      this.router.navigate(['/vacantes']);
    });
  }

  compararCategoria(o1: Categoria, o2: Categoria){
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
