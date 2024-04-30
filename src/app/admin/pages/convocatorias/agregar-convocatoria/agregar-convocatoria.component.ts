import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ConvocatoriasService } from 'src/app/admin/services/convocatorias.service';

@Component({
  selector: 'app-agregar-convocatoria',
  templateUrl: './agregar-convocatoria.component.html',
  styleUrl: './agregar-convocatoria.component.css',
  providers: [MessageService]
})
export class AgregarConvocatoriaComponent {
  private fb                   = inject( FormBuilder );
  private convocatoriasService = inject( ConvocatoriasService );
  private router               = inject( Router );
  private messageService       = inject( MessageService );
  private activatedRoute       = inject( ActivatedRoute );

  public myForm: FormGroup = this.fb.group({
    id: [],
    fechaInicio: ['', [ Validators.required ]],
    fechaFin: ['', [ Validators.required ]],
    fechaResultados: ['', [ Validators.required ]],
  });

  ngOnInit(): void {
    if ( !this.router.url.includes('editar') ) return;
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.convocatoriasService.obtenerConvocatoriasAbiertas() ),
      ).subscribe( convocatoria => {
        if ( !convocatoria ) {
          return this.router.navigateByUrl('/');
        }
        const data = {
          id: convocatoria.id,
          fechaInicio: new Date(convocatoria.fechaInicio),
          fechaFin: new Date(convocatoria.fechaFin),
          fechaResultados: new Date(convocatoria.fechaResultados),
        }
        this.myForm.reset( data );
        return;
      }); 
  }

  isValidField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  toHistory() {
    this.router.navigateByUrl('/admin/convocatorias/historial');
  }

  submit() {
    if(!this.myForm.valid) {
      return this.myForm.markAllAsTouched();
    }
    const data = this.myForm.value;
    if(this.myForm.value.id){
      this.convocatoriasService.actualizarConvocatorias(data)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha editado la convocatoria' });
            this.myForm.reset();
          },
          error: (error) => {
            if(error.status === 200) {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha editado la convocatoria' });
              this.myForm.reset();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido editar la convocatoria' });
            }
          }
        });
    } else {
      this.convocatoriasService.agregarConvocatoria(data)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha abierto una convocatoria' });
            this.myForm.reset();
          },
          error: (error) => {
            if(error.status === 200) {
              this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha abierto una convocatoria' });
              this.myForm.reset();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido abrir la convocatoria' });
            }
          }
        });
    }
  }
}
