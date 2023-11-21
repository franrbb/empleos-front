import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AcercaComponent } from './pages/acerca/acerca.component';
import { VerDetalleComponent } from './pages/home/ver-detalle.component';
import { ActivatedRoute } from '@angular/router';
import { VacanteComponent } from './pages/vacantes/vacante/vacante.component';
import { FormVacanteComponent } from './pages/vacantes/form-vacante/form-vacante.component';
import { FormsModule } from '@angular/forms';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { FormCategoriaComponent } from './pages/categorias/form-categoria.component';
import { SubirFotoComponent } from './pages/vacantes/subir-foto/subir-foto.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { LoginComponent } from './pages/usuarios/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { FormUsuarioComponent } from './pages/usuarios/form-usuario.component';
import { FormSolicitudComponent } from './pages/solicitudes/form-solicitud/form-solicitud.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AcercaComponent,
    VerDetalleComponent,
    VacanteComponent,
    FormVacanteComponent,
    CategoriasComponent,
    FormCategoriaComponent,
    SubirFotoComponent,
    PaginatorComponent,
    LoginComponent,
    UsuariosComponent,
    FormUsuarioComponent,
    FormSolicitudComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
