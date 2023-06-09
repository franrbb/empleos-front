import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AcercaComponent } from './pages/acerca/acerca.component';
import { VerDetalleComponent } from './pages/home/ver-detalle.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'acerca', component: AcercaComponent},
  { path: 'home/verDetalle/:id', component: VerDetalleComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
