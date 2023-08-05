import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html'
})
export class FormCategoriaComponent implements OnInit {

  categoria : Categoria = new Categoria();

  errores: string[];

  constructor(private _categoriaService: CategoriaService, private router: Router, private activatedRdoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCategoria();
  }

  create() {
    this._categoriaService.create(this.categoria).subscribe( categoria => {
      console.log(categoria);
      Swal.fire({
        title: 'Nueva categoría',
        text: `La categoría ${categoria.nombre} ha sido creada con éxito`,
        icon: 'success'
      });
      this.router.navigate(['/categorias'])
    },err => {
      this.errores = err.error.errors as string[];
      console.log("Código de error desde el backend: " + err.status);
      console.log(this.errores);
    });
  }

  cargarCategoria(){
    this.activatedRdoute.paramMap.subscribe( params => {
      let id:number = +params.get('id');

      if(id){
        this._categoriaService.getCategoria(id).subscribe( resp => {
          this.categoria = resp;
          console.log(resp);
        });
      }
    });
  }

  update() {
    this._categoriaService.update(this.categoria).subscribe(categoria => {
      console.log(categoria);
      Swal.fire({
        title: 'Categoría modificada',
        text: `La categoría ${categoria.nombre} ha sido modificada con éxito`,
        icon: 'success'
      });
      this.router.navigate(['/categorias']);
    },err => {
      this.errores = err.error.errors as string[];
      console.log("Código de error desde el backend: " + err.status);
      console.log(this.errores);
    });
  }

}
