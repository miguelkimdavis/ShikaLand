import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';  // ADD THIS
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('user_id', res.userId); 
      })
    );
  }

  registerCustomer(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register-customer`, data);
  }

  registerStaff(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register-staff`, data);
  }
}
