import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AcercaComponent } from './pages/acerca/acerca.component';
import { VerDetalleComponent } from './pages/home/ver-detalle.component';
import { VacanteComponent } from './pages/vacantes/vacante/vacante.component';
import { FormVacanteComponent } from './pages/vacantes/form-vacante/form-vacante.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'acerca', component: AcercaComponent},
  { path: 'home/verDetalle/:id', component: VerDetalleComponent},
  { path: 'vacantes', component: VacanteComponent},
  { path: 'vacantes/formVacante', component: FormVacanteComponent},
  { path: 'vacantes/formVacante/:id', component: FormVacanteComponent},
  { path: 'vacantes/delete/:id', component: VacanteComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
