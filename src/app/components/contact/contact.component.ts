import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBroom, faUtensils, faCar, faHome, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [
    FormsModule,
    CommonModule, // Add CommonModule here
    FontAwesomeModule,
  ],
})
export class ContactComponent {
  faBroom = faBroom;
  faUtensils = faUtensils;
  faCar = faCar;
  faHome = faHome;
  faEnvelope = faEnvelope;

  // Define the form model
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  // Handle form submission
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted', this.contactForm);
      alert("Thank you for contacting us! We'll get back to you soon.");
      form.resetForm(); // Reset the form after submission
    } else {
      console.error('Form is invalid.');
      alert('Please fill out the form correctly.');
    }
  }
}