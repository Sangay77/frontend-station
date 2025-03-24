import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/Product';

@Component({
  selector: 'app-shop-by-category',
  imports: [],
  templateUrl: './shop-by-category.component.html',
  styleUrl: './shop-by-category.component.css'
})
export class ShopByCategoryComponent {

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  // Fetch products by category ID
  fetchProductsByCategory(categoryId: number): void {
    this.productService.getProductsByCategory(categoryId).subscribe((data) => {
      this.products = data;
    });
  }

}
