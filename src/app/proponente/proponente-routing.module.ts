import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarPropuestaComponent } from './pages/registrar-propuesta/registrar-propuesta.component';
import { ProponenteLayoutComponent } from './layout/proponente-layout/proponente-layout.component';
import { ListarPropuestasComponent } from './pages/listar-propuestas/listar-propuestas.component';

const routes: Routes = [
  {
    path: '',
    component: ProponenteLayoutComponent,
    children: [
      { path: '', component: ListarPropuestasComponent },
      { path: 'registrar', component: RegistrarPropuestaComponent },
      { path: '**', redirectTo: '' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProponenteRoutingModule { }
