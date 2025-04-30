import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPropertyComponent } from './admin-property/admin-property.component';
import { AdminTourComponent } from './admin-tour/admin-tour.component';
import { AdminContactComponent } from './admin-contact/admin-contact.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'home', component: AdminHomeComponent },
      { path: 'property', component: AdminPropertyComponent },
      { path: 'tour', component: AdminTourComponent },
      { path: 'contact', component: AdminContactComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
