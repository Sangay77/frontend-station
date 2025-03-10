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


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  faBroom = faBroom;
  faUtensils = faUtensils;
  faCar = faCar;
  faHome = faHome;
  faEnvelope = faEnvelope;

  posts: Post[] = [];

  postService = inject(ManagePostService)

  ngOnInit(): void {
    this.fetchPosts(); // Fetch posts on component initialization
  }

  fetchPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => (this.posts = data),
      error: (err) => console.error('Error fetching posts:', err),
    });
  }

}
