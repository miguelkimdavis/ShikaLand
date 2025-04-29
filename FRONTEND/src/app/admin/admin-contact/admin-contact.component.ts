import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../shared/api/api.service';

@Component({
  selector: 'app-admin-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css']
})
export class AdminContactComponent implements OnInit {
  inquiries: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadInquiries();
  }

  loadInquiries() {
    this.apiService.getAllInquiries().subscribe({
      next: (data) => {
        this.inquiries = data;
      },
      error: () => {
        console.error('Failed to load inquiries');
      }
    });
  }
}
