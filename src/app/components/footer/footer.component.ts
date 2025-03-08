import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faBroom, faUtensils, faCar, faEnvelope } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {


    faHome = faHome;
    faBroom = faBroom;
    faUtensils = faUtensils;
    faCar = faCar;
    faEnvelope = faEnvelope;
  }


