import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropertyComponent } from './property/property.component';
import { ContactComponent } from './contact/contact.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { BookTourComponent } from './book-tour/book-tour.component';
import { TourComponent } from './tour/tour.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'property', component: PropertyComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'book-tour/:id', component: BookTourComponent },
      { path: 'tour', component:TourComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
