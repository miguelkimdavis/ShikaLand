import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-tour',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './admin-tour.component.html',
  styleUrls: ['./admin-tour.component.css']
})
export class AdminTourComponent implements OnInit {
  tours: any[] = [];
  alertMessage: string = '';
  alertType: 'success' | 'danger' = 'success';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchTours();
  }

  fetchTours() {
    this.apiService.getAllTours().subscribe({
      next: (res) => {
        this.tours = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  confirmTour(tourID: number) {
    this.apiService.updateTourStatus(tourID, 'Confirmed').subscribe({
      next: (res) => {
        this.alertType = 'success';
        this.alertMessage = 'Tour confirmed successfully!';
        this.fetchTours(); 
      },
      error: (err) => {
        console.error(err);
        this.alertType = 'danger';
        this.alertMessage = 'Failed to confirm tour.';
      }
    });
  }

  cancelTour(tourID: number){
    this.apiService.updateTourStatus(tourID, 'Cancelled').subscribe({
      next: (res) => {
        this.alertType = 'success';
        this.alertMessage = 'Tour Cancelled Successfully!';
        this.fetchTours();
      },
      error: (err) => {
        this.alertType = 'danger';
        this.alertMessage = 'Failed to cancel tour.';
      }
    })
  }
  
  get confirmedTours() {
    return this.tours.filter(tour => tour.status === 'Confirmed');
  }
  
}
