import { Component, inject } from '@angular/core';
import { Propuesta } from 'src/app/admin/interfaces';
import { PropuestasService } from '../../services/propuesta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-propuestas',
  templateUrl: './listar-propuestas.component.html',
  styleUrl: './listar-propuestas.component.css'
})
export class ListarPropuestasComponent {
  private propuestasService      = inject( PropuestasService );
  private router                 = inject( Router );
  public propuestas: Propuesta[] = [];

  ngOnInit(): void {
    this.obtenerPropuestas();
  }

  obtenerPropuestas() {
    this.propuestasService.obtenerPropuestas()
      .subscribe({
        next: (data) => {
          console.log(data);
          this.propuestas = data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  redirectAgregar() {
    this.router.navigateByUrl('proponente/registrar');
  }
}
