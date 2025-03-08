import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../common/user.model';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule,HeaderComponent,FooterComponent],
  providers: [AuthService]  // ✅ Ensure AuthService is available
})
export class LoginComponent {

  usermodel = new User();

  router = inject(Router);
  authService = inject(AuthService); 

  loading = false; 
  errorMessage = ''; 
  successMessage = ''; 
  accessToken: string = '';  

  onLogin() {

    this.loading = true;
    this.errorMessage = '';  // Clear previous errors
    this.successMessage = ''; // Clear previous success messages
    this.accessToken = ''; // Clear previous access token


    this.authService.login(this.usermodel).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.loading = false;
        this.successMessage = response.message || 'Login successful Redirecting to Dashboard';
        this.accessToken = response.access_token; // Capture the access token from the response
        localStorage.setItem("jwt_token",this.accessToken);
        localStorage.setItem("username",this.usermodel.username);
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          this.router.navigateByUrl('admin/dashboard');
        }, 2000); // 2000 milliseconds = 2 seconds
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid email or password. Please try again!.';  // Store error message
        this.loading = false;
      }
    });
  }
}