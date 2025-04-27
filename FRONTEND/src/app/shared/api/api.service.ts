import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProperties(): Observable<any> {
    return this.http.get(`${this.apiUrl}/properties`);
  }

  getProperty(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/properties/${id}`);
  }

  createProperty(property: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/properties`, property);
  }

  updateProperty(id: number, property: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/properties/${id}`, property);
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/properties/${id}`);
  }

  bookTour(tourData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/book-tour`, tourData);
  }

  getToursByCustomer(customerID: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/book-tour/customer/${customerID}`);
  }

  updateTour(id: number, tourData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/book-tour/${id}`, tourData);
  }
}
