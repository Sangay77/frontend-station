import { Component } from '@angular/core';
import { faHomeAlt, faBroom, faUtensils, faCar, faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Import FontAwesomeModule


@Component({
  selector: 'app-header',
  standalone:true,
  // imports: [FontAwesomeModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports:[FontAwesomeModule]
})
export class HeaderComponent {

  faHome = faHome;
  faBroom = faBroom;
  faUtensils = faUtensils;
  faCar = faCar;
  faEnvelope = faEnvelope;
}
