import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  providers: [MessageService]
})
export class RegisterPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );
  private messageService = inject( MessageService );
  
  public myForm: FormGroup = this.fb.group({
    rol:         ['1', [Validators.required]],
    codigo:      ['0', [ Validators.required, Validators.minLength(5) ]],
    email:       ['fernando@google.com', [ Validators.required, Validators.email ]],
    contraseniaDesencriptada: ['123456', [ Validators.required, Validators.minLength(6) ]],
  });
  public roles = [
    { id: '1', name: 'Evaluador' },
    { id: '2', name: 'Proponente' },
  ]

  register() {
    if (!this.myForm.valid) return;
    const { rol, codigo, email, contraseniaDesencriptada } = this.myForm.value;

    if (rol === '1') {
      this.authService.registerEvualador(codigo, email, contraseniaDesencriptada)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Error', detail: 'Se ha registrado el usuario' });
          },
          error: (error) => {
            if (error.status == 200 ) {
              this.messageService.add({ severity: 'success', summary: 'Error', detail: 'Se ha registrado el usuario' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido registrar el usuario' });
            }
          }
        });
    }
    else if (rol === '2') {
      this.authService.registerProponente(codigo, email, contraseniaDesencriptada)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Error', detail: 'Se ha registrado el usuario' });
          },
          error: (error) => {
            if (error.status == 200 ) {
              this.messageService.add({ severity: 'success', summary: 'Error', detail: 'Se ha registrado el usuario' });
            } else{
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido registrar el usuario' });
            }
          }
        });
    }
    
  }
}
