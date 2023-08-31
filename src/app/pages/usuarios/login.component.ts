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
      let payload = JSON.parse(window.atob(resp.access_token.split(".")[1]));
      console.log(payload);
      this.router.navigate(['/home']);
      Swal.fire({
        title: 'Login',
        text:   `Hola ${payload.user_name}, has iniciado sesión con éxito`,
        icon: 'success'
      });
    })
  }

}
