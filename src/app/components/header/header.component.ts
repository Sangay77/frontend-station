import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faBroom, faUtensils, faCar, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-header',
  standalone:true,
  // imports: [FontAwesomeModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  faHome = faHome;
  faBroom = faBroom;
  faUtensils = faUtensils;
  faCar = faCar;
  faEnvelope = faEnvelope;
}
