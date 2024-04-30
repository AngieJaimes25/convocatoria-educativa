import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  router = inject( Router );
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'cerrar sesion',
        command: () => {
          this.cerrarsesion();
        },
      },
    ];
  }

  cerrarsesion() {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }
}
