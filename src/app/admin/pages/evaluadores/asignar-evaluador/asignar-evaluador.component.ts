import { Component, OnInit, inject } from '@angular/core';
import { Propuesta } from 'src/app/admin/interfaces';
import { PropuestasService } from 'src/app/admin/services/propuestas.service';
import { UsuarioService } from 'src/app/admin/services/usuario.service';

@Component({
  selector: 'app-asignar-evaluador',
  templateUrl: './asignar-evaluador.component.html',
  styleUrl: './asignar-evaluador.component.css'
})
export class AsignarEvaluadorComponent implements OnInit {
  private propuestasService      = inject( PropuestasService );
  private usuarioService         = inject( UsuarioService );
  public propuestas: Propuesta[] = [];
  public evaluadores: any = [];
  public visible: boolean = false;

  ngOnInit(): void {
    this.obtenerPropuestas();
    this.obtenerEvaluadores();
  }

  obtenerPropuestas() {
    this.propuestasService.obtenerPropuestas()
      .subscribe( data => {
        this.propuestas = data
        console.log(data);
      });
  }

  obtenerEvaluadores() {
    this.usuarioService.obtenerEvaluadores()
      .subscribe( data => {
        this.evaluadores = data
        console.log(this.evaluadores);
      });
  }

  showModal() {
    this.visible = true;
  }
}
