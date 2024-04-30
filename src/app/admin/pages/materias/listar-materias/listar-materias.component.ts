import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Materia } from 'src/app/admin/interfaces';
import { MateriasService } from 'src/app/admin/services/materias.service';

@Component({
  selector: 'app-listar-materias',
  templateUrl: './listar-materias.component.html',
  styleUrl: './listar-materias.component.css',
  providers: [MessageService]
})
export class ListarMateriasComponent {

  private materiasService                  = inject( MateriasService );
  private router                           = inject( Router );
  private messageService                   = inject( MessageService );
  private fb                               = inject( FormBuilder );
  public materias: Materia[]               = [];
  public materiaSeleccionada: Materia|null = null;
  public visible: boolean                  = false;

  public myForm: FormGroup = this.fb.group({
    id: [],
    codigo: ['', [ Validators.required ]],
    grupo: ['', [ Validators.required ]],
    nombre: ['', [ Validators.required ]],
  });

  ngOnInit(): void {
    this.obtenerMaterias();
  }

  obtenerMaterias(): void {
    this.materiasService.obtenerMaterias()
      .subscribe( data => this.materias = data );
  }

  isValidField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  editarMateria(materia: Materia) {
    this.materiaSeleccionada = materia;
    this.myForm.patchValue(this.materiaSeleccionada);
    this.showDialog();
  }

  submit() {
    if (!this.myForm.valid) {
      return this.myForm.markAllAsTouched();
    }
    const data = this.myForm.value;
    if (data.id){
      const { id, ...resto } = data
      console.log(resto);
      this.materiasService.modificarMateria(id, resto)
        .subscribe({
          next: (data) => {
            this.submitComplete('Se ha modificado la materia');
          },
          error: (error) => {
            if(error.status === 200) {
              this.submitComplete('Se ha modificado la materia');
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido modificar la materia' });
            }
          }, 
        });
      return;
    } 
    
    this.materiasService.agregarMateria(data)
      .subscribe({
        next: (data) => {
          this.submitComplete('Se ha agregado una nueva materia');
        },
        error: (error) => {
          if(error.status === 200) {
            this.submitComplete('Se ha agregado una nueva materia');
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido agregar una nueva materia' });
          }
        }, 
      });
  }

  submitComplete(detail: string) {
    this.visible = false;
    this.myForm.reset();
    this.obtenerMaterias();
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
