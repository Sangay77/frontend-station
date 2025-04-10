import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ManagePostService } from '../../services/manage-post.service';
import { faBroom, faUtensils, faCar, faHome, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post } from '../../common/post';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/Product';
import { ProductCategoryService } from '../../services/product.category.service';
import { ProductCategory } from '../../common/productCategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  faBroom = faBroom;
  faUtensils = faUtensils;
  faCar = faCar;
  faHome = faHome;
  faEnvelope = faEnvelope;

  posts: Post[] = [];
  categories: ProductCategory[] = [];
  groupedPosts: { [key: string]: Post[] } = {}; // Correct type definition
    products: Product[] = []; // Array to store products

    constructor(private categoryService: ProductCategoryService) {}
  

  postService = inject(ManagePostService)
  productService=inject(ProductService)
  productCategoryService=inject(ProductCategoryService)

  ngOnInit(): void {
    this.fetchPosts(); // Fetch posts on component initialization
    this.fetchProducts(); // Fetch products when the component initializes
    this.fetchCategories();

  }

  fetchPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.groupPostsByCategory(); // Group posts by category once they are fetched
      },
      error: (err) => console.error('Error fetching posts:', err),
    });
  }

  groupPostsByCategory(): void {
    // Group posts by category
    this.groupedPosts = this.posts.reduce((groups, post) => {
      const categoryName = post.postCategory.name;
      if (!groups[categoryName]) {
        groups[categoryName] = [];
      }
      groups[categoryName].push(post);
      return groups;
    }, {} as { [key: string]: Post[] }); // Casting to ensure correct type
  }

  toggleReadMore(post: Post): void {
    post.showFullContent = !post.showFullContent;
  }

   // Fetch all products
   fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data; // Assign fetched products to the array
      },
      error: (err) => console.error('Error fetching products:', err),
    });
  }

   // Add to Cart Method
   addToCart(product: Product): void {
    console.log('Added to cart:', product);
    
  }

   // Fetch product caegoties categories
   fetchCategories(): void {
    this.productCategoryService.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data.data; // Assign fetched categories to the array
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  fetchProductsByCategory(categoryId: number): void {
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: (data) => {
        this.products = data; // Assign fetched products to the array
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
