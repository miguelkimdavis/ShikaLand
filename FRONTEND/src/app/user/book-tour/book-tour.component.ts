import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../shared/api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-tour',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-tour.component.html',
  styleUrls: ['./book-tour.component.css']
})
export class BookTourComponent implements OnInit {
  propertyId!: number;
  property: any;
  selectedDate!: string;
  selectedTime!: string;
  alertMessage: string = '';
  alertType: 'success' | 'danger' = 'success';
  minDate!: string;
  availableTimes: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.propertyId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchProperty();
    this.setMinDate();
    this.generateAvailableTimes();
  }

  fetchProperty() {
    this.apiService.getProperty(this.propertyId).subscribe({
      next: (property) => {
        this.property = property;
      },
      error: (err) => {
        console.error(err);
      }
    });
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

  bookTour() {
    if (!this.selectedDate || !this.selectedTime) {
      this.alertType = 'danger';
      this.alertMessage = 'Please select both date and time to book a tour.';
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
  
    const customerID = Number(localStorage.getItem('user_id'));  
    
    if (!customerID) {
      this.alertType = 'danger';
      this.alertMessage = 'You must be logged in to book a tour.';
      return;
    }
  
    const tourData = {
      customerID: customerID,
      propertyID: this.propertyId,
      tourDate: this.selectedDate,
      tourTime: this.selectedTime,
      status: 'Pending'
    };
  
    this.apiService.bookTour(tourData).subscribe({
      next: (res) => {
        this.alertType = 'success';
        this.alertMessage = 'Tour booked successfully!';
        setTimeout(() => {
          this.router.navigate(['/user/property']);
        }, 2000);
      },
      error: (err) => {
        console.error(err);
        this.alertType = 'danger';
        this.alertMessage = 'Failed to book tour.';
      }
    });
  }
  
}
