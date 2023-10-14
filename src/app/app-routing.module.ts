import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AcercaComponent } from './pages/acerca/acerca.component';
import { VerDetalleComponent } from './pages/home/ver-detalle.component';
import { VacanteComponent } from './pages/vacantes/vacante/vacante.component';
import { FormVacanteComponent } from './pages/vacantes/form-vacante/form-vacante.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { FormCategoriaComponent } from './pages/categorias/form-categoria.component';
import { SubirFotoComponent } from './pages/vacantes/subir-foto/subir-foto.component';
import { LoginComponent } from './pages/usuarios/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'acerca', component: AcercaComponent},
  { path: 'home/verDetalle/:id', component: VerDetalleComponent},
  { path: 'vacantes', component: VacanteComponent},
  { path: 'vacantes/page/:page', component: VacanteComponent},
  { path: 'vacantes/formVacante', component: FormVacanteComponent},
  { path: 'vacantes/formVacante/:id', component: FormVacanteComponent},
  { path: 'vacantes/formImagen/:id', component: SubirFotoComponent},
  { path: 'vacantes/delete/:id', component: VacanteComponent},
  { path: 'categorias', component: CategoriasComponent},
  { path: 'categorias/formCategoria', component: FormCategoriaComponent},
  { path: 'categorias/formCategoria/:id', component: FormCategoriaComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
