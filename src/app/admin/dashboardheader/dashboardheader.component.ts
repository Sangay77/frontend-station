import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { faBell, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactusService } from '../../services/contactus.service';

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

  messageCount = 0;

  constructor(private authService: AuthService, private router: Router) { }

  contactService = inject(ContactusService)

  ngOnInit(): void {
    this.GetLoginUser(); // Fetch the logged-in user's username
    this.getMessageCount();
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


  getMessageCount() {
    this.contactService.getNewMessageCount().subscribe({
      next: (count) => {
        this.messageCount = count;  // Assign the value to messageCount
      },
      error: (err) => {
        console.error('Error fetching message count:', err);
      },
    });
  }
}


function getMessageCount() {
  throw new Error('Function not implemented.');
}
