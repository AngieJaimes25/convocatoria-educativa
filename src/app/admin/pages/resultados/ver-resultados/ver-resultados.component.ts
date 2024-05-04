import { Component, inject } from '@angular/core';
import { Propuesta } from 'src/app/admin/interfaces';
import { PropuestasService } from 'src/app/admin/services/propuestas.service';

@Component({
  selector: 'app-ver-resultados',
  templateUrl: './ver-resultados.component.html',
  styleUrl: './ver-resultados.component.css'
})
export class VerResultadosComponent {
  private propuestasService      = inject( PropuestasService );
  public propuestas: Propuesta[] = [];
  
  ngOnInit(): void {
    this.obtenerPropuestas();
  }

  obtenerPropuestas() {
    this.propuestasService.obtenerPropuestas()
      .subscribe( data => {
        this.propuestas = data
        console.log(data);
      });
  }
}
