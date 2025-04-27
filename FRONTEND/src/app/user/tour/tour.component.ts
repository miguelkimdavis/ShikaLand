import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api/api.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-tour',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './tour.component.html',
  styleUrl: './tour.component.css'
})
export class TourComponent {
  tours: any[] = [];
  selectedTour: any = null;
  selectedDate!: string;
  selectedTime!: string;
  minDate: string = ''; 
  timeMin: string = '09:00'; 
  timeMax: string = '17:00'; 

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const customerID = 1; // Fetch this from local storage or JWT token
    this.loadTours(customerID);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); 
    this.minDate = tomorrow.toISOString().split('T')[0]; 
  }

  loadTours(customerID: number) {
    this.apiService.getToursByCustomer(customerID).subscribe({
      next: (tours) => {
        this.tours = tours;
      },
      error: (err) => {
        console.error('Error fetching tours', err);
      }
    });
  }

  editTour(tour: any) {
    this.selectedTour = tour;
    this.selectedDate = tour.tourDate;
    this.selectedTime = tour.tourTime;
  }

  saveChanges() {
    if (!this.selectedDate || !this.selectedTime) {
      alert('Please select a date and time');
      return;
    }

    const updatedTour = {
      tourDate: this.selectedDate,
      tourTime: this.selectedTime,
    };

    this.apiService.updateTour(this.selectedTour.bookTourID, updatedTour).subscribe({
      next: (res) => {
        alert('Tour updated successfully');
        this.loadTours(1); 
      },
      error: (err) => {
        console.error('Error updating tour', err);
      }
    });
  }
}