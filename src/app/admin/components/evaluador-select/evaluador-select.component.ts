import { Component, Input, inject } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/usuario.interface';
import { PropuestasService } from '../../services/propuestas.service';

@Component({
  selector: 'app-evaluador-select',
  templateUrl: './evaluador-select.component.html',
  styleUrl: './evaluador-select.component.css'
})
export class EvaluadorSelectComponent {
  @Input() evaluadores: Usuario[] = [];
  @Input() evaluadorId: number | null | undefined = undefined;
  @Input() propuestaId: number = 0; 

  private propuestasService = inject(PropuestasService);
  
  asignarEvaluador(event: any) {
    this.propuestasService.asignarEvaluador(this.propuestaId, this.evaluadorId!)
      .subscribe();
  }
}
