import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  private fb                                = inject( FormBuilder );
  public propuestasDeMaterias: Propuesta[]  = [];
  public propuestasDeSemillero: Propuesta[] = [];
  public visible: boolean = false;
  public propuestaSeleccionada: Propuesta | undefined | null = null;
  
  public myForm: FormGroup = this.fb.group({
    calificacion: [],
  });

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

  abrirModal(propuesta: Propuesta) {
    this.propuestaSeleccionada = propuesta;
    this.visible = true;
  }

  submit() {
    if (this.myForm.invalid) return;
    const { calificacion } = this.myForm.value;
    this.propuestasService.calificarPropuesta(this.propuestaSeleccionada!.id, calificacion)
      .subscribe({
        next: (data) => {
          this.myForm.reset();
          this.visible = false;
        }, 
        error: (error) => {
          this.myForm.reset();
          this.visible = false;
        }
      });
  }
}
