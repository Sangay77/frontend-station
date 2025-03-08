import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../common/user.model';
import { ManageUserService } from '../../services/manage-user.service';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent implements OnInit {

  users: User[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  private umservice = inject(ManageUserService);

  ngOnInit(): void {
    this.fetchUsers();
  }

  // Fetch users from API
  fetchUsers() {
    this.umservice.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: () => {
        this.errorMessage = 'Error fetching users. Please try again.';
        setTimeout(() => this.errorMessage = '', 3000);
      },
    });
  }

  // Add user (implement logic)
  addUser() {}

  // Edit user (implement logic)
  editUser(user: User) {}

  // Delete user with confirmation
  deleteUser(userId: any) {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.umservice.deleteUser(userId).subscribe({
      next: () => {
        this.successMessage = 'User deleted successfully!';
        this.users = this.users.filter(user => user.id !== userId);
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        this.errorMessage = 'Error deleting user. Please try again.';
        setTimeout(() => this.errorMessage = '', 3000);
      },
    });
  }
}
