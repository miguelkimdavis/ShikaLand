import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css'
})
export class TourComponent {
    properties = [
      { id: 1, title: 'Plot in Ruiru' },
      { id: 2, title: 'Plot in Joska' },
      // Add more properties...
    ];
  
    selectedPropertyId!: number;
    tourDate!: string;
    minDate!: string;
  
    ngOnInit() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
  
      // Format to yyyy-MM-dd for HTML input
      this.minDate = tomorrow.toISOString().split('T')[0];
    }
  
    bookTour() {
      const booking = {
        propertyId: this.selectedPropertyId,
        date: this.tourDate,
      };
      console.log('Tour booked:', booking);
      // Submit to backend
    }
}