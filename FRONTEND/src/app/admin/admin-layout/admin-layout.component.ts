import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminFooterComponent } from '../admin-footer/admin-footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, AdminHeaderComponent, AdminFooterComponent],
  template: `
    <app-admin-header></app-admin-header>
    <router-outlet></router-outlet>
    <app-admin-footer></app-admin-footer>
  `
})
export class AdminLayoutComponent {}
