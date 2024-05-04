import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

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
import { AsignarEvaluadorComponent } from './pages/evaluadores/asignar-evaluador/asignar-evaluador.component';
import { VerResultadosComponent } from './pages/resultados/ver-resultados/ver-resultados.component';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { 
        path: 'convocatorias', 
        children: [
          { path: '', component: AgregarConvocatoriaComponent },
          { path: 'editar/:id', component: AgregarConvocatoriaComponent },
          { path: 'historial', component: HistorialConvocatoriasComponent },
          { path: '**', redirectTo: '' }
        ]
      },
      { 
        path: 'propuestas',
        children: [
          { path: '', component: ListarPropuestasComponent },
          { path: 'materias', component: ListarMateriasComponent },
          { path: 'profesores', component: ListarProfesoresComponent },
          { path: 'semilleros', component: ListarSemillerosComponent },
          { path: '**', redirectTo: '' }
        ]
      },
      {
        path: 'evaluadores',
        children: [
          { path: '', component: AsignarEvaluadorComponent },
          { path: '**', redirectTo: '' }
        ]
      },
      { 
        path: 'resultados',
        children: [
          { path: '', component: VerResultadosComponent },
          { path: '**', redirectTo: '' }
        ] 
      },
      { path: '**', redirectTo: 'convocatorias' }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
