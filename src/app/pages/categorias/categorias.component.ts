import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[];

  constructor(private _categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this._categoriaService.getCategorias().subscribe(categorias =>
      this.categorias = categorias
    );
  }

  delete(categoria: Categoria){
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar la categoria ${categoria.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this._categoriaService.delete(categoria.id).subscribe(resp => {
          this.categorias = this.categorias.filter(cli => cli !== categoria);
          Swal.fire(
            'Categoría eliminada!',
            `Categoría ${categoria.nombre} eliminada con éxito`,
            'success'
          );
        }); 
      }
    });
  }

}
