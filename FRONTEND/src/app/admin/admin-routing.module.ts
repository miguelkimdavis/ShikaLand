import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPropertyComponent } from './admin-property/admin-property.component';
import { AdminTourComponent } from './admin-tour/admin-tour.component';
import { AdminfinanceComponent } from './adminfinance/adminfinance.component';
import { AdminContactComponent } from './admin-contact/admin-contact.component';

const routes: Routes = [
  {
    path:'',
    component:AdminHomeComponent
  },
  {
    path:'property',
    component:AdminPropertyComponent
  },
  {
    path:'tour',
    component:AdminTourComponent
  },
  {
    path:'finance',
    component:AdminfinanceComponent
  },
  {
    path:'contact',
    component:AdminContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
