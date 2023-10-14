import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private _usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this._usuarioService.getUsuarios().subscribe(usuarios =>
      this.usuarios = usuarios
    );
  }

  delete(usuario: Usuario){
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar el usuario ${usuario.username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.delete(usuario.id).subscribe(resp => {
          this.usuarios = this.usuarios.filter(cli => cli !== usuario);
          Swal.fire(
            'Usuario eliminada!',
            `Usuario ${usuario.username} eliminado con éxito`,
            'success'
          );
        }); 
      }
    });
  }

  bloquearUsuario(usuario: Usuario){
    this._usuarioService.bloquearUsuario(usuario.id).subscribe(resp => {
      alert(`Usuario ${usuario.username} bloqueado con éxito`,)
      location.reload(); 
    });
  }

  desbloquearUsuario(usuario: Usuario){
    this._usuarioService.desbloquearUsuario(usuario.id).subscribe(resp => {
      alert(`Usuario ${usuario.username} desbloqueado con éxito`,)
      location.reload(); 
    });

  }

}
