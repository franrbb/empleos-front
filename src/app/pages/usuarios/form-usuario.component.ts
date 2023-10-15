import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styles: [
  ]
})
export class FormUsuarioComponent implements OnInit {

  usuario : Usuario = new Usuario();

  errores: string[];

  constructor(private _usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  create() {
    this._usuarioService.create(this.usuario).subscribe( usuario => {
      console.log(usuario);
      Swal.fire({
        title: 'Nuevo usuario',
        text: `El usuario ${usuario.username} ha sido creado con éxito`,
        icon: 'success'
      });
      this.router.navigate(['/home'])
    },err => {
      this.errores = err.error.errors as string[];
      console.log("Código de error desde el backend: " + err.status);
      console.log(this.errores);
    });
  }

}
