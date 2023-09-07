import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    let username = this._authService.usuario.username;
    this._authService.logout();
    Swal.fire({
      title: 'Logout',
      text: `Hola ${username} has cerrado sesión`,
      icon: 'success'
    });
    this.router.navigate(['/login']);
  }

}
