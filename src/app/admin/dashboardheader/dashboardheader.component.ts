import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboardheader',
  imports: [CommonModule,FormsModule],
  templateUrl: './dashboardheader.component.html',
  styleUrl: './dashboardheader.component.css'
})
export class DashboardheaderComponent {


    message = ''; // Add success message
  
  
    authService = inject(AuthService);
    router = inject(Router);
  
    faSignOut = faSignOutAlt;

  onLogout() {
    console.log('Attempting logout...');

    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout response:', response);
        localStorage.removeItem('username');  // Clear the username from localStorage
        // this.username = null;  // Reset username in the component
        this.router.navigate(['/login']); // Redirect to login after logout
      },
      error: (error) => {
        console.error('Logout error:', error);
        this.router.navigate(['/login']); // Redirect to login even on error
      }
    });
  }

}
