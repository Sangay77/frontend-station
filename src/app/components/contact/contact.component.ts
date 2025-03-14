import { Component } from '@angular/core';
import { ContactUs } from '../../common/contactus';
import { ContactusService } from '../../services/contactus.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone:true,
  imports:[FooterComponent,HeaderComponent,CommonModule,FormsModule]
})
export class ContactComponent {
  contact: ContactUs = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private contactService: ContactusService) {}

  submitContactForm() {
    if (
      this.contact.name.trim() === '' ||
      this.contact.email.trim() === '' ||
      this.contact.message.trim() === ''
    ) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

    this.isLoading = true;
    this.contactService.contactUs(this.contact).subscribe({
      next: (response) => {
        this.successMessage = response.message; // Access the "message" from the response
        this.errorMessage = '';
        this.contact = { name: '', email: '', subject: '', message: '' }; // Clear the form
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error submitting message:', error);
        this.errorMessage =
          'Failed to submit your message. Please try again later.';
        this.successMessage = '';
        this.isLoading = false;
      },
    });
  }
}
