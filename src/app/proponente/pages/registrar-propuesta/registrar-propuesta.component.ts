import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Materia, Profesor, Semillero } from 'src/app/admin/interfaces';
import { ProfesoresService } from '../../services/profesores.service';
import { MateriasService } from '../../services/materias.service';
import { SemillerosService } from '../../services/semilleros.service';
import { PropuestasService } from '../../services/propuesta.service';

@Component({
  selector: 'app-registrar-propuesta',
  templateUrl: './registrar-propuesta.component.html',
  styleUrl: './registrar-propuesta.component.css'
})
export class RegistrarPropuestaComponent implements OnInit {

  private fb                    = inject( FormBuilder );
  private profesorService = inject( ProfesoresService );
  private materiaService = inject( MateriasService );
  private semilleroService = inject( SemillerosService );
  private propuestasService = inject( PropuestasService );
  
  public profesores: Profesor[] = []; 
  public materias: Materia[] = [];
  public semilleros: Semillero[] = [];   

  public myForm: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required ]],
    profesor: [null, [ Validators.required ]],
    semillero: [null],
    materia: [null],
    archivo: ['', [ Validators.required ]],
    tipo: ['', [ Validators.required ]],
    estudiantes: this.fb.array([])
  });

  ngOnInit() {
    this.obtenerProfesores();
    this.obtenerMaterias();
    this.obtenerSemilleros();
  }

  obtenerProfesores() {
    this.profesorService.obtenerProfesores()
      .subscribe({
        next: (data) => this.profesores = data,
        error: (error) => console.log(error)
      });
  }

  obtenerMaterias() {
    this.materiaService.obtenerMaterias()
      .subscribe({
        next: (data) => this.materias = data,
        error: (error) => console.log(error)
      });
  }

  obtenerSemilleros() {
    this.semilleroService.obtenerSemilleros()
      .subscribe({
        next: (data) => this.semilleros = data,
        error: (error) => console.log(error)
      });
  }

  agregarEstudiante() {
    const estudianteFormGroup = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      semestre: ['', Validators.required]
    });
    this.estudiantes.push(estudianteFormGroup);
  }

  eliminarEstudiante(index: number) {
    this.estudiantes.removeAt(index);
  }

  get estudiantes() {
    return this.myForm.get('estudiantes') as FormArray;
  }

  isValidField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  isValidEstudianteField( field: string, i : number ) {
    return this.estudiantes?.controls[i]?.get(field)?.errors && this.estudiantes?.controls[i]?.get(field)?.touched;
  }

  subirArchivo(event: any) {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    this.propuestasService.subirArchivo(formData).subscribe({
      next: (data) => {
        console.log(data);
        this.myForm.get('archivo')?.setValue(data)
      }, 
      error: (error) => {
        console.log(error);
      }
    });
  }

  submit() {
    console.log(this.myForm.value);
  }
}
