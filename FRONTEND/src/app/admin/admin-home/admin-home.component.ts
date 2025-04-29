import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  totalProperties = 0;
  totalTours = 0;
  pendingActions = 0;
  totalUsers = 0;

  tourStats = {
    confirmed: 0,
    cancelled: 0,
    pending: 0
  };

  propertyStatuses = [
    { label: 'Available', count: 0 },
    { label: 'Sold', count: 0 }
  ];
  isBrowser: boolean;

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId); 
  }

  ngOnInit() {
    this.fetchDashboardStats();
    this.fetchTourDashboardStats();
    this.fetchCustomerCount();
  }

  propertyChartData: ChartData<'bar'> = {
    labels: ['Available', 'Sold'],
    datasets: [
      {
        label: 'Properties',
        data: [0, 0],
        backgroundColor: ['#28a745', '#dc3545']
      }
    ]
  };
  
  propertyChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  fetchDashboardStats() {
    this.apiService.getPropertyDashboardStats().subscribe({
      next: (stats) => {
        console.log('Dashboard stats:', stats);
        if (stats) {
          this.totalProperties = stats.totalProperties || 0;
  
          this.propertyStatuses = [
            { label: 'Available', count: stats.availableProperties || 0 },
            { label: 'Sold', count: stats.soldProperties || 0 }
          ];
  
          this.propertyChartData.datasets[0].data = [
            stats.availableProperties || 0,
            stats.soldProperties || 0
          ];
        } else {
          console.warn('Dashboard stats returned null');
        }
      },
      error: (error) => {
        console.error('Error fetching dashboard stats:', error);
      }
    });
  }
  
  tourChartData: ChartData<'pie'> = {
    labels: ['Confirmed', 'Cancelled', 'Pending'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#28a745', '#dc3545', '#fd7e14'] 
      }
    ]
  };

  tourChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  fetchTourDashboardStats() {
    this.apiService.getTourDashboardStats().subscribe({
      next: (stats) => {
        if (stats) {
          this.tourStats = {
            confirmed: stats.confirmedTours || 0,
            cancelled: stats.cancelledTours || 0,
            pending: stats.pendingTours || 0
          };

          this.tourChartData.datasets[0].data = [
            this.tourStats.confirmed,
            this.tourStats.cancelled,
            this.tourStats.pending
          ];
        }
      },
      error: (error) => {
        console.error('Error fetching tour dashboard stats:', error);
      }
    });
  }

  fetchCustomerCount() {
    this.apiService.getCustomerCount().subscribe({
      next: (res) => {
        this.totalUsers = res.totalCustomers || 0;
      },
      error: (error) => {
        console.error('Error fetching customer count:', error);
      }
    });
  }
  
}
