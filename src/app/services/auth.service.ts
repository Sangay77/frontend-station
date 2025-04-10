import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;


  private baseURL: string = "http://localhost:9090/auth/v1";
  private http = inject(HttpClient);
  private router = inject(Router);

  login(user: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, user).pipe(
      tap(response => console.log('Login successful:', response)),
      catchError(this.handleError)
    );
  }

  register(newUser:{username:string,email:string,password:string,address:string}):Observable<any>{
    return this.http.post( `${this.baseURL}/register`,newUser).pipe(
      tap(response => console.log('Login successful:', response)),
      catchError(this.handleError)
    );
  }
 
  logout(): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    // Clear the token before making the logout request
    localStorage.removeItem('jwt_token');

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.post(`${this.baseURL}/logout`, {}, { headers, observe: 'response' }).pipe(
      tap(response => {
        console.log('Logout successful:', response); // Log the response
      }),
      catchError(error => {
        console.error('Logout failed:', error); // Log the error
        return throwError(() => new Error('Logout request failed'));
      })
    );
  }

  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
  
}



