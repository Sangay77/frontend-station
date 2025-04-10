import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductCategoryService } from '../../services/product.category.service';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  categories: any[] = []; // Array to store categories
  isModalOpen: boolean = false; // Controls modal visibility
  isUpdateMode: boolean = false; // Tracks if modal is in update mode
  selectedCategory: any = { id: 0, name: '', image: null }; // Holds the selected category for update/add
  selectedImage: File | null = null; // Holds the selected image file


  // Status message properties
  statusMessage: string | null = null;
  statusMessageType: 'success' | 'error' | null = null;

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.fetchCategories(); // Fetch categories when the component initializes
  }

  // Fetch all categories
  fetchCategories(): void {
    this.productCategoryService.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data.data; // Assign fetched categories to the array
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

    // Open modal for adding a product
    openAddModal(): void {
      this.isUpdateMode = false;
      this.selectedCategory = {
        id: 0,
        name: '',
        image: null,
      };
      this.isModalOpen = true;
    }

    // Add a new product
  addCategory(): void {
    const formData = new FormData();
    formData.append('name', this.selectedCategory.name);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.productCategoryService.addCategory(formData).subscribe({
      next: (data) => {
        this.fetchCategories(); // Refresh the product list
        this.closeModal();
        this.showStatusMessage('Product added successfully!', 'success');
      },
      error: (err) => {
        console.error('Error adding product:', err);
        this.showStatusMessage('Failed to add product. Please try again.', 'error');
      },
    });
  }

  updateCategory(){}


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

   // Close modal
   closeModal(): void {
    this.isModalOpen = false;
  }

  // Handle file input change
  onFileChange(event: any): void {
    this.selectedImage = event.target.files[0];
  }

}