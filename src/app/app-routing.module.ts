import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ) },
  { path: 'evaluador', loadChildren: () => import('./evaluador/evaluador.module').then( m => m.EvaluadorModule ) },
  { path: 'proponente', loadChildren: () => import('./proponente/proponente.module').then( m => m.ProponenteModule ) },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
