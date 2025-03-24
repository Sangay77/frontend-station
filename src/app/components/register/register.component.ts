import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../common/user.model';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, CommonModule],
})
export class RegisterComponent {
  usermodel = new User(); // User model (without confirmPassword)
  confirmPassword: string = ''; // Separate property for confirm password

  router = inject(Router);
  authService = inject(AuthService);
  errorMessage = '';
  successMessage = '';
  loading = false;

  onRegister() {
    // Check if passwords match
    if (this.usermodel.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.loading = true; // Show loading state
    this.errorMessage = ''; // Clear previous error message

    this.authService.register(this.usermodel).pipe(
      catchError((error) => {
        console.error('Registration failed', error);
        this.errorMessage = error.message || 'Registration failed. Please try again.';
        this.loading = false; // Hide loading state
        return of(null); // Prevents observable from crashing
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          console.log('Registration successful', response);
          this.successMessage = response.message;
          this.loading = false; // Hide loading state

          // Delay redirection by 5 seconds (5000ms)
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 5000);
        }
      },
    });
  }
}