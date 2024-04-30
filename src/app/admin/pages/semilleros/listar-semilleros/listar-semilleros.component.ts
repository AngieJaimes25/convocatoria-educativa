import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Semillero } from 'src/app/admin/interfaces';
import { SemillerosService } from 'src/app/admin/services/semilleros.service';

@Component({
  selector: 'app-listar-semilleros',
  templateUrl: './listar-semilleros.component.html',
  styleUrl: './listar-semilleros.component.css',
  providers: [MessageService]
})
export class ListarSemillerosComponent {

  private semiilerosService                      = inject( SemillerosService );
  private router                                 = inject( Router );
  private messageService                         = inject( MessageService );
  private fb                                     = inject( FormBuilder );
  public semilleros: Semillero[]                 = [];
  public semilleroSeleccionado: Semillero | null = null;
  public visible: boolean                        = false;

  public myForm: FormGroup = this.fb.group({
    id: [],
    codigo: ['', [ Validators.required ]],
    nombre: ['', [ Validators.required ]],
    sigla: ['', [ Validators.required ]],
  });

  ngOnInit(): void {
    this.obtenerSemilleros();
  }

  obtenerSemilleros(): void {
    this.semiilerosService.obtenerSemilleros()
      .subscribe( data => this.semilleros = data );
  }

  isValidField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  editarSemillero(semillero: Semillero) {
    this.semilleroSeleccionado = semillero;
    this.myForm.patchValue(this.semilleroSeleccionado);
    this.showDialog();
  }

  submit() {
    if (!this.myForm.valid) {
      return this.myForm.markAllAsTouched();
    }
    const data = this.myForm.value;
    if (data.id){
      const { id, ...resto } = data
      this.semiilerosService.modificarSemillero(id, resto)
        .subscribe({
          next: (data) => {
            this.submitComplete('Se ha modificado el semillero');
          },
          error: (error) => {
            if(error.status === 200) {
              this.submitComplete('Se ha modificado el semillero');
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha modificar el semillero' });
            }
          }, 
        });  
      return;
    } 
    
    this.semiilerosService.agregarSemillero(data)
      .subscribe({
        next: (data) => {
          this.submitComplete('Se ha agregado un nuevo semlliero');
        },
        error: (error) => {
          if(error.status === 200) {
            this.submitComplete('Se ha agregado un nuevo semlliero');
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido agregar un nuevo semlliero' });
          }
        }, 
      });
  }

  submitComplete(detail: string) {
    this.visible = false;
    this.myForm.reset();
    this.obtenerSemilleros();
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
