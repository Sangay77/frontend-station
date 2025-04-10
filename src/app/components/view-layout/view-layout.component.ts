import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-view-layout',
  imports: [FooterComponent,HeaderComponent,RouterOutlet],
  templateUrl: './view-layout.component.html',
  styleUrl: './view-layout.component.css'
})
export class ViewLayoutComponent {

}
