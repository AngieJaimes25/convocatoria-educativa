import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluadorLayoutComponent } from './layout/evaluador-layout/evaluador-layout.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluadorLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluadorRoutingModule { }
