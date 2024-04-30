import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluadorRoutingModule } from './evaluador-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { EvaluadorLayoutComponent } from './layout/evaluador-layout/evaluador-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    EvaluadorLayoutComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    EvaluadorRoutingModule,
    PrimengModule,
  ]
})
export class EvaluadorModule { }
