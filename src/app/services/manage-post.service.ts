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
  private baseUrl = 'http://localhost:9090/posts';
  private catUrl = 'http://localhost:9090';


  constructor(private http: HttpClient) {}

  // getAllPosts(): Observable<Post[]> {
  //   return this.http.get<Post[]>(this.apiUrl);
  // }


  // getCategories(): Observable<PostCategory[]> {
  //   return this.http.get<PostCategory[]>(`${this.catUrl}/categories`);
  // }

  // addPost(post: Post): Observable<Post> {
  //   return this.http.post<Post>(this.apiUrl, post);
  // }

  // updatePost(id: number, post: Post): Observable<Post> {
  //   return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  // }

  // deletePost(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<any>(this.baseUrl).pipe(map(response => response.data));
  }

  getCategories(): Observable<PostCategory[]> {
    return this.http.get<PostCategory[]>('http://localhost:9090/categories');
  }
  
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