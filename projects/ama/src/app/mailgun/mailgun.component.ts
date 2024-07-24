import { Component } from '@angular/core';
import{MailgunService} from './mailgun.service'
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';

@Component({
  selector: 'app-mailgun',
  standalone: true,
  imports: [AngularFireFunctionsModule],
  templateUrl: './mailgun.component.html',
  styleUrl: './mailgun.component.scss'
})
export class MailgunComponent {
constructor(private mailgunService:MailgunService){}

sendEmail() {
  this.mailgunService.sendEmail('ambarmishra740@gmail.com', 'Test Subject', 'Test Email')
    .then(response => {
      console.log('Email sent successfully', response);
    })
    .catch(error => {
      console.error('Error sending email', error);
    });
}
}
