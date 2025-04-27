import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class TourComponent implements OnInit {
  tours: any[] = []; 
  selectedDate!: string;
  selectedTime!: string;
  alertMessage: string = '';
  alertType: 'success' | 'danger' = 'success';
  minDate!: string;
  availableTimes: string[] = [];
  editingTourId: number | null = null; 

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getTourDetails();
    this.setMinDate();
    this.generateAvailableTimes();
  }

  getTourDetails() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const customerID = Number(localStorage.getItem('user_id'));

      if (!customerID) {
        this.alertType = 'danger';
        this.alertMessage = 'You must be logged in to view your tours.';
        return;
      }

      this.apiService.getToursByCustomer(customerID).subscribe({
        next: (res) => {
          this.tours = res; 
        },
        error: (err) => {
          console.error(err);
          this.alertType = 'danger';
          this.alertMessage = 'Failed to load your tour details.';
        }
      });
    } else {
      this.alertType = 'danger';
      this.alertMessage = 'localStorage is not available in this environment.';
    }
  }

  setMinDate() {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }

  generateAvailableTimes() {
    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      times.push(timeString);
    }
    this.availableTimes = times;
  }

  startEditTour(tour: any) {
    this.editingTourId = tour.bookTourID;
    this.selectedDate = tour.tourDate;
    this.selectedTime = tour.tourTime;
  }

  cancelEdit() {
    this.editingTourId = null;
    this.selectedDate = '';
    this.selectedTime = '';
  }

  editTour(tourId: number) {
    if (!this.selectedDate || !this.selectedTime) {
      this.alertType = 'danger';
      this.alertMessage = 'Please select both date and time to update the tour.';
      return;
    }

    const selected = new Date(this.selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected <= today) {
      this.alertType = 'danger';
      this.alertMessage = 'Please select a date starting from tomorrow.';
      return;
    }

    const tourData = {
      tourDate: this.selectedDate,
      tourTime: this.selectedTime,
      status: 'Pending'
    };

    this.apiService.updateTour(tourId, tourData).subscribe({
      next: (res) => {
        this.alertType = 'success';
        this.alertMessage = 'Tour updated successfully!';
        this.editingTourId = null;
        setTimeout(() => {
          this.getTourDetails(); 
        }, 2000);
      },
      error: (err) => {
        console.error(err);
        this.alertType = 'danger';
        this.alertMessage = 'Failed to update tour.';
      }
    });
  }
}