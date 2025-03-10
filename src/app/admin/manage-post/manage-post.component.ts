import { Component, OnInit } from '@angular/core';
import { ManagePostService } from '../../services/manage-post.service';
import { Post } from '../../common/post';
import { PostCategory } from '../../common/postCategory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ManagePostComponent implements OnInit {
  posts: Post[] = [];
  categories: PostCategory[] = [];
  currentPost: Post = {
    id: 0,
    title: '',
    content: '',
    postCategory: { id: 0, name: '' },
  };
  isModalOpen = false;
  isEditing = false;
  message = '';
  error = false;

  constructor(private postService: ManagePostService) {}

  ngOnInit(): void {
    console.log("Component initialized"); // Debugging
    this.fetchPosts();
    this.fetchCategories();
  }

  fetchPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => (this.posts = data),
      error: (err) => this.displayMessage('Error fetching posts', true),
    });
  }

  fetchCategories(): void {
    this.postService.getCategories().subscribe({
      next: (data) => {
        console.log("Fetched Categories:", data); // Debugging
        this.categories = data;
      },
      error: (err) => this.displayMessage('Error fetching categories', true),
    });
  }
  

  openAddPostModal(): void {
    console.log("Opening Add Modal"); // Debugging
    this.currentPost = {
      id: 0,
      title: '',
      content: '',
      postCategory: { id: 0, name: '' }, // Reset postCategory
    };
    this.isEditing = false;
    this.isModalOpen = true;
  }

  openEditPostModal(post: Post): void {
    console.log("Opening Edit Modal", post); // Debugging
    this.currentPost = { ...post }; // Create a copy of the post
    this.isEditing = true;
    this.isModalOpen = true;
  }

  closeModal(): void {
    console.log("Closing Modal"); // Debugging
    this.isModalOpen = false;
    this.isEditing = false;
  }

  addPost(): void {
    console.log('Adding new post:', this.currentPost); // Debugging
    if (!this.currentPost.postCategory.id) {
      this.displayMessage('Please select a valid category', true);
      return;
    }

    this.postService.addPost(this.currentPost).subscribe({
      next: (response) => {
        console.log('Add response:', response); // Debugging
        this.posts.push(response.post);
        this.displayMessage(response.message, false);
        this.closeModal();
      },
      error: (err) => {
        console.error('Error adding post:', err); // Debugging
        this.displayMessage('Error adding post: ' + err.message, true);
      },
    });
  }

  updatePost(): void {
    this.postService.updatePost(this.currentPost.id, this.currentPost).subscribe({
      next: (response) => {
        const index = this.posts.findIndex((p) => p.id === response.post.id);
        if (index !== -1) {
          this.posts[index] = response.post;
        }
        this.displayMessage(response.message, false);
        this.closeModal();
      },
      error: (err) => this.displayMessage('Error updating post: ' + err.message, true),
    });
  }

  deletePost(id: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe({
        next: (response) => {
          this.posts = this.posts.filter((p) => p.id !== id);
          this.displayMessage(response.message, false);
        },
        error: (err) => this.displayMessage('Error deleting post: ' + err.message, true),
      });
    }
  }

  displayMessage(msg: string, isError: boolean): void {
    this.message = msg;
    this.error = isError;
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }
}