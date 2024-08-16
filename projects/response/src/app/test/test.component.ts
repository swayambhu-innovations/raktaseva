import { Component } from '@angular/core';
import { EmailService } from './email.service';
import { HttpErrorResponse } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']  // Corrected 'styleUrl' to 'styleUrls'
})
export class TestComponent {
  phoneNumber = '+917068396232';
  otp = '123456';
  message = '123456';

  constructor(private emailService: EmailService) {}

  sendOtp() {
    if (!this.message) {
      alert('Message is required.');
      return;
    }
  
    const payload = {
      recipients: [this.phoneNumber],
      message: this.message
    };
    console.log('Payload:', payload);
  
    this.emailService.sendOtp(payload).pipe(
      retry(1)
    ).subscribe(
      response => {
        alert('OTP sent successfully');
      },
      (error: HttpErrorResponse) => {
        console.error('Error details:', error);
        alert(`Failed to send OTP: ${error.message}`);
      }
    );
  }

  verifyOtp() {
    this.emailService.verifyOtp(this.phoneNumber, this.otp).subscribe(
      response => {
        alert('OTP verified successfully');
      },
      error => {
        console.error('Failed to verify OTP', error);
        alert('Failed to verify OTP');
      }
    );
  }
}
