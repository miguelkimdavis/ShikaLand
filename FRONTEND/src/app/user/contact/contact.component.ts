import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../shared/api/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  inquiry = {
    name: '',
    email: '',
    phoneNumber: '',
    message: ''
  };

  alertMessage: string = '';
  alertClass: string = '';

  constructor(private apiService: ApiService) {}

  onSubmit(form: NgForm) { 
    if (form.valid) {
      this.apiService.sendInquiry(this.inquiry).subscribe({
        next: () => {
          form.reset();
          this.alertMessage = 'Your inquiry has been submitted successfully!';
          this.alertClass = 'alert-success';
        },
        error: () => {
          this.alertMessage = 'Failed to submit your inquiry. Please try again!';
          this.alertClass = 'alert-danger';
        }
      });
    } else {
      this.alertMessage = 'Please fill out all required fields!';
      this.alertClass = 'alert-danger'; 
    }
  }
}
