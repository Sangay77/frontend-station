import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ManagePostService } from '../../services/manage-post.service';
import { faBroom, faUtensils, faCar, faHome, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post } from '../../common/post';
import { PostCategory } from '../../common/postCategory';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, FontAwesomeModule, CommonModule, FormsModule],
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
  groupedPosts: { [key: string]: Post[] } = {}; // Correct type definition

  postService = inject(ManagePostService)

  ngOnInit(): void {
    this.fetchPosts(); // Fetch posts on component initialization
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
}
