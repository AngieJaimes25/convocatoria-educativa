import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProponenteRoutingModule } from './proponente-routing.module';
import { ProponenteLayoutComponent } from './layout/proponente-layout/proponente-layout.component';
import { RegistrarPropuestaComponent } from './pages/registrar-propuesta/registrar-propuesta.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ListarPropuestasComponent } from './pages/listar-propuestas/listar-propuestas.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavbarComponent,
    ProponenteLayoutComponent,
    ListarPropuestasComponent,
    RegistrarPropuestaComponent
  ],
  imports: [
    CommonModule,
    ProponenteRoutingModule,
    PrimengModule,
    ReactiveFormsModule
  ]
})
export class ProponenteModule { }
