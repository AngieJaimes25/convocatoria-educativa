import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Profesor } from 'src/app/admin/interfaces';
import { ProfesoresService } from 'src/app/admin/services/profesores.service';

@Component({
  selector: 'app-listar-profesores',
  templateUrl: './listar-profesores.component.html',
  styleUrl: './listar-profesores.component.css',
  providers: [MessageService]
})
export class ListarProfesoresComponent {
  private profesoresService                  = inject( ProfesoresService );
  private router                             = inject( Router );
  private messageService                     = inject( MessageService );
  private fb                                 = inject( FormBuilder );
  public profesores: Profesor[]              = [];
  public profesorSeleccionado: Profesor|null = null;
  public visible: boolean                    = false;

  public myForm: FormGroup = this.fb.group({
    id: [],
    codigo: ['', [ Validators.required ]],
    nombre: ['', [ Validators.required ]],
  });

  ngOnInit(): void {
    this.obtnerProfesores();
  }

  obtnerProfesores(): void {
    this.profesoresService.obtenerProfesores()
      .subscribe( data => this.profesores = data );
  }

  isValidField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  editarProfesor(profesor: Profesor) {
    this.profesorSeleccionado = profesor;
    this.myForm.patchValue(this.profesorSeleccionado);
    this.showDialog();
  }

  submit() {
    if (!this.myForm.valid) {
      return this.myForm.markAllAsTouched();
    }
    const data = this.myForm.value;
    if (data.id){
      const { id, ...resto } = data
      this.profesoresService.modificarProfesor(id, resto)
        .subscribe({
          next: (data) => {
            this.submitComplete('Se ha modificado el profesor');
          },
          error: (error) => {
            if(error.status === 200) {
              this.submitComplete('Se ha modificado el profesor');
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido modificar el profesor' });
            }
          }, 
        });  
      return;
    } 
    
    this.profesoresService.agregarProfesor(data)
      .subscribe({
        next: (data) => {
          this.submitComplete('Se ha agregado un nuevo profesor');
        },
        error: (error) => {
          if(error.status === 200) {
            this.submitComplete('Se ha agregado un nuevo profesor');
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido agregar un nuevo profesor' });
          }
        }, 
      });
  }

  submitComplete(detail: string) {
    this.visible = false;
    this.myForm.reset();
    this.obtnerProfesores();
    this.messageService.add({ severity: 'success', summary: 'Exito', detail });
  }

  showDialog() {
    this.visible = true;
  }

  resetform() {
    this.myForm.reset();
  }

  return() {
    this.router.navigateByUrl('/admin/propuestas');
  }
}
