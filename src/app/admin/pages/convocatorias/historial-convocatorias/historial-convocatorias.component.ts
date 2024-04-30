import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Convocatoria } from 'src/app/admin/interfaces/convocatoria.interface';
import { ConvocatoriasService } from 'src/app/admin/services/convocatorias.service';

@Component({
  selector: 'app-historial-convocatorias',
  templateUrl: './historial-convocatorias.component.html',
  styleUrl: './historial-convocatorias.component.css',
  providers: [MessageService]
})
export class HistorialConvocatoriasComponent {
  private convocatoriasService = inject( ConvocatoriasService );
  private router               = inject( Router );
  private messageService       = inject(MessageService);

  convocatorias: Convocatoria[] = [];
  convocatoriaAbierta!: Convocatoria | null;

  ngOnInit(): void {
    this.obtenerConvocatorias();
    this.obtnerConvocatoriaAbierta();
  }

  obtenerConvocatorias() {
    this.convocatoriasService.obtenerConvocatorias()
      .subscribe( data => this.convocatorias = data );
  }

  obtnerConvocatoriaAbierta() {
    this.convocatoriasService.obtenerConvocatoriasAbiertas()
      .subscribe( data => this.convocatoriaAbierta = data );
  }

  mostrarConvocatorias(id:number) {
    this.router.navigateByUrl(`admin/convocatorias/editar/${id}`);
  }

  return() {
    this.router.navigateByUrl('/admin/convocatorias');
  }

  cerrarConvocatoria() {
    this.convocatoriasService.cerrarConvocatorias()
    .subscribe({
      next: (response) => {
        this.obtenerConvocatorias();
        this.convocatoriaAbierta = null;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha cerrado la convocatoria abierta' });
      },
      error: (error) => {
        if(error.status === 200) {
          this.obtenerConvocatorias();
          this.convocatoriaAbierta = null;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha cerrado la convocatoria abierta' });
        } 
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cerrar la convocatoria' });
        }
      }
    })
  }
}
