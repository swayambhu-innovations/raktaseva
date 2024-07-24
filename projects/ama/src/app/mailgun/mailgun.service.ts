import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Injectable({
  providedIn: 'root'
})
export class MailgunService {

  constructor(private functions: AngularFireFunctions) { }
  sendEmail(to: string, subject: string, text: string) {
    const callable = this.functions.httpsCallable('sendEmail');
    return callable({ to, subject, text }).toPromise();
  }
}
