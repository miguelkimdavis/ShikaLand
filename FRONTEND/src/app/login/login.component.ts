import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  alertMessage: string = '';
  alertType: 'success' | 'danger' | '' = '';
  passwordVisible: boolean = false;  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).pipe(
      catchError(err => {
        this.alertMessage = err.error.message || 'Login failed';
        this.alertType = 'danger';
        return of(null);
      })
    ).subscribe(res => {
      if (res) {
        this.alertMessage = 'Login successful';
        this.alertType = 'success';
        setTimeout(() => {
          this.router.navigate([res.role === 'admin' ? '/admin' : '/user']);
        }, 1000); 
      }
    });
  }
}
