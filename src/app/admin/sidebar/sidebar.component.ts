import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOutAlt,faUsers,faCogs,faBroom,faCar,faUtensils, faFileAlt, faBoxOpen, faConciergeBell } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  ngOnInit(): void {
    this.fetchLoggedInUserInfo();
  }

 

  successMessage = ''; // Add success message

 


  authService = inject(AuthService);
  router = inject(Router);

  faSignOut = faSignOutAlt;
  faUser=faUsers;
  faCogs=faCogs;
  faBroom=faBroom;
  faUtensils=faUtensils;
  faCar=faCar;
  faPost = faFileAlt;
  faProduct = faBoxOpen;
  faService = faConciergeBell;

  username: string | null = null;  // Variable to hold the username
  message: string | null = null;   // Variable to hold the message to be displayed

  fetchLoggedInUserInfo(): void {
    const storedUsername = localStorage.getItem('username');  // Retrieve username from localStorage
    if (storedUsername) {
      this.username = storedUsername;  // Set username if found
      this.message = `Welcome back, ${this.username}!`;  // Custom message after login
    } else {
      this.username = 'Guest';  // Default to 'Guest' if no username is found
      this.message = 'Please log in to continue.';  // Prompt for login
    }
  }



  onLogout() {
    console.log('Attempting logout...');

    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout response:', response);
        localStorage.removeItem('username');  // Clear the username from localStorage
        this.username = null;  // Reset username in the component
        this.router.navigate(['/login']); // Redirect to login after logout
      },
      error: (error) => {
        console.error('Logout error:', error);
        this.router.navigate(['/login']); // Redirect to login even on error
      }
    });
  }
}