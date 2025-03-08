import { Component, OnInit } from '@angular/core';
import { ManagePostService } from '../../services/manage-post.service';
import { ECPPost } from '../../common/ecp-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.css'],
  imports:[CommonModule,FormsModule]
})
export class ManagePostComponent implements OnInit {
  posts: ECPPost[] = [];
  currentPost: ECPPost = { id: 0, serviceName: '', description: '', ecoFriendly: false };
  isModalOpen = false;
  isEditing = false;
  message = '';
  error = false;

  constructor(private postService: ManagePostService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => (this.posts = data),
      error: (err) => console.error('Error fetching posts:', err),
    });
  }

  openAddPostModal(): void {
    this.currentPost = { id: 0, serviceName: '', description: '', ecoFriendly: false };
    this.isEditing = false;
    this.isModalOpen = true;
  }

  openEditPostModal(post: ECPPost): void {
    this.currentPost = { ...post };
    this.isEditing = true;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isEditing = false; // Reset editing state
  }

  addPost(): void {
    console.log('Payload:', this.currentPost); // Log the payload
    this.postService.addPost(this.currentPost).subscribe({
      next: (newPost) => {
        this.posts.push(newPost); // Add the new post with the generated ID
        this.message = 'Post added successfully';
        this.error = false;
        this.closeModal();
      },
      error: (err) => {
        console.error('Error adding post:', err); // Log the actual error
        this.message = 'Error adding post: ' + (err.error?.message || err.message); // Display detailed error
        this.error = true;
      },
    });
  }
  updatePost(): void {
    this.postService.updatePost(this.currentPost.id, this.currentPost).subscribe({
      next: (updatedPost) => {
        const index = this.posts.findIndex(p => p.id === updatedPost.id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
        this.message = 'Post updated successfully';
        this.error = false;
        this.closeModal();
      },
      error: (err) => {
        this.message = 'Error updating post';
        this.error = true;
      }
    });
  }



  deletePost(id: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts = this.posts.filter((p) => p.id !== id);
          this.message = 'Post deleted successfully';
          this.error = false;
        },
        error: (err) => {
          console.error('Error deleting post:', err); // Log the actual error
          this.message = 'Error deleting post: ' + (err.error?.message || err.message); // Display detailed error
          this.error = true;
        },
      });
    }
  }

}