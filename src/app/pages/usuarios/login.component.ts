import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  usuario: Usuario;

  constructor(private _authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
    if(this._authService.isAuthenticated()){
      Swal.fire({
        title: 'Login',
        text: `Hola ${this._authService.usuario.username} ya estás autenticado`,
        icon: 'info'
      });
      this.router.navigate(['/home']);
    }
  }

  login(){
    console.log(this.usuario)
    if(this.usuario.username == null || this.usuario.username == "" || this.usuario.password == null || this.usuario.password == ""){
      Swal.fire({
        title: 'Error login',
        text: 'Username o password vacíos',
        icon: 'error'
      });
      return;
    }

    this._authService.login(this.usuario).subscribe(resp => {
      console.log(resp);
      /*let payload = JSON.parse(window.atob(resp.access_token.split(".")[1]));
      console.log(payload);*/

      this._authService.guardarUsuario(resp.access_token);
      this._authService.guardarToken(resp.access_token);
      let usuario = this._authService.usuario;

      this.router.navigate(['/home']);
      Swal.fire({
        title: 'Login',
        text:   `Hola ${usuario.username}, has iniciado sesión con éxito`,
        icon: 'success'
      });
    }, err => {
      if(err.status == 400){
        Swal.fire({
          title: 'Error login',
          text: 'Usuario o clave incorrectas',
          icon: 'error'
        });
      }
    })
  }

}
