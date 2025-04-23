import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})

export class PropertyComponent implements OnInit {
  properties: any[] = [];
  filteredProperties: any[] = [];
  searchTerm: string = '';
  selectedLocation: string = '';
  selectedStatus: string = 'Available';

  locations = ['Ruiru', 'Joska', 'Kamulu'];
  statuses = ['Available', 'Sold'];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties() {
    this.apiService.getProperties().subscribe(
      (data: any[]) => {
        this.properties = data;
        this.filteredProperties = [...this.properties];
        this.applyFilters();
      },
      error => {
        console.error('Error loading properties:', error);
      }
    );
  }

  applyFilters() {
    this.filteredProperties = this.properties.filter(property => {
      const matchesSearch = property.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
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
}