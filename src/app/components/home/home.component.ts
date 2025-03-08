import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ManagePostService } from '../../services/manage-post.service';
import { faBroom, faUtensils, faCar, faHome, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ECPPost } from '../../common/ecp-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterLink,FontAwesomeModule,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  faBroom = faBroom;
  faUtensils = faUtensils;
  faCar = faCar;
  faHome = faHome;
  faEnvelope = faEnvelope;
  
  posts: ECPPost[] = [];
  
  postService=inject(ManagePostService)

  ngOnInit(): void {
    // this.fetchPosts();
    this.getPosts();
  }

  // fetchPosts(): void {
  //   this.postService.getAllPosts().subscribe({
  //     next: (data) => (this.posts = data),
  //     error: (err) => console.error('Error fetching posts:', err),
  //   });
  // }

  getPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.posts.forEach(post => {
          // post.comments = false; // Initialize comment section state as closed
          // post.comment = ''; // Initialize comment state
        });
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
      }
    });
  }

  // Handle like functionality (e.g., update like count in backend)
  likePost(postId: number): void {
    console.log(`Post ${postId} liked!`);
    // Here, you can update the like status in the backend (API call)
    // Example: this.postService.likePost(postId).subscribe();
  }

  // Open the comment section for a post
  openCommentSection(postId: number): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      // post.isCommentOpen = !post.isCommentOpen;  // Toggle comment section visibility
    }
  }

  // Submit the comment for the post
  submitComment(postId: number): void {
    // const post = this.posts.find(p => p.id === postId);
    // if (post && post.comment) {
    //   console.log(`Comment for Post ${postId}: ${post.comment}`);
    //   // Send comment to the backend (API call)
    //   // Example: this.postService.submitComment(postId, post.comment).subscribe();
      
    //   post.isCommentOpen = false;  // Close comment section after submission
    // }
  }

}
