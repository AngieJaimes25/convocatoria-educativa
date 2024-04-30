import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Propuesta } from 'src/app/admin/interfaces';
import { PropuestasService } from 'src/app/admin/services/propuestas.service';

@Component({
  selector: 'app-listar-propuestas',
  templateUrl: './listar-propuestas.component.html',
  styleUrl: './listar-propuestas.component.css'
})
export class ListarPropuestasComponent {
  private router                            = inject( Router );
  private propuestasService                 = inject( PropuestasService );
  public propuestasDeMaterias: Propuesta[]  = [];
  public propuestasDeSemillero: Propuesta[] = [];

  ngOnInit(): void {
    this.propuestasService.obtenerPropuestas()
      .subscribe({
        next: ( data ) => {
          this.propuestasDeMaterias = data.filter(p => p.materia != null);
          this.propuestasDeSemillero = data.filter(p => p.semillero != null);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  verProfesores() {
    this.router.navigateByUrl('/admin/propuestas/profesores');
  }

  verMaterias() {
    this.router.navigateByUrl('/admin/propuestas/materias');
  }

  verSemilleros() {
    this.router.navigateByUrl('/admin/propuestas/semilleros');
  }
}
