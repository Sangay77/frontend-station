import { Component, OnInit } from '@angular/core';
import { ManagePostService } from '../../services/manage-post.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalPosts: number = 0;
  totalUsers: number = 0;

  constructor(private managePostService: ManagePostService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    
  }
}
