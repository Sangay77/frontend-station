import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor() { }

  http=inject(HttpClient);
  private baseURL: string = "http://localhost:9090";


  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/users`);
  }

  deleteUser(userId: number): Observable<void> {
    const url = `${this.baseURL}/${userId}`;
    return this.http.delete<void>(url);
  }
  
}
