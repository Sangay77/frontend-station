import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ECPPost } from '../common/ecp-post.model';

@Injectable({
  providedIn: 'root'
})
export class ManagePostService {


  constructor() { }
  
    http=inject(HttpClient);
    // private baseURL: string = "http://localhost:9090";

    private apiUrl = 'http://localhost:9090/api/posts'; // Replace with your backend API URL

   
    getAllPosts(): Observable<ECPPost[]> {
      return this.http.get<ECPPost[]>(this.apiUrl);
    }
  
    addPost(post: ECPPost): Observable<ECPPost> {
      return this.http.post<ECPPost>(this.apiUrl, post);
    }
  
  

    updatePost(id: number, post: Partial<ECPPost>): Observable<ECPPost> {
      return this.http.put<ECPPost>(`${this.apiUrl}/${id}`, post); // ✅ Ensure {id} is in URL
    }
  
    deletePost(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

      // Like a post
  likePost(postId: number): Observable<ECPPost> {
    return this.http.post<ECPPost>(`${this.apiUrl}/${postId}/like`, {});
  }

  // Submit a comment to a post
  submitComment(postId: number, comment: string): Observable<ECPPost> {
    return this.http.post<ECPPost>(`${this.apiUrl}/${postId}/comment`, { comment });
  }
    

    
}
