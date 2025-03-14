import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactUs } from '../common/contactus';

@Injectable({
  providedIn: 'root',
})
export class ContactusService {
  private baseURL: string = 'http://localhost:9090/api/v1/contact-us';

  constructor(private http: HttpClient) {}

  contactUs(contact: ContactUs): Observable<any> {
    return this.http.post<any>(this.baseURL, contact);
  }

  getAllMessages(): Observable<ContactUs[]> {
    return this.http.get<ContactUs[]>(`${this.baseURL}`);
  }
}
