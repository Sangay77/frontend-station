import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { PostCategory } from '../common/postCategory';
import { ApiResponse } from '../common/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class PostCategoryService {

    private baseURL: string = "http://localhost:9090/post/v1/post-category";
    private http = inject(HttpClient);
    private router = inject(Router);
    
    getCategories(): Observable<PostCategory[]> {
        return this.http.get<PostCategory[]>(this.baseURL);
    }
    
  
    addCategory(category: PostCategory): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.baseURL, category);
    }

      private handleError(error: any) {
        console.error('Error occurred:', error);
        return throwError(() => new Error(error.message || 'Server Error'));
      }
  }
   
