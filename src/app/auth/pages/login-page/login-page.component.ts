import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  providers: [MessageService]
})
export class LoginPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );
  private messageService = inject( MessageService );

  public myForm: FormGroup = this.fb.group({
    codigo:   ['05432', [ Validators.required, Validators.minLength(4) ]],  
    email:    ['admin@ufps.edu.co', [ Validators.required, Validators.email ]],
    contrasenia: ['', [ Validators.required, Validators.minLength(3) ]],
  });

  public myFormPassword: FormGroup = this.fb.group({
    email:    ['admin@ufps.edu.co', [ Validators.required, Validators.email ]],
  });

  visible: boolean = false;

  isValidField( field: string ) {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }
  
  showDialog() {
    this.visible = true;
  }

  login() {
    if (!this.myForm.valid) return this.myForm.markAllAsTouched();

    const { codigo, email, contrasenia } = this.myForm.value;
    this.authService.login(codigo, email, contrasenia)
      .subscribe({
        next: (data) => {
          if (data?.rol == 'ROL_PROPONENTE') {
            this.router.navigateByUrl('/proponente');
          }

          if (data?.rol == 'ROL_ADMIN') {
            this.router.navigateByUrl('/admin');
          }
          /* if(codigo.startsWith('1')) {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/user');
          } */
        },
        error: (erro) => {
          console.log(erro);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credenciales incorrectas' });
        }
      });
  }

  resetPassword() {
    this.authService.resetPassword(this.myFormPassword.value.email)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha enviado un correo de recuperacion' });
        },
        error: (error) => {
          if(error.status === 200) {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha enviado un correo de recuperacion' });
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al enviar el correo de recuperacion' });
          }
        }
      });
  }
}
