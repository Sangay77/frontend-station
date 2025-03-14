import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post

 } from '../common/post';
import { PostCategory } from '../common/postCategory';
@Injectable({
  providedIn: 'root',
})
export class ManagePostService {
  private baseUrl = 'http://localhost:9090/api/v1/posts';

  constructor(private http: HttpClient) {}
 
  getAllPosts(): Observable<Post[]> {
    return this.http.get<any>(this.baseUrl).pipe(map(response => response.data));
  }

  // getCategories(): Observable<PostCategory[]> {
  //   return this.http.get<PostCategory[]>('http://localhost:9090/api/v1/categories');
  // }
  
  addPost(post: Post): Observable<{ message: string; post: Post }> {
    return this.http.post<any>(this.baseUrl, post).pipe(
      map(response => ({
        message: response.message,
        post: response.data,
      }))
    );
  }
  

  updatePost(id: number, post: Post): Observable<{ message: string; post: Post }> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, post).pipe(
      map(response => ({
        message: response.message,
        post: response.data,
      }))
    );
  }

  deletePost(id: number): Observable<{ message: string }> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => ({ message: response.message })));
  }
}