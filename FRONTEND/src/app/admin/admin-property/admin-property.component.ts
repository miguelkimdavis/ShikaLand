import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-property',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './admin-property.component.html',
  styleUrls: ['./admin-property.component.css']
})
export class AdminPropertyComponent implements OnInit {
  propertyForm!: FormGroup;
  properties: any[] = [];
  editMode = false;
  currentPropertyId!: number;

  locations = ['Ruiru', 'Joska', 'Kamulu'];
  plotSizes = ['⅛ acre', '¼ acre', '½ acre', '1 acre'];
  statuses = ['Available', 'Sold'];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadProperties();
  }

  createForm() {
    this.propertyForm = this.fb.group({
      location: ['', Validators.required],
      plotSize: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      status: ['Available', Validators.required],
      imageURLs: ['', Validators.required]
    });
  }

  loadProperties() {
    this.apiService.getProperties().subscribe(
      (data: any[]) => {
        this.properties = data;
      },
      error => {
        console.error('Error loading properties:', error);
      }
    );
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      const propertyData = this.propertyForm.value;
      
      if (this.editMode) {
        this.apiService.updateProperty(this.currentPropertyId, propertyData).subscribe(
          () => {
            this.loadProperties();
            this.resetForm();
          },
          error => {
            console.error('Error updating property:', error);
          }
        );
      } else {
        this.apiService.createProperty(propertyData).subscribe(
          () => {
            this.loadProperties();
            this.resetForm();
          },
          error => {
            console.error('Error creating property:', error);
          }
        );
      }
    }
  }

  onEdit(property: any) {
    this.editMode = true;
    this.currentPropertyId = property.propertyID;
    this.propertyForm.patchValue({
      location: property.location,
      plotSize: property.plotSize,
      price: property.price,
      description: property.description,
      status: property.status,
      imageURLs: property.imageURLs
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this property?')) {
      this.apiService.deleteProperty(id).subscribe(
        () => {
          this.loadProperties();
        },
        error => {
          console.error('Error deleting property:', error);
        }
      );
    }
  }

  resetForm() {
    this.propertyForm.reset({
      status: 'Available'
    });
    this.editMode = false;
    // this.currentPropertyId = null;
  }
}