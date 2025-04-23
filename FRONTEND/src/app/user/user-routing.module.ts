import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropertyComponent } from './property/property.component';
import { TourComponent } from './tour/tour.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'property',
    component:PropertyComponent
  },
  {
    path:'tour',
    component:TourComponent
  },
  {
    path:'contact',
    component:ContactComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
