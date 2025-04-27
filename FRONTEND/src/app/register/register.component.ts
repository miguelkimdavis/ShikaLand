import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { RouterLink } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  alertMessage: string = '';
  alertType: 'success' | 'danger' | '' = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      fullName: [''],
      phoneNumber: [''],
      email: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  onSubmit() {
    const { password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.alertMessage = 'Password and Confirm Password must match';
      this.alertType = 'danger';
      return;
    }

    this.authService.registerCustomer(this.registerForm.value).pipe(
      catchError(err => {
        this.alertMessage = err.error.message || 'Registration failed';
        this.alertType = 'danger';
        return of(null);
      })
    ).subscribe(res => {
      if (res) {
        this.alertMessage = 'Registered successfully!';
        this.alertType = 'success';
        this.registerForm.reset();
      }
    });
  }
}
