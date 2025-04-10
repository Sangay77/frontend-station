import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { DashboardheaderComponent } from '../dashboardheader/dashboardheader.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, DashboardheaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls:['./admin-layout.component.css']
})
export class AdminLayoutComponent {

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
