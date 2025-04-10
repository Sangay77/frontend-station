import { Component } from '@angular/core';
import { PostCategory } from '../../common/postCategory';
import { PostCategoryService } from '../../services/post-category-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../../common/ApiResponse';

@Component({
  selector: 'app-postcategory',
  imports: [CommonModule, FormsModule],
  templateUrl: './postcategory.component.html',
  styleUrls: ['./postcategory.component.css']
})
export class PostcategoryComponent {

  category: PostCategory = {
    id: 0,
    name: ''
  };
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private categoryService: PostCategoryService) {}

  addNewCategory() {
    if (this.category.name.trim() === '') {
      this.errorMessage = 'Category name cannot be empty.';
      return;
    }
    this.isLoading = true;
    this.categoryService.addCategory(this.category).subscribe({
      next: (response: ApiResponse) => {  // Use ApiResponse type here
        if (response.status === 'success') {
          this.successMessage = response.message;
          this.errorMessage = '';
          this.category.name = ''; // Clear form after success
        } else {
          this.errorMessage = 'Failed to add category.';
          this.successMessage = '';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error adding category:', error);
        this.errorMessage = 'Failed to add category.';
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }
}
