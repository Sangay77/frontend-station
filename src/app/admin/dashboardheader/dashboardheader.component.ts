import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { faBell, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboardheader',
  standalone: true, // Add this if using Angular 17+ standalone components
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './dashboardheader.component.html',
  styleUrls: ['./dashboardheader.component.css'],
})
export class DashboardheaderComponent implements OnInit {
  username = ''; 
  faBell = faBell; // Notification bell icon
  faSearch = faSearch; // Search icon
  faSignOut = faSignOutAlt; // Logout icon

  messageCount=1;
  notificationCount=2;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.GetLoginUser(); // Fetch the logged-in user's username
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: (response) => {
        localStorage.removeItem('username'); // Clear the username from localStorage
        this.router.navigate(['/login']); // Redirect to login after logout
      },
      error: (error) => {
        console.error('Logout error:', error);
        this.router.navigate(['/login']); // Redirect to login even on error
      },
    });
  }

  GetLoginUser() {
    // Retrieve the username from localStorage
    this.username = localStorage.getItem('username') || 'Guest'; // Fallback to 'Guest' if username is not found
  }
}