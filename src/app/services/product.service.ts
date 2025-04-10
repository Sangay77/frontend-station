import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:9090/api/products'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Add a new product
  saveProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, formData);
  }

  // Update an existing product
  updateProduct(id: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, formData);
  }

  // Delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryId}`);
  }
}