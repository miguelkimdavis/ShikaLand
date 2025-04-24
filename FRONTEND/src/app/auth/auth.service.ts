import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  registerCustomer(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register-customer`, data);
  }

  registerStaff(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register-staff`, data);
  }
}