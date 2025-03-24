import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/Product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCategoryService } from '../../services/product.category.service';
import { ProductCategory } from '../../common/productCategory';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = []; // Array to store products
  productCategories:ProductCategory[]=[];
  isModalOpen: boolean = false; // Controls modal visibility
  isUpdateMode: boolean = false; // Tracks if modal is in update mode
  selectedProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    available: false,
    category: { id: 0, name: '',image:'' },
    image: null,
  }; // Holds the selected product for update/add
  selectedImage: File | null = null; // Holds the selected image file

  // Status message properties
  statusMessage: string | null = null;
  statusMessageType: 'success' | 'error' | null = null;

  constructor(private productService: ProductService,private categoryService:ProductCategoryService) {}

  ngOnInit(): void {
    this.fetchProducts(); // Fetch products when the component initializes
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getAllCategories().subscribe(
      {
        next: (response) => {
          this.productCategories = response.data; 
        },
        error: (err) => console.error('Error fetching products:', err),
      }
    );
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

  // Open modal for adding a product
  openAddModal(): void {
    this.isUpdateMode = false;
    this.selectedProduct = {
      id: 0,
      name: '',
      price: 0,
      quantity: 0,
      available: false,
      category: { id: 0, name: '' ,image:''},
      image: null,
    };
    this.isModalOpen = true;
  }

  // Open modal for updating a product
  openUpdateModal(product: Product): void {
    this.isUpdateMode = true;
    this.selectedProduct = { ...product };
    this.isModalOpen = true;
  }

  // Close modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Handle file input change
  onFileChange(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  // Add a new product
  addProduct(): void {
    const formData = new FormData();
    formData.append('name', this.selectedProduct.name);
    formData.append('price', this.selectedProduct.price.toString());
    formData.append('quantity', this.selectedProduct.quantity.toString());
    formData.append('available', this.selectedProduct.available.toString());
    formData.append('categoryId', this.selectedProduct.category.id.toString());
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.productService.saveProduct(formData).subscribe({
      next: (data) => {
        this.fetchProducts(); // Refresh the product list
        this.closeModal();
        this.showStatusMessage('Product added successfully!', 'success');
      },
      error: (err) => {
        console.error('Error adding product:', err);
        this.showStatusMessage('Failed to add product. Please try again.', 'error');
      },
    });
  }

  // Update an existing product
  updateProduct(): void {
    const formData = new FormData();
    formData.append('name', this.selectedProduct.name);
    formData.append('price', this.selectedProduct.price.toString());
    formData.append('quantity', this.selectedProduct.quantity.toString());
    formData.append('available', this.selectedProduct.available.toString());
    formData.append('categoryId', this.selectedProduct.category.id.toString());
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.productService.updateProduct(this.selectedProduct.id, formData).subscribe({
      next: (data) => {
        this.fetchProducts(); // Refresh the product list
        this.closeModal();
        this.showStatusMessage('Product updated successfully!', 'success');
      },
      error: (err) => {
        console.error('Error updating product:', err);
        this.showStatusMessage('Failed to update product. Please try again.', 'error');
      },
    });
  }

  // Delete a product
  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.fetchProducts(); // Refresh the product list
          this.showStatusMessage('Product deleted successfully!', 'success');
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          this.showStatusMessage('Failed to delete product. Please try again.', 'error');
        },
      });
    }
  }

  // Show status message
  showStatusMessage(message: string, type: 'success' | 'error'): void {
    this.statusMessage = message;
    this.statusMessageType = type;
    setTimeout(() => this.clearStatusMessage(), 5000); // Clear message after 5 seconds
  }

  // Clear status message
  clearStatusMessage(): void {
    this.statusMessage = null;
    this.statusMessageType = null;
  }
}