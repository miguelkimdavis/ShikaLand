import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  properties: any[] = [];
  filteredProperties: any[] = [];
  searchTerm: string = '';
  selectedLocation: string = '';
  selectedStatus: string = 'Available';

  locations = ['Ruiru', 'Joska', 'Eastern Bypass'];
  statuses = ['Available', 'Sold'];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties() {
    this.apiService.getProperties().subscribe({
      next: (data: any[]) => {
        this.properties = data;
        this.filteredProperties = [...this.properties];
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading properties:', error);
      }
    });
  }

  applyFilters() {
    this.filteredProperties = this.properties.filter(property => {
      const matchesSearch =
        property.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesLocation = this.selectedLocation ? property.location === this.selectedLocation : true;
      const matchesStatus = this.selectedStatus ? property.status === this.selectedStatus : true;
      return matchesSearch && matchesLocation && matchesStatus;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedLocation = '';
    this.selectedStatus = 'Available';
    this.applyFilters();
  }

  bookTour(property: any) {
    this.router.navigate(['/user/book-tour', property.propertyID]);
  }

  makePayment(property: any) {
    this.router.navigate(['/payment', property.propertyID]);
  }
}
