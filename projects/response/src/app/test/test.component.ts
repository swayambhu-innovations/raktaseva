import { Component } from '@angular/core';
import { EmailService } from './email.service';


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  constructor(private emailService: EmailService) {}

  sendEmail() {
    const recipients = ['ambarmishra740@gmail.com','amanyddv@gmail.com'];
    const subject = 'Testing of nodemailer';
    const text = 'Test Text';
    const html = '<p>Good Evening</p>';

    this.emailService.sendEmail(recipients, subject, text, html).subscribe(
      response => {
        console.log('Email sent successfully', response);
      },
      error => {
        console.error('Error sending email', error);
      }
    );
  }
}