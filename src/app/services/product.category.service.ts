import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private apiUrl = `${environment.rooturl}/api/v1/product-category`;

  constructor(private http: HttpClient) {}

  addCategory(formData: FormData): Observable<any> {
      return this.http.post(this.apiUrl, formData);
    }
    

  // Add a new category
  // addCategory(name: string, image: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('name', name);
  //   formData.append('image', image);
  //   return this.http.post(this.apiUrl, formData);
  // }

  // Get all categories
  getAllCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  } 
}