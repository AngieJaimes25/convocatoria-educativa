import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Convocatorias
import { AgregarConvocatoriaComponent } from './pages/convocatorias/agregar-convocatoria/agregar-convocatoria.component';
import { HistorialConvocatoriasComponent } from './pages/convocatorias/historial-convocatorias/historial-convocatorias.component';

// Propuestas
import { ListarPropuestasComponent } from './pages/propuestas/listar-propuestas/listar-propuestas.component';

// Profesores
import { ListarProfesoresComponent } from './pages/profesores/listar-profesores/listar-profesores.component';

// Materias
import { ListarMateriasComponent } from './pages/materias/listar-materias/listar-materias.component';

// Semilleros
import { ListarSemillerosComponent } from './pages/semilleros/listar-semilleros/listar-semilleros.component';

// Evaluadores
import { AsignarEvaluadorComponent } from './pages/evaluadores/asignar-evaluador/asignar-evaluador.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    NavbarComponent,
    AgregarConvocatoriaComponent,
    HistorialConvocatoriasComponent,
    ListarPropuestasComponent,
    ListarProfesoresComponent,
    ListarMateriasComponent,
    ListarSemillerosComponent,
    AsignarEvaluadorComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
