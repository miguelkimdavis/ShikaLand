import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

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
    message: ''
  };

  // Variables for Alert message and styling
  alertMessage: string = '';
  alertClass: string = '';

  // Form submission handler
  onSubmit(form: NgForm) { 
    if (form.valid) {
      // For now, we just log the data to the console
      console.log('Form Submitted:', this.inquiry);

      // Reset the form after submission
      form.reset();

      // Set success alert message and class
      this.alertMessage = 'Your inquiry has been submitted successfully!';
      this.alertClass = 'alert-success'; // Green color for success
    } else {
      // Set failure alert message and class
      this.alertMessage = 'Please fill out all required fields!';
      this.alertClass = 'alert-danger'; // Red color for failure
    }
  }
}
